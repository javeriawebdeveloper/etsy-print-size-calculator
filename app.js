'use strict';

const form = document.getElementById('size-form');
const width = document.getElementById('width');
const height = document.getElementById('height');
const result = document.getElementById('result');
const dimensions = document.getElementById('dimensions');
const rounding = document.getElementById('rounding');
const error = document.getElementById('error');
const status = document.getElementById('status');

function clearResult() {
  result.hidden = true;
  dimensions.textContent = '';
  rounding.textContent = '';
  error.textContent = '';
  status.textContent = '';
  width.removeAttribute('aria-invalid');
  height.removeAttribute('aria-invalid');
}

form.addEventListener('input', clearResult);
form.addEventListener('submit', event => {
  event.preventDefault();
  clearResult();
  // Validate fields individually so keyboard focus reaches the first problem.
  for (const [field, name] of [[width, 'width'], [height, 'height']]) {
    try { pixelsFor(field.value, name); }
    catch (problem) {
      error.textContent = problem.message;
      field.setAttribute('aria-invalid', 'true');
      field.focus();
      return;
    }
  }
  const size = calculateSize(width.value, height.value);
  dimensions.textContent = `${size.width} × ${size.height}`;
  rounding.textContent = size.rounded ? 'Rounded to the nearest whole pixel.' : 'Exact whole-pixel dimensions.';
  result.hidden = false;
  status.textContent = `Width ${size.width} pixels, height ${size.height} pixels at 300 PPI. ${rounding.textContent}`;
});
