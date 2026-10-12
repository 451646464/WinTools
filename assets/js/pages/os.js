/*
 * WinTools — pages/os.js
 * Shared launcher for the three OS reference pages. Detects the current
 * page from its filename, mounts the command browser, wires up the
 * search box, category chips and expand/collapse controls.
 */
(function () {
  'use strict';
  var WT = window.WinTools || {};

  /* Map page name -> { data, cats, prefix } matching the DOM ids. */
  var PAGES = {
    linux: { data: 'linux', cats: 'linuxCats', p: 'linux' },
    windows: { data: 'windows', cats: 'winCats', p: 'win' },
    macos: { data: 'macos', cats: 'macCats', p: 'mac' },
    cisco: { data: 'cisco', cats: 'ciscoCats', p: 'cisco' },
    servers: { data: 'servers', cats: 'serverCats', p: 'srv' }
  };

  function currentPage() {
    var f = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return f.replace('.html', '');
  }

  function init() {
    var key = currentPage();
    var cfgMap = PAGES[key];
    if (!cfgMap || !WT.browser || !WT.data) return;

    var data = WT.data[cfgMap.data];
    var cats = WT.data[cfgMap.cats];
    if (!data || !cats) return;

    var p = cfgMap.p;
    var browser = WT.browser.mount({
      data: data,
      cats: cats,
      host: p + 'List',
      countEl: p + 'Count',
      searchEl: p + 'Search',
      chipsEl: p + 'Chips',
      allLabel: 'All'
    });

    var expandBtn = document.getElementById(p + 'Expand');
    var collapseBtn = document.getElementById(p + 'Collapse');
    if (expandBtn && browser) expandBtn.addEventListener('click', browser.expandAll);
    if (collapseBtn && browser) collapseBtn.addEventListener('click', browser.collapseAll);

    if (WT.ui && WT.ui.hydrateIcons) WT.ui.hydrateIcons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
