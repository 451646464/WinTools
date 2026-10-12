/*
 * WinTools — browser.js
 * Shared command-browser: search, category filter, expandable cards with
 * syntax, options, examples and copy-to-clipboard. Works for any dataset
 * registered on WT.data (linux, windows, macos).
 */
(function (root) {
  'use strict';
  var WT = root.WinTools = root.WinTools || {};

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Build a single command card element from an entry + its category label. */
  function buildCard(entry, catLabel) {
    var wrap = document.createElement('article');
    wrap.className = 'cmd-card';
    wrap.setAttribute('data-cmd', entry.cmd);
    wrap.setAttribute('data-cat', entry.cat);

    var body = '';
    if (entry.syntax) {
      body += '<div class="cmd-syntax"><span class="lbl">SYNTAX</span><span>' + esc(entry.syntax) + '</span></div>';
    }

    if (entry.opts && entry.opts.length) {
      body += '<div class="cmd-sec-title">Options &amp; flags</div>';
      body += '<table class="opt-table"><tbody>' + entry.opts.map(function (o) {
        return '<tr><td class="flag">' + esc(o[0]) + '</td><td class="mean">' + esc(o[1]) + '</td></tr>';
      }).join('') + '</tbody></table>';
    }

    if (entry.keys && entry.keys.length) {
      body += '<div class="cmd-sec-title">Key controls</div><div class="key-list">' + entry.keys.map(function (k) {
        return '<div class="key-row"><span class="k">' + esc(k[0]) + '</span><span class="v">' + esc(k[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    if (entry.numbers && entry.numbers.length) {
      body += '<div class="cmd-sec-title">Numeric permission bits</div><div class="num-table">' + entry.numbers.map(function (n) {
        return '<div class="num-row"><span class="n">' + esc(n[0]) + '</span><span class="d">' + esc(n[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    if (entry.examples && entry.examples.length) {
      body += '<div class="cmd-sec-title">Examples</div><div class="ex-list">' + entry.examples.map(function (ex) {
        return '<div class="ex-item"><span class="prompt">$</span><span class="ex-text">' + esc(ex) + '</span>' +
          '<button class="icon-btn ex-copy" title="Copy example" aria-label="Copy example" type="button">' +
          '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg></button></div>';
      }).join('') + '</div>';
    }

    var head =
      '<button class="cmd-head" type="button" aria-expanded="false">' +
      '<span class="cmd-name">' + esc(entry.cmd) + '</span>' +
      '<span class="cmd-cat">' + esc(catLabel) + '</span>' +
      '<span class="cmd-desc">' + esc(entry.desc) + '</span>' +
      '<span class="cmd-toggle"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>' +
      '</button>';

    wrap.innerHTML = head + '<div class="cmd-body">' + body + '</div>';
    return wrap;
  }

  /* Public: mount a browser for a dataset.
     cfg: { data, cats, host (list), countEl, searchEl, chipsEl, allLabel } */
  function mountBrowser(cfg) {
    var data = cfg.data || [];
    var cats = cfg.cats || [];
    var host = document.getElementById(cfg.host);
    if (!host) return;

    var catMap = {};
    cats.forEach(function (c) { catMap[c.key] = c.label; });

    /* Count entries per category for the chips. */
    var counts = {};
    data.forEach(function (e) { counts[e.cat] = (counts[e.cat] || 0) + 1; });

    /* Build chips: All + each category. */
    var chipsEl = document.getElementById(cfg.chipsEl);
    if (chipsEl) {
      var chipHtml = '<button class="chip-btn active" type="button" data-cat="*">' +
        esc(cfg.allLabel || 'All') + ' <span class="cnt">' + data.length + '</span></button>';
      cats.forEach(function (c) {
        chipHtml += '<button class="chip-btn" type="button" data-cat="' + esc(c.key) + '">' +
          esc(c.label) + ' <span class="cnt">' + (counts[c.key] || 0) + '</span></button>';
      });
      chipsEl.innerHTML = chipHtml;
    }

    var searchEl = document.getElementById(cfg.searchEl);
    var countEl = document.getElementById(cfg.countEl);
    var activeCat = '*';
    var term = '';

    function matches(entry) {
      if (activeCat !== '*' && entry.cat !== activeCat) return false;
      if (!term) return true;
      var hay = (entry.cmd + ' ' + entry.desc + ' ' + (entry.syntax || '')).toLowerCase();
      if (hay.indexOf(term) !== -1) return true;
      if (entry.opts) {
        for (var i = 0; i < entry.opts.length; i++) {
          if ((entry.opts[i][0] + ' ' + entry.opts[i][1]).toLowerCase().indexOf(term) !== -1) return true;
        }
      }
      if (entry.examples) {
        for (var j = 0; j < entry.examples.length; j++) {
          if (String(entry.examples[j]).toLowerCase().indexOf(term) !== -1) return true;
        }
      }
      return false;
    }

    function render() {
      var list = data.filter(matches);
      host.innerHTML = '';
      if (!list.length) {
        host.innerHTML = '<div class="cmd-empty"><div class="big">🔍</div>' +
          '<h3>No matching commands</h3>' +
          '<p>Try a different keyword, or clear the search and category filters.</p></div>';
      } else {
        var frag = document.createDocumentFragment();
        list.forEach(function (e) { frag.appendChild(buildCard(e, catMap[e.cat] || e.cat)); });
        host.appendChild(frag);
      }
      if (countEl) countEl.innerHTML = 'Showing <strong>' + list.length + '</strong> of ' + data.length + ' commands';
    }

    /* Delegate clicks on the list: expand card + copy buttons. */
    host.addEventListener('click', function (ev) {
      var copyEx = ev.target.closest('.ex-copy');
      if (copyEx) {
        var item = copyEx.closest('.ex-item');
        var text = item.querySelector('.ex-text').textContent;
        WT.ui.copy(text).then(function () {
          item.classList.remove('copied-flash');
          void item.offsetWidth;
          item.classList.add('copied-flash');
        }).catch(function () { WT.ui.toast('Copy failed', 'error'); });
        return;
      }
      var head = ev.target.closest('.cmd-head');
      if (head) {
        var card = head.closest('.cmd-card');
        var open = card.classList.toggle('open');
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    });

    /* Category chips. */
    if (chipsEl) {
      chipsEl.addEventListener('click', function (ev) {
        var chip = ev.target.closest('.chip-btn');
        if (!chip) return;
        chipsEl.querySelectorAll('.chip-btn').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeCat = chip.getAttribute('data-cat');
        render();
      });
    }

    /* Live search. */
    if (searchEl) {
      searchEl.addEventListener('input', function () {
        term = searchEl.value.trim().toLowerCase();
        render();
      });
    }

    render();

    return {
      expandAll: function () {
        host.querySelectorAll('.cmd-card').forEach(function (c) {
          c.classList.add('open');
          var h = c.querySelector('.cmd-head'); if (h) h.setAttribute('aria-expanded', 'true');
        });
      },
      collapseAll: function () {
        host.querySelectorAll('.cmd-card').forEach(function (c) {
          c.classList.remove('open');
          var h = c.querySelector('.cmd-head'); if (h) h.setAttribute('aria-expanded', 'false');
        });
      }
    };
  }

  WT.browser = { mount: mountBrowser, esc: esc };
})(typeof self !== 'undefined' ? self : this);
