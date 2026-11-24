const {test}=require('node:test');
const assert=require('node:assert/strict');
const course=require('../dist/course.js');
const engine=require('../dist/engine.js');
const legacy=require('./fixtures/legacy-targets.json');

test('expanded curriculum supplies at least 500 distinct usable terms in daily batches of five',()=>{
  assert.ok(course.items.length>=500,'Professional vocabulary must contain at least 500 targets');
  const normalized=course.items.map(item=>item.word.trim().toLowerCase().replace(/[\s-]+/g,' '));
  assert.equal(new Set(normalized).size,course.items.length,'Spelling variants must not inflate the count');
  assert.equal(new Set(course.items.map(i=>i.id)).size,course.items.length);
  for(const day of course.days.filter(d=>!d.review))assert.equal(day.items.length,5);
  for(const item of course.items){
    for(const key of ['meaning','phrase','sentence','translation','note'])assert.ok(item[key]?.trim(),`${item.id} needs ${key}`);
    assert.ok(/[\u4e00-\u9fff]/.test(item.translation),`${item.id} needs a Chinese example translation`);
  }
});
test('old target ids and day assignments survive the expansion for existing progress',()=>{
  assert.deepEqual(course.items.slice(0,100).map(({id,word,day})=>({id,word,day})),legacy);
});
test('all weeks include five learning lessons and two reviews using their own vocabulary',()=>{
  assert.ok(course.weeks.length>=20);
  for(let week=1;week<=course.weeks.length;week++){
    const days=course.days.filter(d=>d.week===week);
    assert.equal(days.length,7);
    assert.equal(days.filter(d=>d.review).length,2);
    for(const day of days.filter(d=>d.review)){
      assert.equal(day.items.length,0);
      assert.equal(day.pool.length,25);
      assert.ok(day.pool.every(id=>course.items.find(i=>i.id===id)?.week===week));
    }
  }
  for(const term of ['publisher','inverse kinematics','model predictive control','friction cone','domain randomization','policy gradient'])assert.ok(course.items.some(i=>i.word===term),`Missing professional term: ${term}`);
});
test('later lessons can be saved and restored without relaxing invalid-day checks',()=>{
  const state=engine.newState(), ids=course.items.map(i=>i.id);
  state.completed['140']={date:'2026-11-25',seconds:1200};
  state.notes['140']='We compare this policy with a baseline.';
  assert.equal(engine.validateState(state,ids,course.days.length),true);
  state.completed['141']={date:'2026-11-25',seconds:1};
  assert.equal(engine.validateState(state,ids,course.days.length),false);
  delete state.completed['141'];
  state.notes['01']='Invalid lesson key';
  assert.equal(engine.validateState(state,ids,course.days.length),false);
});
