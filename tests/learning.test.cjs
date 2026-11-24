const { test } = require('node:test');
const assert = require('node:assert/strict');
let engine;
try { engine = require('../dist/engine.js'); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }

// These tests protect learner-visible behavior: copying must not count as recall,
// failed retrieval must come back, reviews must respect a daily limit, and backups must validate.
test('shown or hinted answers never earn a successful recall interval', () => {
  assert.ok(engine, 'The learning engine has not been implemented yet');
  const card = engine.gradeCard(null, { correct: true, assisted: true }, '2026-11-25');
  assert.equal(card.level, 0);
  assert.equal(card.due, '2026-11-26');
});
test('successful unaided recall is scheduled on calendar days; a miss resets it', () => {
  assert.ok(engine);
  let card = engine.gradeCard(null, { correct: true, assisted: false }, '2026-11-25');
  assert.equal(card.due, '2026-11-26');
  card = engine.gradeCard(card, { correct: true, assisted: false }, '2026-11-26');
  assert.equal(card.due, '2026-11-29');
  card = engine.gradeCard(card, { correct: false, assisted: false }, '2026-11-29');
  assert.equal(card.level, 0);
  assert.equal(card.due, '2026-11-30');
});
test('overdue and weak cards are reviewed first, with a strict cap', () => {
  assert.ok(engine);
  const cards = { a: { due: '2026-11-24', level: 3 }, b: { due: '2026-11-24', level: 0 }, c: { due: '2026-11-27', level: 0 } };
  assert.deepEqual(engine.dueCards(cards, '2026-11-25', 1), ['b']);
});
test('repeating a successful recall on the same day cannot inflate spaced retention', () => {
  const previous = { level: 1, due: '2026-11-26', last: '2026-11-25', reviews: 1 };
  const card = engine.gradeCard(previous, { correct: true, assisted: false }, '2026-11-25');
  assert.equal(card.level, 1);
  assert.equal(card.due, '2026-11-26');
});
test('new learning includes word, phrase, context and unaided recall; review days add no new terms', () => {
  assert.ok(engine);
  const item = { id: 'x', word: 'constraint', meaning: '约束', phrase: 'satisfy a constraint', sentence: 'The trajectory must satisfy a constraint.', translation: '轨迹必须满足一项约束。' };
  const queue = engine.makeQueue({ review: false, items: [item] }, [], [item]);
  assert.equal(queue.filter(q => q.kind === 'recall').length, 1);
  assert.ok(queue.some(q => q.target === item.phrase));
  assert.ok(queue.some(q => q.target === item.sentence));
  assert.equal(engine.makeQueue({ review: true, items: [] }, [item], [item]).length, 1);
});
test('input normalization accepts case and outer spaces but preserves spelling and word boundaries', () => {
  assert.ok(engine);
  assert.equal(engine.matches('  Account for ', 'account for'), true);
  assert.equal(engine.matches('accountfor', 'account for'), false);
  assert.equal(engine.matches('constriant', 'constraint'), false);
});
test('backups reject malformed dates, nonfinite timing, unknown cards and invalid lesson numbers', () => {
  assert.ok(engine);
  const state = engine.newState();
  assert.equal(engine.validateState(state, ['x']), true);
  state.cards.x = { due: 'tomorrow', level: 1, reviews: 1 };
  assert.equal(engine.validateState(state, ['x']), false);
  state.cards.x = { due: '2026-02-30', level: 1, reviews: 1 };
  assert.equal(engine.validateState(state, ['x']), false);
  state.cards = { unknown: { due: '2026-11-25', level: 0, reviews: 1 } };
  assert.equal(engine.validateState(state, ['x']), false);
  state.cards = {};
  state.completed['29'] = { date: '2026-11-25', seconds: 20 };
  assert.equal(engine.validateState(state, ['x']), false);
});
