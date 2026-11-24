/* No network calls: lessons and progress work in this browser. */
(function () {
  'use strict';
  const D = window.CourseData, E = window.LearningEngine;
  const $ = selector => document.querySelector(selector);
  const KEY = 'lexilab-engineering-english-v1';
  const byId = Object.fromEntries(D.items.map(item=>[item.id,item]));
  const ids = D.items.map(item=>item.id);
  const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state = E.newState(), storageLocked = false, corruptRaw = null;
  let screen = 'course', paused = false, lastActivity = Date.now(), toastTimeout;
  try {
    const raw=localStorage.getItem(KEY);
    if (raw) {
      const loaded=JSON.parse(raw);
      if (!E.validateState(loaded,ids)) throw new Error('Invalid progress');
      state=loaded;
    }
  } catch (error) {
    storageLocked=true;
    try { corruptRaw=localStorage.getItem(KEY); } catch (_) { /* Storage access is unavailable; report below. */ }
    notice('当前浏览器存档不可用，暂时只在内存中学习。原存档不会被覆盖；可以导出备份，或导入有效进度恢复。');
  }
  function notice(message) { $('#notice').textContent=message; $('#notice').hidden=false; }
  function toast(message) { clearTimeout(toastTimeout); $('#toast').textContent=message; $('#toast').hidden=false; toastTimeout=setTimeout(()=>$('#toast').hidden=true,4200); }
  function save() {
    if (storageLocked) return;
    try { localStorage.setItem(KEY,JSON.stringify(state)); }
    catch (_) { storageLocked=true; notice('浏览器未能保存进度，请使用“导出进度”保存备份。本次学习仍可继续。'); }
  }
  const dayOf = number => D.days.find(day=>day.number===Number(number));
  const nextDay = () => D.days.find(day=>!state.completed[day.number]) || D.days[27];
  const due = () => E.dueCards(state.cards,E.dateKey(),1000);
  const clock = seconds => `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
  const active = () => state.active;
  function setView(view) {
    screen=view;
    document.querySelectorAll('[data-view]').forEach(button=>button.classList.toggle('active',button.dataset.view===view));
    $('#breadcrumb').textContent=({course:'我的课程 / 英语词汇',words:'我的课程 / 词汇手册',guide:'我的课程 / 学习方法',practice:'我的课程 / 打字练习',summary:'我的课程 / 本课记录'})[view];
    $('#duration').value=state.settings.minutes;
    if (view==='course') renderCourse();
    if (view==='words') renderWords();
    if (view==='guide') renderGuide();
    if (view==='practice') renderPractice();
    window.scrollTo(0,0);
  }
  const robot = `<svg class="robot-diagram" viewBox="0 0 240 205" fill="none" aria-hidden="true"><path d="M27 179h181M47 29v151m48-151v151m48-151v151m48-151v151M27 55h181M27 99h181M27 143h181" stroke="#cbdcf4" stroke-dasharray="3 5"/><ellipse cx="121" cy="177" rx="62" ry="12" fill="#d5e3f8"/><path d="M82 174v-19l29-9h30l24 9v19z" fill="#f9fcff" stroke="#3671c3" stroke-width="3"/><path d="m119 145-14-36 38-27" stroke="#3671c3" stroke-width="17" stroke-linecap="round"/><path d="m119 145-14-36 38-27" stroke="#e6effc" stroke-width="10" stroke-linecap="round"/><circle cx="105" cy="109" r="13" fill="#fff" stroke="#3671c3" stroke-width="3"/><circle cx="105" cy="109" r="5" fill="#5896e8"/><circle cx="143" cy="82" r="10" fill="#fff" stroke="#3671c3" stroke-width="3"/><path d="m148 76 10-21 14-1m-21 28 21-2 8-12" stroke="#3671c3" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="159" y="34" width="26" height="26" rx="5" transform="rotate(18 172 47)" fill="#f7b365" stroke="#d18a39" stroke-width="2"/><path d="M42 94c7-27 29-46 56-53" stroke="#7fa6dd" stroke-width="2" stroke-dasharray="5 5"/><rect x="19" y="63" width="67" height="27" rx="6" fill="white" stroke="#cadcf5"/><text x="30" y="81" fill="#1c62d6" font-family="Consolas,monospace" font-size="12">learn()</text><rect x="162" y="113" width="62" height="27" rx="6" fill="white" stroke="#cadcf5"/><text x="174" y="131" fill="#087e80" font-family="Consolas,monospace" font-size="12">grasp</text><circle cx="143" cy="82" r="3" fill="#1c62d6"/></svg>`;
  function renderCourse() {
    const day=active() ? dayOf(active().day) : nextDay();
    const learned=Object.keys(state.cards).length, completed=Object.keys(state.completed).length;
    const dueCount=due().length;
    $('#main').innerHTML=`<section class="hero"><div><div class="eyebrow">把英语练进你的工程日常</div><h1>打出单词，也记住用法。</h1><p>从技术文档到灵巧手研究，把词汇放回熟悉的场景。<br>每天 ${state.settings.minutes} 分钟，练习拼写、搭配和准确表达。</p><div class="tags"><span class="tag">六级基础进阶</span><span class="tag">100 个词与短语</span><span class="tag">无需注册</span></div></div>${robot}</section>
    <div class="stats"><div class="stat"><span>课程进度</span><strong>${completed}<small>/ 28 天</small></strong></div><div class="stat"><span>已练词汇</span><strong>${learned}<small>/ 100</small></strong></div><div class="stat"><span>到期复习</span><strong>${dueCount}<small>个词</small></strong></div></div>
    <div class="section-heading"><h2>${active() ? '接着上次的进度' : '今天，从这里开始'}</h2>${dueCount?'<button class="text-button" data-action="review">只复习到期词</button>':'<span>按自己的节奏完成</span>'}</div>
    <section class="today"><div><div class="day-label">第 ${day.number} 天 · ${day.review?'复习与应用':'5 个目标词'} · 约 ${state.settings.minutes} 分钟</div><h3>${escape(day.title)}</h3><p>${day.review?'回忆本周词汇，在自己的表达里重新使用。':'单词打字 → 常用搭配 → 情境例句 → 无提示回忆'}</p><div class="word-preview" lang="en">${day.review?'Recall. Connect. Put it into words.':day.items.map(i=>escape(i.word)).join(' / ')}</div></div><button class="primary" data-action="start" data-day="${day.number}">${active()?'继续学习':'开始今日学习'}</button></section>
    <div class="section-heading"><h2>你的四周学习路线</h2><span>20 天新词 + 8 天复习与应用</span></div>
    <div class="weekly-grid">${D.weeks.map((week,index)=>`<section class="week" style="--week-color:${week.color}"><div class="week-top"><span class="week-label">第 ${index+1} 周</span><span class="week-total">${D.days.filter(d=>d.week===index+1&&state.completed[d.number]).length} / 7 天</span></div><h3>${week.title}</h3><p>${week.subtitle}</p><div class="days">${D.days.filter(d=>d.week===index+1).map(d=>`<button class="day-button ${d.review?'review':''} ${state.completed[d.number]?'done':''} ${d.number===day.number?'current':''}" data-action="start" data-day="${d.number}" title="${escape(d.title)}" aria-label="第${d.number}天 ${escape(d.title)}${state.completed[d.number]?' 已完成':''}"><span>${state.completed[d.number]?'✓':d.number}</span><small>${d.review?'复习':'学习'}</small></button>`).join('')}</div></section>`).join('')}</div>
    <p class="route-note">先看着打，再遮住英文回忆。每周最后两天不加新词；漏学一天，接着学即可。</p><div class="backup-actions mobile-backup"><button class="text-button" data-action="export">导出进度</button><button class="text-button" data-action="import">导入进度</button></div>`;
  }
  function startLesson(number) {
    if (active() && active().day===Number(number)) { paused=false; lastActivity=Date.now(); setView('practice'); return; }
    if (active() && !confirm('要切换课程吗？当前打字位置将被替换，已经练习的词汇和已保存的写作会保留。')) return;
    const day=dayOf(number), reviewItems=due().slice(0,10).map(id=>byId[id]);
    const learnedItems=D.items.filter(item=>state.cards[item.id]);
    if (day.review && !learnedItems.length) { toast('先完成一节新词课，再来进行复习。'); return; }
    let lessonDay=day;
    // When review backlog grows, offer review first rather than doubling the daily workload.
    if (!day.review && due().length>20) {
      if (confirm(`有 ${due().length} 个到期词。建议今天先做最多 15 个复习，不增加新词。现在开始复习吗？取消则按原课程学习。`)) { startReviewOnly(true); return; }
    }
    if (day.review) {
      let pool=day.pool.filter(id=>state.cards[id]);
      if (!pool.length) pool=learnedItems.map(item=>item.id);
      lessonDay={...day,pool};
    }
    const queue=E.makeQueue(lessonDay,reviewItems,day.review?learnedItems:D.items);
    state.active={day:day.number,queue,index:0,seconds:0,typed:0,errors:0,attempts:0,recalls:0,correctRecalls:0,draft:state.notes[day.number]||'',input:'',assisted:false,missed:false,feedback:false,reviewOnly:false};
    paused=false; lastActivity=Date.now(); save(); setView('practice');
  }
  function startReviewOnly(replaceConfirmed=false) {
    const reviewItems=due().slice(0,15).map(id=>byId[id]);
    if (!reviewItems.length) { toast('目前没有到期词，可以按课程继续学习。'); return; }
    if (active() && !replaceConfirmed && !confirm('开始单独复习会替换当前打字位置。已练习的词汇会保留，是否继续？')) return;
    const day=nextDay();
    state.active={day:day.number,queue:reviewItems.map(item=>({kind:'review',itemId:item.id,target:item.word,blind:true})),index:0,seconds:0,typed:0,errors:0,attempts:0,recalls:0,correctRecalls:0,draft:'',input:'',assisted:false,missed:false,feedback:false,reviewOnly:true};
    paused=false; lastActivity=Date.now(); save(); setView('practice');
  }
  function sidePanel(a) {
    const times={20:[4,6,5,3,2],25:[5,7,7,4,2],30:[6,8,8,5,3]}[state.settings.minutes];
    return `<aside class="side-panel"><h3>今天的练习节奏</h3><ol class="mini-steps">${['复习旧词','单词与搭配','情境例句','遮住英文回忆','自己的表达'].map((label,i)=>`<li><span>${label}</span><span>${times[i]} 分钟</span></li>`).join('')}</ol><div class="metric"><span>打字准确率</span><strong id="accuracy">${accuracy(a)}</strong></div><div class="metric"><span>无提示回忆</span><strong id="recall-rate">${recallRate(a)}</strong></div><p>准确率记录输入字符；回忆率只记录没有提示、第一次就答对的词。两项分别统计。</p></aside>`;
  }
  const accuracy = a => a.typed ? `${Math.max(0,Math.round((a.typed-a.errors)/a.typed*100))}%` : '—';
  const recallRate = a => a.recalls ? `${Math.round(a.correctRecalls/a.recalls*100)}%` : '—';
  function lessonHeader(a) {
    const day=dayOf(a.day);
    return `<div class="lesson-header"><div><div class="lesson-meta">第 ${day.number} 天 · 第 ${day.week} 周${a.reviewOnly?' · 单独复习':''}</div><h1>${a.reviewOnly?'先巩固，再往前走':escape(day.title)}</h1></div><div class="lesson-time"><span class="timer" id="timer">${clock(a.seconds)}</span><button class="secondary" data-action="pause">${paused?'继续计时':'暂停'}</button><button class="text-button" data-action="back">保存并返回</button></div></div>`;
  }
  function renderPractice() {
    const a=active(); if (!a) { setView('course'); return; }
    if (a.index>=a.queue.length) { renderWriting(); return; }
    const q=a.queue[a.index], item=byId[q.itemId];
    const labels={word:'单词打字',phrase:'常用搭配',sentence:'情境例句',recall:'无提示回忆',review:'间隔复习'};
    const translation=q.kind==='sentence'?item.translation:q.kind==='phrase'?`常用搭配：${item.meaning}`:'先读懂含义，再输入英文。';
    $('#main').innerHTML=`${lessonHeader(a)}<div class="progress-line" aria-label="本课进度"><span style="width:${a.index/a.queue.length*100}%"></span></div><div class="practice-layout"><section class="practice-card"><div class="practice-top"><span class="mode-label">${labels[q.kind]}</span><span>${a.index+1} / ${a.queue.length}</span></div><div class="meaning">${escape(item.meaning)}<span class="pos">${escape(item.pos)}</span></div><p class="context-meaning">${q.blind?'根据中文输入本课目标词或短语。想不起来时可以查看提示。':escape(translation)}</p><div id="target" class="target" lang="en"></div><label class="sr-only" for="typing">输入英文答案</label><input id="typing" class="typing-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="input-hint exercise-feedback" placeholder="${q.blind?'回忆英文，输入后按 Enter':'从这里开始输入，完成后按 Enter'}" value="${escape(a.input)}" ${a.feedback||paused?'disabled':''}><p class="input-hint" id="input-hint">${paused?'已暂停。点击“继续计时”恢复练习。':'Enter 检查答案 · 答对后再按 Enter 进入下一题 · 使用英文输入法'}</p><div class="exercise-feedback ${a.missed&&!a.feedback?'error':''}" id="exercise-feedback" role="status">${a.feedback?(q.blind?(a.assisted||a.missed?'已完成。这次计为需复习，明天再试。':'回忆正确！已经安排下一次复习。'):'输入正确。读一遍含义，再进入下一题。'):''}</div><div class="practice-actions"><div class="action-group"><button class="secondary" data-action="hint" ${!q.blind||a.assisted||a.feedback?'disabled':''}>查看英文</button><button class="text-button" data-action="speak" ${q.blind&&!a.assisted&&!a.feedback?'disabled':''}>听发音</button></div><button id="check" class="primary" data-action="check" ${paused?'disabled':''}>${a.feedback?'下一题':'检查答案'}</button></div><div class="learning-note" id="learning-note" ${q.blind&&!a.assisted&&!a.feedback?'hidden':''}>${escape(item.note)}</div><div id="keyboard" class="keyboard" aria-hidden="true"></div></section>${sidePanel(a)}</div>`;
    renderTarget();
    $('#typing').addEventListener('input',onInput);
    $('#typing').addEventListener('paste',event=>{event.preventDefault();toast('打字练习请逐字输入；自己的写作可以粘贴。');});
    $('#typing').addEventListener('drop',event=>event.preventDefault());
    $('#typing').addEventListener('keydown',event=>{lastActivity=Date.now();if(event.key==='Enter'&&!event.isComposing){event.preventDefault();checkAnswer();}});
    if (!paused && !a.feedback) $('#typing').focus({preventScroll:true});
    if (a.feedback) $('#check').focus({preventScroll:true});
  }
  function renderTarget() {
    const a=active(), q=a.queue[a.index];
    const hidden=q.blind&&!a.assisted&&!a.feedback;
    $('#target').classList.toggle('blind',hidden);
    $('#target').innerHTML=hidden?'英文已隐藏 · 让大脑先试着回忆':Array.from(q.target).map((char,i)=>`<span class="${i<a.input.length?(char.toLowerCase()===a.input[i]?.toLowerCase()?'char-correct':'char-wrong'):i===a.input.length?'char-current':''}">${escape(char)}</span>`).join('');
    if ($('#keyboard')) {
      const next=hidden?'':q.target[a.input.length]?.toLowerCase();
      $('#keyboard').innerHTML=Array.from('asdfghjkl').map(key=>`<span class="key ${next===key?'next':''}">${key.toUpperCase()}</span>`).join('')+`<span class="key ${next===' '?'next':''}">space</span>`;
    }
  }
  function onInput(event) {
    const a=active(), q=a.queue[a.index], value=event.target.value, previous=a.input;
    lastActivity=Date.now();
    // Count newly inserted characters, including corrected retyping, without rewarding deletion.
    const inserted=event.inputType?.startsWith('insert')?(event.data?.length || Math.max(0,value.length-previous.length)):0;
    if (inserted) {
      const end=event.target.selectionStart ?? value.length, start=Math.max(0,end-inserted);
      a.typed+=inserted;
      for (let i=start;i<end;i++) if (value[i]?.toLowerCase()!==q.target[i]?.toLowerCase()) a.errors++;
    }
    a.input=value;
    $('#typing').classList.remove('invalid');
    if ($('#accuracy')) $('#accuracy').textContent=accuracy(a);
    renderTarget(); save();
  }
  function checkAnswer() {
    const a=active(); if (!a || paused || a.index>=a.queue.length) return;
    lastActivity=Date.now();
    if (a.feedback) { a.index++; a.input='';a.assisted=false;a.missed=false;a.feedback=false;save();renderPractice();return; }
    const q=a.queue[a.index];
    if (!a.input.trim()) { toast('先输入你的答案；想不起来时可点击“查看英文”。');$('#typing').focus();return; }
    a.attempts++;
    if (!E.matches(a.input,q.target)) {
      a.missed=true; $('#typing').classList.add('invalid');
      const f=$('#exercise-feedback');f.classList.add('error');f.textContent=q.blind?'还不正确。可以再试一次，或查看英文后重新输入。':'检查拼写、空格和标点，修改后再按 Enter。';
      save();$('#typing').focus();return;
    }
    if (q.blind) {
      a.recalls++;
      const success=!a.assisted&&!a.missed;
      if(success) a.correctRecalls++;
      state.cards[q.itemId]=E.gradeCard(state.cards[q.itemId],{correct:success,assisted:a.assisted},E.dateKey());
    }
    a.feedback=true;save();renderPractice();
  }
  function showHint() {
    const a=active();if(!a||a.index>=a.queue.length||a.feedback||paused)return;
    if(!a.queue[a.index].blind)return;
    a.assisted=true;lastActivity=Date.now();save();
    renderTarget();$('#learning-note').hidden=false;
    $('[data-action="hint"]').disabled=true;$('[data-action="speak"]').disabled=false;
    $('#exercise-feedback').textContent='现在看着英文重新输入。这次会安排到明天复习。';
    $('#typing').focus();
  }
  function speak() {
    const a=active();if(!a||a.index>=a.queue.length)return;
    const q=a.queue[a.index];if(q.blind&&!a.assisted&&!a.feedback)return;
    if(!('speechSynthesis' in window)){toast('此浏览器不支持朗读，可用词典音频辅助练习。');return;}
    if(!speechSynthesis.getVoices().some(v=>/^en/i.test(v.lang))){toast('尚未检测到英语语音，可在系统语音设置中添加英语语音后重试。');return;}
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(q.target);utterance.lang='en-US';utterance.rate=.85;
    utterance.onerror=()=>toast('语音暂不可用，打字练习可以继续。');speechSynthesis.speak(utterance);
  }
  function renderWriting() {
    const a=active(), day=dayOf(a.day);
    $('#main').innerHTML=`${lessonHeader(a)}<div class="progress-line"><span style="width:100%"></span></div><div class="practice-layout"><section class="practice-card"><div class="practice-top"><span class="mode-label">把词汇变成自己的表达</span><span>最后一步</span></div><h2 style="margin-top:28px">写几句，联系你的实际工作。</h2><p class="context-meaning">建议写 30 至 60 词；复习日可写 50 至 80 词。时间不足时，至少写 20 词并在下一次改进。</p><div class="prompt">${escape(a.reviewOnly?'选今天复习的 3 个词，写一段工程情境说明。':day.prompt)}</div><label for="writing">你的英文表达</label><textarea id="writing" class="writing" lang="en" spellcheck="true" maxlength="20000" ${paused?'disabled':''} placeholder="Start with a problem, explain your approach, and state one limitation.">${escape(a.draft)}</textarea><p class="input-hint" id="word-count"></p><div class="checklist">写完自检：<br>□ 至少使用 3 个目标词，搭配是否自然？<br>□ 结论的条件、变量或比较基准是否清楚？<br>□ 遮住材料后，还能解释句子的含义吗？</div><p class="input-hint">这里记录你的练习，不会自动判断语法或算法结论。可以把这段文字发给我继续批改。</p><div class="practice-actions"><button class="secondary" data-action="back">保存，下次继续</button><button class="primary" data-action="finish" ${paused?'disabled':''}>完成本次学习</button></div></section>${sidePanel(a)}</div>`;
    $('#writing').addEventListener('input',event=>{a.draft=event.target.value;state.notes[a.day]=a.draft;lastActivity=Date.now();save();updateWordCount();});
    updateWordCount();
  }
  const wordCount = text => (text.match(/[A-Za-z]+(?:['-][A-Za-z]+)*/g)||[]).length;
  function updateWordCount(){ $('#word-count').textContent=`已写 ${wordCount(active().draft)} 词 · 自动保存到当前浏览器`; }
  function finishLesson() {
    const a=active();if(!a||a.index<a.queue.length||paused)return;
    if(wordCount(a.draft)<20){toast('请先写至少 20 个英文词。试着描述问题、方法和一项局限。');$('#writing').focus();return;}
    const day=dayOf(a.day);
    state.notes[a.day]=a.draft;
    if(!a.reviewOnly)state.completed[a.day]={date:E.dateKey(),seconds:a.seconds};
    state.active=null;save();screen='summary';$('#breadcrumb').textContent='我的课程 / 本课记录';
    $('#main').innerHTML=`<section class="summary"><div class="success-icon" aria-hidden="true">✓</div><h1>${a.reviewOnly?'这轮复习完成了。':`第 ${day.number} 天，完成。`}</h1><p>今天练习过的词，已经安排好下一次复习。<br>读一遍自己的英文，看看有没有想进一步说清楚的地方。</p><div class="summary-stats"><div><strong>${clock(a.seconds)}</strong><span>活跃学习时长</span></div><div><strong>${accuracy(a)}</strong><span>打字准确率</span></div><div><strong>${recallRate(a)}</strong><span>无提示回忆率</span></div></div><div class="prompt" style="text-align:left">${escape(a.draft).replace(/\n/g,'<br>')}</div><p>${a.seconds<state.settings.minutes*60?'如果还有时间，用今天的词再改写两句，或朗读自己的表达。':`已完成本次计划，可以休息了。`}</p><button class="primary" data-action="back">返回学习路线</button> <button class="secondary" data-action="export">导出学习进度</button></section>`;
    lastActivity=Date.now();window.scrollTo(0,0);
  }
  function renderWords() {
    $('#main').innerHTML=`<div class="eyebrow">查含义，也查怎么用</div><h1>你的词汇手册</h1><p class="context-meaning">100 个词与短语。先按语境理解，再练习搭配；“已练”表示做过回忆练习，尚不等于掌握。</p><div class="search-row"><input id="word-search" type="search" aria-label="搜索单词、中文或搭配" placeholder="搜索单词、中文或搭配"><select id="week-filter" aria-label="按周筛选"><option value="all">全部主题</option>${D.weeks.map((w,i)=>`<option value="${i+1}">第 ${i+1} 周 · ${w.subtitle}</option>`).join('')}</select><select id="status-filter" aria-label="按复习状态筛选"><option value="all">全部词汇</option><option value="due">到期复习</option><option value="learned">已经练过</option><option value="new">尚未练习</option></select></div><div class="word-list" id="word-list"></div>`;
    $('#word-search').addEventListener('input',filterWords);$('#week-filter').addEventListener('change',filterWords);$('#status-filter').addEventListener('change',filterWords);filterWords();
  }
  function filterWords() {
    const query=$('#word-search').value.trim().toLowerCase(), week=$('#week-filter').value, status=$('#status-filter').value;
    const today=E.dateKey();
    const filtered=D.items.filter(i=>(week==='all'||i.week===Number(week))&&(`${i.word} ${i.meaning} ${i.phrase}`).toLowerCase().includes(query)&&(status==='all'||status==='due'&&state.cards[i.id]?.due<=today||status==='learned'&&state.cards[i.id]||status==='new'&&!state.cards[i.id]));
    $('#word-list').innerHTML=filtered.length?filtered.map(item=>`<article class="word-row"><div class="word-head"><small>第 ${item.week} 周 · 第 ${item.day} 天 · ${item.pos}</small><strong lang="en">${escape(item.word)}</strong><p>${escape(item.meaning)}</p>${state.cards[item.id]?`<span class="word-badge">${state.cards[item.id].due<=today?'待复习':'下次 '+state.cards[item.id].due}</span>`:''}</div><div class="word-detail"><p class="word-phrase" lang="en">${escape(item.phrase)}</p><p lang="en">${escape(item.sentence)}</p><p>${escape(item.translation)}</p><small>${escape(item.note)}</small></div></article>`).join(''):'<p class="empty">没有匹配的词，试试其他关键词或筛选条件。</p>';
  }
  function renderGuide() {
    $('#main').innerHTML=`<div class="guide"><div class="eyebrow">让每天的练习真正可持续</div><h1>每天 20 至 30 分钟，怎么学？</h1><section><h2>先从你的实际能力出发</h2><p>六级经历说明你有英语学习基础，但不能直接确定当前阅读、听力或主动表达水平。本课从熟词技术义、高频搭配和专业语境入手。如果前两天无提示回忆率超过 90%，把重点放在句子改写与限时表达；若低于 60%，先学 3 个词，剩余内容保留到下一次。</p><p>每课可以随时保存返回。20 分钟时减少扩展朗读，30 分钟时增加自己的表达，不用为了进度连学两课。</p></section><section><h2>25 分钟的标准节奏</h2><table class="schedule"><tbody><tr><td>5 分钟</td><td>复习到期词。先回忆，想不起来再看提示。</td></tr><tr><td>7 分钟</td><td>学习最多 5 个词，理解含义与搭配，逐字输入。</td></tr><tr><td>7 分钟</td><td>打出情境例句，读懂后改写其中一两句。</td></tr><tr><td>4 分钟</td><td>遮住英文回忆目标词，区分认识与会用。</td></tr><tr><td>2 分钟</td><td>写几句自己的表达，记录一项容易混淆的用法。</td></tr></tbody></table><p>时间是练习分配建议。计时器记录页面可见且最近 90 秒有操作时的时长；暂停、离开页面或长时间无操作不会持续计时。打完题目不一定等于用满时间，剩余时间用于朗读和改写。</p></section><section><h2>为什么不能只看着打</h2><p>看着英文输入训练拼写和键盘动作；遮住英文后从中文提取目标词，才考察回忆。因此，照打不增加记忆等级。每个新词先练单词、搭配与句子，最后再进入无提示回忆。</p><p>回忆答错或查看提示，会安排到明天再练。成功回忆后，间隔依次为 1、3、7、14、30 天；同一天重复成功不继续拉长间隔。这是便于执行的规则，不是对个人遗忘曲线的精确测量。</p><p>新词课先复习最多 10 个到期词；到期超过 20 个时会建议先完成最多 15 个复习。复习日从已练词中选最多 15 个，不额外添加新词。没按时学不必补双倍，接着完成下一课即可。</p></section><section><h2>每周检验会不会用</h2><p>每周最后两天用于复习与写作。自测时不看例句，选 5 个词写 50 至 80 词并朗读 60 秒。两次相隔至少 3 天的练习都能无提示回忆，且能在新句子中正确使用，可暂记为熟悉；不以一次打对判断掌握。</p><p>课程共有 100 个目标项，部分是熟词或短语。完成 100 项不意味着词汇量必然增加 100，也不等于英语等级发生提升。</p></section><section><h2>保存与使用</h2><p>课程无需账号。进度保存在当前浏览器，包含打字位置、词汇复习日期和写作。更换浏览器、网址或清理浏览数据后，记录不会自动同步；每周导出一次 JSON 备份，需要时导入。请只在一个标签页学习，避免多页同时覆盖进度。</p><p>发音使用浏览器及系统的英语语音，是否可用取决于设备；没有英语语音也可以完成打字练习。课程例句描述的是假想场景，实际机器人控制与实验结论需要另外验证。</p><div class="backup-actions"><button class="text-button" data-action="export">导出进度</button><button class="text-button" data-action="import">导入进度</button></div></section><section><h2>设计参考</h2><p>交互参考 <a href="https://www.edclub.com/zh/library/%E4%B9%A0%E5%AD%97%E4%B8%9B%E6%9E%97" target="_blank" rel="noreferrer">edclub 习字丛林</a>的课程分段与即时反馈，练习内容与界面独立制作。</p><p>把词汇放入有意义的场景、学习搭配并分散复习，参考 <a href="https://www.britishcouncil.org/voices-magazine/ten-ways-learn-new-words-language-learner" target="_blank" rel="noreferrer">British Council 的词汇学习建议</a>；后续主动回忆与重复使用，参考 <a href="https://www.teachingenglish.org.uk/professional-development/teachers/knowing-subject/remembering-vocabulary" target="_blank" rel="noreferrer">Remembering vocabulary</a>。每日词量、时间与复习间隔是本课的可调整安排。</p></section></div>`;
  }
  function download(name,content) {
    const url=URL.createObjectURL(new Blob([content],{type:'application/json;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function exportProgress() {
    save();download(`LexiLab-progress-${E.dateKey()}.json`,JSON.stringify(state,null,2));
    if(corruptRaw) {download(`LexiLab-original-recovery-${E.dateKey()}.json`,corruptRaw);toast('已导出本次进度和原始异常存档，请分别保留。');}
    else toast('进度备份已导出。下次可用“导入进度”恢复。');
  }
  $('#export').addEventListener('click',exportProgress);
  $('#import').addEventListener('click',()=>$('#import-file').click());
  $('#import-file').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try {
      if(file.size>2000000)throw new Error('文件过大');
      const imported=JSON.parse(await file.text());
      if(!E.validateState(imported,ids))throw new Error('这不是有效的 LexiLab 进度文件');
      // Verify task text against the bundled course, rather than trusting imported answer strings.
      if(imported.active?.queue.some(q=>![byId[q.itemId].word,byId[q.itemId].phrase,byId[q.itemId].sentence].includes(q.target)))throw new Error('练习内容与本课程不一致');
      if(!confirm('导入会替换当前浏览器中的学习进度。建议先导出当前进度备份。继续导入吗？'))return;
      state=imported;storageLocked=false;corruptRaw=null;$('#notice').hidden=true;save();setView('course');toast('进度已恢复。');
    }catch(error){toast(`没有导入：${error.message}。现有进度保持不变。`);}finally{event.target.value='';}
  });
  $('#duration').addEventListener('change',event=>{state.settings.minutes=Number(event.target.value);save();if(screen==='course')renderCourse();});
  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-view]');if(nav){save();setView(nav.dataset.view);return;}
    const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
    const action=button.dataset.action;
    if(action==='start')startLesson(button.dataset.day);
    if(action==='check')checkAnswer();
    if(action==='hint')showHint();
    if(action==='speak')speak();
    if(action==='pause'){paused=!paused;lastActivity=Date.now();save();renderPractice();}
    if(action==='back'){save();setView('course');}
    if(action==='finish')finishLesson();
    if(action==='export')exportProgress();
    if(action==='import')$('#import-file').click();
    if(action==='review')startReviewOnly();
  });
  $('.brand').addEventListener('click',event=>{event.preventDefault();setView('course');});
  document.addEventListener('keydown',event=>{if(!event.defaultPrevented&&screen==='practice'&&active()?.feedback&&event.key==='Enter'&&!event.isComposing&&!event.target.closest('button')){event.preventDefault();checkAnswer();}});
  document.addEventListener('visibilitychange',()=>{lastActivity=0;save();});
  window.addEventListener('pagehide',save);
  setInterval(()=>{
    const a=active();if(!a||screen!=='practice'||paused||document.hidden||Date.now()-lastActivity>90000)return;
    a.seconds++;if($('#timer'))$('#timer').textContent=clock(a.seconds);
    if(!a.goalNotified&&a.seconds>=state.settings.minutes*60){a.goalNotified=true;toast('已达到今天的计划时间，可以保存进度，下次继续。');}
    if(a.seconds%5===0)save();
  },1000);
  if('speechSynthesis'in window)speechSynthesis.getVoices();
  setView('course');
})();
