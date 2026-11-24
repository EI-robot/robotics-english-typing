(function (root) {
  'use strict';
  const intervals = [1, 3, 7, 14, 30];
  const normalize = value => String(value).normalize('NFKC').trim().toLowerCase().replace(/[’]/g, "'");
  const matches = (input, target) => normalize(input) === normalize(target);
  function dateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  function addDays(key, days) {
    const [year, month, day] = key.split('-').map(Number);
    return dateKey(new Date(year, month-1, day+days, 12));
  }
  function gradeCard(previous, result, today) {
    const success = result.correct && !result.assisted;
    if (success && previous?.last===today) return {...previous,reviews:previous.reviews+1};
    const level = success ? Math.min((previous?.level || 0)+1, intervals.length) : 0;
    const wait = success ? intervals[level-1] : 1;
    return {level, due:addDays(today, wait), reviews:(previous?.reviews || 0)+1, last:today};
  }
  function dueCards(cards, today, cap=10) {
    return Object.keys(cards).filter(id=>cards[id].due<=today)
      .sort((a,b)=>cards[a].due.localeCompare(cards[b].due) || cards[a].level-cards[b].level || a.localeCompare(b)).slice(0,cap);
  }
  function makeQueue(day, reviewItems, allItems) {
    const queue = reviewItems.map(item=>({kind:'review', itemId:item.id, target:item.word, blind:true}));
    if (!day.review) {
      for (const item of day.items) {
        queue.push({kind:'word', itemId:item.id, target:item.word, blind:false});
        queue.push({kind:'word', itemId:item.id, target:item.word, blind:false});
        queue.push({kind:'phrase', itemId:item.id, target:item.phrase, blind:false});
        queue.push({kind:'sentence', itemId:item.id, target:item.sentence, blind:false});
      }
      for (const item of day.items) queue.push({kind:'recall', itemId:item.id, target:item.word, blind:true});
    } else {
      const seen = new Set(reviewItems.map(item=>item.id));
      const pool = (day.pool || []).map(id=>allItems.find(item=>item.id===id)).filter(Boolean);
      for (const item of pool.filter(item=>!seen.has(item.id)).slice(0,Math.max(0,15-queue.length))) {
        queue.push({kind:'recall', itemId:item.id, target:item.word, blind:true});
      }
    }
    return queue;
  }
  function newState() { return {version:1, cards:{}, completed:{}, notes:{}, settings:{minutes:25}, active:null}; }
  function validDate(value) {
    if (typeof value!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value+'T12:00:00');
    return !isNaN(date) && dateKey(date)===value;
  }
  const obj = value => value && typeof value==='object' && !Array.isArray(value);
  const safeNumber = value => typeof value==='number' && Number.isFinite(value) && value>=0;
  function validateState(state, ids, dayCount=28) {
    if (!Number.isInteger(dayCount) || dayCount<1) return false;
    const validLesson = key => /^[1-9]\d*$/.test(key) && Number(key)<=dayCount;
    if (!obj(state) || state.version!==1 || !obj(state.cards) || !obj(state.completed) || !obj(state.notes) || !obj(state.settings)) return false;
    if (![20,25,30].includes(state.settings.minutes)) return false;
    if (state.active!==null) {
      const a=state.active;
      if (!obj(a) || !Number.isInteger(a.day) || a.day<1 || a.day>dayCount || !Array.isArray(a.queue) || a.queue.length>100 || !Number.isInteger(a.index) || a.index<0 || a.index>a.queue.length || !safeNumber(a.seconds) || !safeNumber(a.typed) || !safeNumber(a.errors) || !safeNumber(a.attempts) || !safeNumber(a.recalls) || !safeNumber(a.correctRecalls) || typeof a.draft!=='string' || typeof a.input!=='string' || typeof a.assisted!=='boolean' || typeof a.missed!=='boolean' || typeof a.feedback!=='boolean') return false;
      if (!a.queue.every(q=>obj(q) && ids.includes(q.itemId) && typeof q.target==='string' && q.target.length<500 && ['word','phrase','sentence','recall','review'].includes(q.kind) && typeof q.blind==='boolean')) return false;
    }
    if (!Object.entries(state.cards).every(([id,c])=>ids.includes(id) && obj(c) && validDate(c.due) && Number.isInteger(c.level) && c.level>=0 && c.level<=5 && Number.isInteger(c.reviews) && c.reviews>=0 && (!c.last || validDate(c.last)))) return false;
    if (!Object.entries(state.completed).every(([day,c])=>validLesson(day) && obj(c) && validDate(c.date) && safeNumber(c.seconds))) return false;
    return Object.entries(state.notes).every(([day,note])=>validLesson(day) && typeof note==='string' && note.length<=20000);
  }
  const api={normalize,matches,dateKey,addDays,gradeCard,dueCards,makeQueue,newState,validateState};
  if (typeof module!=='undefined' && module.exports) module.exports=api;
  else root.LearningEngine=api;
})(typeof globalThis!=='undefined' ? globalThis : this);
