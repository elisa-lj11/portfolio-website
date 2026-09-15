/*
 * Post-build smoke test.
 *
 * Runs automatically after `npm run build` (the "postbuild" script), so it also
 * gates `npm run deploy` via predeploy. Exits non-zero to block a bad deploy.
 *
 * Why this exists: on 2026-09-14 the Babel 8 upgrade shipped a blank production
 * site. Babel 8 changed @babel/preset-react's default runtime to "automatic",
 * and because the build did not set NODE_ENV, Babel emitted jsxDEV from
 * react/jsx-dev-runtime -- a function the production React build does not
 * provide. The bundle compiled cleanly and the dev server looked fine (dev is
 * the one environment where jsxDEV is correct), so nothing caught it until the
 * deployed page threw "(0 , c(...).jsxDEV) is not a function" at module eval.
 *
 * The lesson: compiling is not evidence that the bundle runs. This executes the
 * production bundle under jsdom and fails if it throws.
 *
 * WHAT THIS DOES NOT COVER: jsdom has no WebGL, so three.js cannot initialize
 * and the React tree tears down before anything lands in #root. That means this
 * verifies module evaluation and early render only -- it cannot tell you the 3D
 * scenes look right, and it would NOT catch a blank page that fails silently
 * without throwing. A browser pass is still required for visual confirmation.
 *
 * To check that this test can still fail, point it at a known-bad bundle:
 *   node scripts/smoke-test.js path/to/broken_bundle.js
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const bundlePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(BUILD_DIR, 'index_bundle.js');

// jsdom cannot provide WebGL; three.js failing on that says nothing about the bundle.
const BENIGN = /WebGL|WEBGL|getContext|THREE\.WebGLRenderer/i;
// Error text that means the bundle is genuinely broken.
const FATAL = /is not a function|is not defined|Cannot read propert|Minified React error/i;
// How long to wait for React's async render and any late errors.
const SETTLE_MS = 1000;

const failures = [];
const fail = (msg) => failures.push(msg);

function checkStaticShell() {
  const htmlPath = path.join(BUILD_DIR, 'index.html');
  if (!fs.existsSync(htmlPath)) return fail('build/index.html is missing');
  const html = fs.readFileSync(htmlPath, 'utf8');
  // Production HTML is minified, so attributes are unquoted: id=root
  if (!/id=["']?root["']?/.test(html)) fail('build/index.html has no #root mount point');
  if (!/<script[^>]+src=/.test(html)) fail('build/index.html references no bundle');
}

function checkNoDevJsxRuntime(code) {
  if (/jsxDEV|jsx-dev-runtime/.test(code)) {
    fail(
      'bundle contains the DEVELOPMENT JSX runtime (jsxDEV); the production ' +
      'build must not. Check that NODE_ENV=production is set for the build.'
    );
  }
}

function runBundle(code, done) {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://elisalupin.com/' }
  );
  const w = dom.window;

  w.matchMedia = w.matchMedia || (() => ({
    matches: false, media: '', onchange: null,
    addListener() {}, removeListener() {},
    addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; },
  }));
  w.HTMLCanvasElement.prototype.getContext = () => null;

  const record = (msg) => {
    const m = String(msg);
    if (BENIGN.test(m)) return;
    if (FATAL.test(m)) fail('runtime error: ' + m.slice(0, 300).replace(/\s+/g, ' '));
  };
  w.onerror = record;
  w.console.error = (...args) => record(args.map(String).join(' '));
  w.console.warn = () => {};

  try {
    w.eval(code);
  } catch (e) {
    fail('bundle threw at module eval: ' + e.message);
    return done();
  }

  // React 19 renders asynchronously; give it time to settle and surface errors.
  setTimeout(done, SETTLE_MS);
}

function finish() {
  if (failures.length > 0) {
    console.error('\nsmoke test FAILED (' + failures.length + '):');
    failures.forEach((f) => console.error('  - ' + f));
    console.error('\nThe bundle compiled but does not run. Do not deploy.\n');
    process.exit(1);
  }
  console.log(
    'smoke test passed: bundle evaluates with no fatal errors, no dev JSX runtime.\n' +
    '  (jsdom has no WebGL, so the 3D scenes are NOT verified -- check a browser for visuals.)'
  );
  process.exit(0);
}

if (!fs.existsSync(bundlePath)) {
  console.error('smoke test: bundle not found at ' + bundlePath + ' -- run npm run build first');
  process.exit(1);
}

checkStaticShell();
const code = fs.readFileSync(bundlePath, 'utf8');
checkNoDevJsxRuntime(code);
runBundle(code, finish);
