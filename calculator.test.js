'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculateSize } = require('./calculator.js');

for (const [w, h, pw, ph] of [[8, 10, 2400, 3000], [10, 8, 3000, 2400], [12, 16, 3600, 4800], [8.5, 11, 2550, 3300], [5, 5, 1500, 1500], [0.125, 1, 38, 300]]) {
  test(`README example: ${w} × ${h} inches`, () => {
    const result = calculateSize(String(w), String(h));
    assert.equal(result.width, pw);
    assert.equal(result.height, ph);
    assert.equal(result.rounded, w === 0.125);
  });
}

test('positive decimals, whitespace, and rounding down', () => {
  assert.deepEqual(calculateSize(' .124 ', '1.5'), { width: 37, height: 450, rounded: true });
});

test('invalid and unreliable values are rejected in either field', () => {
  for (const value of ['', ' ', '0', '-1', 'text', 'Infinity', 'NaN', '1,5', '8 inches', '<script>', '0x10', '1e3', '0.0001', '999999999999999999999999999999999999']) {
    assert.throws(() => calculateSize(value, '10'), Error, `width ${value}`);
    assert.throws(() => calculateSize('8', value), Error, `height ${value}`);
  }
});

test('UI calculates, clears stale results, reports errors, and recalculates', () => {
  const vm = require('node:vm');
  const fs = require('node:fs');
  const elements = new Map();
  const document = { getElementById(id) {
    if (!elements.has(id)) elements.set(id, {
      value: '', textContent: '', hidden: true, attributes: {}, listeners: {},
      addEventListener(type, fn) { this.listeners[type] = fn; },
      removeAttribute(key) { delete this.attributes[key]; },
      setAttribute(key, value) { this.attributes[key] = value; },
      focus() { this.focused = true; }
    });
    return elements.get(id);
  } };
  const context = vm.createContext({ document });
  vm.runInContext(fs.readFileSync('calculator.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
  const el = id => elements.get(id);
  const submit = () => el('size-form').listeners.submit({ preventDefault() {} });
  el('width').value = '8'; el('height').value = '10'; submit();
  assert.equal(el('dimensions').textContent, '2400 × 3000');
  assert.equal(el('result').hidden, false);
  assert.match(el('status').textContent, /Width 2400 pixels, height 3000 pixels/);
  el('size-form').listeners.input();
  assert.equal(el('result').hidden, true);
  assert.equal(el('dimensions').textContent, '');
  el('width').value = '0'; submit();
  assert.equal(el('width').attributes['aria-invalid'], 'true');
  assert.equal(el('width').focused, true);
  assert.match(el('error').textContent, /greater than zero/);
  assert.equal(el('result').hidden, true);
  el('width').value = '0.125'; el('height').value = ''; submit();
  assert.equal(el('height').attributes['aria-invalid'], 'true');
  el('height').value = '1'; submit();
  assert.equal(el('dimensions').textContent, '38 × 300');
  assert.match(el('rounding').textContent, /Rounded/);
  assert.equal(el('error').textContent, '');
});
