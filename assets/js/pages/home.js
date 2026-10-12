/*
 * WinTools — pages/home.js
 * Home page: animated stat counters.
 */
(function () {
  'use strict';
  var WT = window.WinTools || {};

  /* Animate counters with data-count attributes once they scroll into view. */
  function animateCounters() {
    var nums = document.querySelectorAll('.stat .num[data-count]');
    if (!nums.length) return;

    function run(el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (target === 0) { el.textContent = '0' + suffix; return; }
      var dur = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var seen = new WeakSet();
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !seen.has(en.target)) {
            seen.add(en.target);
            run(en.target);
          }
        });
      }, { threshold: 0.5 });
      nums.forEach(function (n) { io.observe(n); });
    } else {
      nums.forEach(run);
    }
  }

  function init() {
    animateCounters();
    if (WT.ui && WT.ui.hydrateIcons) WT.ui.hydrateIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
