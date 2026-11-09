# Etsy Print Size Calculator

## Project goal

Build a small calculator for printable wall art. The user enters width and
height in inches, and the app shows the pixel dimensions at **300 PPI** for
entering a custom design size in Canva.

Use plain HTML, CSS, and JavaScript. Keep the files together so `index.html`
opens directly in a browser without installation or a server. The calculator
is implemented and processes inputs locally without network requests or storage.

## Open on Windows

1. On GitHub, select `main` and choose **Code > Download ZIP**.
2. In File Explorer, right-click the ZIP and choose **Extract All**.
3. Open the extracted folder and double-click `index.html` to open it in Edge
   or Chrome. Keep `styles.css`, `calculator.js`, and `app.js` alongside it.
4. Enter width and height in inches, using a dot for decimals, then choose
   **Calculate pixel size** or press Enter from an input.
5. In Canva, choose a custom size in **px** and enter the resulting width and
   height. This tool does not create or resize a Canva design automatically.

JavaScript must be enabled. The repository link shows source files; it is not
a hosted running app.

## Formula

- Width in pixels = width in inches × 300
- Height in pixels = height in inches × 300

Show the result as **width × height pixels**. Accept positive decimal inputs;
round each result to the nearest whole pixel when necessary. This calculation
gives target dimensions; it does not improve an image's existing resolution
or guarantee print quality. Canva's current size limits may still apply.

## Test examples

| Width (inches) | Height (inches) | Expected pixels at 300 PPI |
| --- | --- | --- |
| 8 | 10 | 2400 × 3000 |
| 10 | 8 | 3000 × 2400 |
| 12 | 16 | 3600 × 4800 |
| 8.5 | 11 | 2550 × 3300 |
| 5 | 5 | 1500 × 1500 |
| 0.125 | 1 | 38 × 300 (37.5 rounds to 38) |

Also test blank fields, zero, negative values, nonnumeric text, and numbers
too large to calculate reliably. Show a clear error rather than an invalid
result. If rounding would produce zero pixels, ask for a larger dimension.
Confirm editing and recalculating updates both dimensions, and check the page
in Edge and Chrome on Windows, including keyboard use and narrow screens.

## Verification

With Node.js installed, run `node --test calculator.test.js`. All nine automated
tests passed, covering the examples, rounding, invalid inputs, error feedback,
clearing old results, and recalculation. JavaScript syntax, HTML asset links,
and Git whitespace checks also passed. UI tests use a simulated document.

Visual and keyboard review in actual Edge and Chrome on Windows is still
pending. The managed environment's required browser tool was unavailable;
automated logic tests do not replace those browser checks.

## Git workflow

Start with this README on `main`. Build and test the calculator on `develop`,
then merge reviewed work into `main` when ready.
