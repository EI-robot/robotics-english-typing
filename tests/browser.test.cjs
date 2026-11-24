const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const course = require('../dist/course.js');
const KEY='lexilab-engineering-english-v1';
let browser, server;
const url='http://127.0.0.1:4174';
before(async()=>{
  server=spawn(process.execPath,[path.join(__dirname,'../server.cjs')],{env:{...process.env,LEXILAB_PORT:'4174'},stdio:'ignore',windowsHide:true});
  let ready=false;
  for(let i=0;i<50;i++){try{if((await fetch(url)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}
  assert.ok(ready,'The isolated test server must start');
  const chrome='C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  browser=await chromium.launch({headless:true,...(fs.existsSync(chrome)?{executablePath:chrome}:{})});
  fs.mkdirSync(path.join(__dirname,'../test-results'),{recursive:true});
});
after(async()=>{await browser?.close();server?.kill();});
async function freshPage(viewport={width:1440,height:1100}){
  const context=await browser.newContext({viewport});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);return {page,context,errors};
}
async function snapshot(page){return page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);}

test('one Enter checks a word, a second Enter advances exactly one question',async()=>{
  const {page,context}=await freshPage();
  await page.getByRole('button',{name:'开始今日学习',exact:true}).click();
  await page.locator('#typing').pressSequentially('identify');
  await page.locator('#typing').press('Enter');
  assert.equal((await snapshot(page)).active.index,0,'Checking must not silently skip the feedback screen');
  assert.equal(await page.locator('#check').textContent(),'下一题');
  await page.locator('#check').press('Enter');
  assert.equal((await snapshot(page)).active.index,1);
  await context.close();
});
test('partial typing resumes after reload and pause prevents input',async()=>{
  const {page,context}=await freshPage();
  await page.getByRole('button',{name:'开始今日学习',exact:true}).click();
  await page.locator('#typing').pressSequentially('iden');
  await page.reload();
  await page.getByRole('button',{name:'继续学习',exact:true}).click();
  assert.equal(await page.locator('#typing').inputValue(),'iden');
  await page.getByRole('button',{name:'暂停',exact:true}).click();
  assert.ok(await page.locator('#typing').isDisabled());
  await page.getByRole('button',{name:'继续计时',exact:true}).click();
  assert.equal(await page.locator('#typing').inputValue(),'iden');
  await context.close();
});
test('complete a lesson: hints and first-attempt misses stay weak, writing and completion persist',async()=>{
  const {page,context,errors}=await freshPage();
  await page.getByRole('button',{name:'开始今日学习',exact:true}).click();
  let recall=0;
  for(let index=0;index<25;index++){
    const a=(await snapshot(page)).active, q=a.queue[a.index];
    if(q.blind){
      assert.match(await page.locator('#target').textContent(),/已隐藏/);
      if(recall===0)await page.getByRole('button',{name:'查看英文',exact:true}).click();
      if(recall===1){await page.locator('#typing').fill('wrong');await page.locator('#check').click();}
      recall++;
    }
    await page.locator('#typing').fill(q.target);
    await page.locator('#check').click();
    await page.locator('#check').click();
  }
  assert.ok(await page.locator('#writing').isVisible());
  await page.getByRole('button',{name:'完成本次学习',exact:true}).click();
  assert.ok(await page.locator('#writing').isVisible(),'Empty output cannot complete a lesson');
  await page.locator('#writing').fill('We need to identify the root cause of the failure. Before implementation, we should clarify the assumptions and specify the requirements carefully.');
  await page.getByRole('button',{name:'完成本次学习',exact:true}).click();
  const saved=await snapshot(page);
  assert.equal(saved.active,null);
  assert.equal(Object.keys(saved.cards).length,5);
  assert.equal(saved.cards.w1.level,0);
  assert.equal(saved.cards.w2.level,0);
  assert.equal(saved.cards.w3.level,1);
  assert.ok(saved.completed['1']);
  assert.match(saved.notes['1'],/identify the root cause/);
  await page.reload();
  assert.match(await page.locator('.today .day-label').textContent(),/第 2 天/);
  assert.deepEqual(errors,[]);
  await context.close();
});
test('word search, review guard and narrow layouts remain usable',async()=>{
  const {page,context}=await freshPage({width:390,height:844});
  await page.screenshot({path:path.join(__dirname,'../test-results/mobile-course.png'),fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
  await page.getByRole('button',{name:'第6天 复习与迁移',exact:true}).click();
  assert.match(await page.locator('#toast').textContent(),/先完成/);
  await page.getByRole('button',{name:/词汇手册/}).click();
  await page.getByRole('searchbox').fill('约束');
  assert.ok(await page.locator('.word-row').count()>0);
  await page.getByRole('searchbox').fill('constraint');
  assert.match(await page.locator('.word-list').textContent(),/satisfy a constraint/);
  await page.locator('[data-view="course"]').click();
  await page.getByRole('button',{name:'开始今日学习',exact:true}).click();
  await page.screenshot({path:path.join(__dirname,'../test-results/mobile-practice.png'),fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
  assert.ok(await page.locator('#typing').isVisible());
  await context.close();
});
test('invalid backup preserves current progress, valid backup restores it',async()=>{
  const {page,context}=await freshPage();
  await page.locator('#duration').selectOption('30');
  const original=await snapshot(page);
  await page.locator('#import-file').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"version":1}')});
  assert.deepEqual(await snapshot(page),original);
  const backup={...original,settings:{minutes:20}};
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#import-file').setInputFiles({name:'valid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
  await page.waitForFunction(()=>document.querySelector('#duration').value==='20');
  assert.equal((await snapshot(page)).settings.minutes,20);
  const downloadPromise=page.waitForEvent('download');
  await page.locator('#export').click();
  const download=await downloadPromise;
  assert.match(download.suggestedFilename(),/LexiLab-progress/);
  await context.close();
});
test('course contains 500 complete distinct targets across 140 lessons',()=>{
  assert.equal(course.days.length,140);
  assert.equal(course.items.length,500);
  assert.equal(new Set(course.items.map(i=>i.word)).size,500);
  assert.equal(course.days.filter(d=>d.review).length,40);
  for(const item of course.items){for(const field of ['word','pos','meaning','phrase','sentence','translation','note'])assert.ok(item[field],`${item.id} ${field}`);}
});
test('expanded course navigation reaches later technical lessons and restores their progress',async()=>{
  const {page,context,errors}=await freshPage();
  assert.equal(await page.locator('.nav-count').textContent(),'500');
  await page.locator('#route-range').selectOption('4');
  await page.getByRole('button',{name:'第134天 数据与抽样',exact:true}).click();
  await page.locator('#typing').fill('sta');
  await page.reload();
  await page.getByRole('button',{name:'继续学习',exact:true}).click();
  assert.equal(await page.locator('#typing').inputValue(),'sta');
  assert.equal((await snapshot(page)).active.day,134);
  await page.locator('[data-view="words"]').click();
  await page.getByRole('searchbox').fill('domain randomization');
  assert.ok(await page.locator('.word-row').count()>=1);
  await page.getByRole('searchbox').fill('MPC');
  assert.match(await page.locator('#word-list').textContent(),/model predictive control/);
  assert.deepEqual(errors,[]);
  await context.close();
});
test('a pre-expansion backup preserves learned cards, notes and the next lesson',async()=>{
  const {page,context}=await freshPage();
  const old={version:1,cards:{w1:{level:1,due:'2030-01-01',reviews:1,last:'2026-11-25'}},completed:{'1':{date:'2026-11-25',seconds:1500}},notes:{'1':'We identify the root cause.'},settings:{minutes:25},active:null};
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#import-file').setInputFiles({name:'old-progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});
  await page.waitForFunction(()=>document.querySelector('.today .day-label').textContent.includes('第 2 天'));
  await page.reload();
  assert.equal(await page.locator('#notice').isVisible(),false);
  assert.match(await page.locator('.today .day-label').textContent(),/第 2 天/);
  assert.deepEqual(await snapshot(page),old);
  await context.close();
});
test('desktop course and direct-file lessons load without uncaught errors',async()=>{
  const {page,context,errors}=await freshPage();
  await page.screenshot({path:path.join(__dirname,'../test-results/desktop-course.png'),fullPage:true});
  await page.goto(require('node:url').pathToFileURL(path.join(__dirname,'../dist/index.html')).href);
  assert.ok(await page.getByRole('button',{name:'开始今日学习',exact:true}).isVisible());
  await page.getByRole('button',{name:'开始今日学习',exact:true}).click();
  assert.equal(await page.locator('#typing').inputValue(),'');
  assert.deepEqual(errors,[]);
  await context.close();
});
