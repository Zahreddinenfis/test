(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, v)); };

  /* ---------- language ---------- */
  var langs = ['en', 'de', 'fr'];
  var titles = {
    en: 'Carthage Drive – Bus & Truck Drivers from Tunisia to Germany',
    de: 'Carthage Drive – Bus- und Lkw-Fahrer aus Tunesien für Deutschland',
    fr: 'Carthage Drive – Chauffeurs de bus et de camion de Tunisie vers l’Allemagne'
  };
  var current;
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    var s = null; try { s = localStorage.getItem('lang'); } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2);
    return [q, s, n].filter(function (l) { return langs.indexOf(l) > -1; })[0] || 'en';
  }
  function buildWords(el, text, mode) {
    el.textContent = '';
    var em = false;
    text.split(' ').forEach(function (raw, i) {
      var open = raw.charAt(0) === '{', close = raw.slice(-1) === '}';
      var w = raw.replace(/[{}]/g, '');
      if (open) em = true;
      var inner = document.createElement('span');
      inner.textContent = w;
      if (mode === 'mask') {
        var outer = document.createElement('span');
        outer.className = 'w';
        inner.className = 'wi' + (em ? ' em' : '');
        inner.style.setProperty('--i', i);
        outer.appendChild(inner);
        el.appendChild(outer);
      } else {
        inner.className = 'sw';
        el.appendChild(inner);
      }
      el.appendChild(document.createTextNode(' '));
      if (close) em = false;
    });
  }
  function apply(l) {
    current = l;
    root.lang = l;
    document.title = titles[l];
    $$('[data-i18n]').forEach(function (el) {
      var t = I18N[l][el.getAttribute('data-i18n')];
      if (!t) return;
      var m = el.getAttribute('data-split');
      if (m) buildWords(el, t, m); else el.textContent = t;
    });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === l); });
    try { localStorage.setItem('lang', l); } catch (e) {}
    var h1 = $('.hero h1');
    h1.classList.remove('words-on');
    requestAnimationFrame(function () { requestAnimationFrame(function () { h1.classList.add('words-on'); }); });
    words = $$('.sw');
    layoutRail(); layoutRoute(); onScroll();
  }
  function setLang(l) {
    if (l === current) return;
    var main = $('main');
    if (reduce || !main.animate) { apply(l); return; }
    var out = main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 110, easing: 'ease-out', fill: 'forwards' });
    out.onfinish = function () {
      apply(l);
      var inn = main.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.23,1,.32,1)' });
      inn.onfinish = function () { out.cancel(); };
    };
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* ---------- menu ---------- */
  var burger = $('#burger'), menu = $('#menu'), header = $('#header');
  function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
    header.classList.add('solid');
  });
  menu.addEventListener('click', closeMenu);
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- reveal on view ---------- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  var ioEdge = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ioEdge.unobserve(e.target); } });
  }, { threshold: 0 });
  $$('[data-reveal]').forEach(function (el) { (el.dataset.reveal === 'clip' ? ioEdge : io).observe(el); });

  /* ---------- hero route ---------- */
  var prog = $('#route-prog'), truck = $('#truck'), art = $('.hero-art');
  var L = prog.getTotalLength();
  var chips = $$('.chip'), pins = $$('.pin');
  prog.style.strokeDasharray = L;
  function pt(t) { return prog.getPointAtLength(L * t); }
  function layoutRoute() {
    chips.concat(pins).forEach(function (el) {
      var p = pt(parseFloat(el.dataset.t));
      el.style.left = (p.x / 600 * 100) + '%';
      el.style.top = (p.y / 560 * 100) + '%';
    });
  }
  function setT(t) {
    prog.style.strokeDashoffset = L * (1 - t);
    var p = pt(t);
    truck.setAttribute('transform', 'translate(' + p.x + ' ' + p.y + ')');
    chips.forEach(function (c) { c.classList.toggle('on', t >= parseFloat(c.dataset.t) - 0.001); });
  }
  var heroVisible = true, t0 = null, DRIVE = 4600, HOLD = 2400, FADE = 600;
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  function frame(ts) {
    if (!heroVisible || document.hidden) { t0 = null; return requestAnimationFrame(frame); }
    if (t0 === null) t0 = ts;
    var e = (ts - t0) % (DRIVE + HOLD + FADE), t;
    if (e < DRIVE) { t = ease(e / DRIVE); prog.style.opacity = 1; }
    else if (e < DRIVE + HOLD) { t = 1; prog.style.opacity = 1; }
    else { t = 1; prog.style.opacity = 1 - (e - DRIVE - HOLD) / FADE; }
    setT(t);
    requestAnimationFrame(frame);
  }
  new IntersectionObserver(function (es) { heroVisible = es[0].isIntersecting; }).observe(art);
  layoutRoute();
  if (reduce) setT(1); else { setT(0); requestAnimationFrame(frame); }

  /* ---------- process rail ---------- */
  var steps = $$('#steps li'), rail = $('#rail'), fill = $('#rail-fill'), now = $('#step-now');
  function layoutRail() {
    var h = steps[steps.length - 1].offsetTop - steps[0].offsetTop;
    rail.style.height = h + 'px';
  }

  /* ---------- scroll loop ---------- */
  var words = [], statement = $('#statement'), bar = $('#progress'), ol = $('#steps');
  var lastY = 0, ticking = false;
  function onScroll() {
    var y = scrollY, vh = innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    header.classList.toggle('solid', y > 40 || menu.classList.contains('open'));
    header.classList.toggle('hide', y > 160 && y > lastY + 4 && !menu.classList.contains('open'));
    if (y < lastY - 4 || y < 160) header.classList.remove('hide');
    lastY = y;

    if (words.length) {
      var r = statement.getBoundingClientRect();
      var p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.35));
      var n = words.length;
      for (var i = 0; i < n; i++) {
        var o = reduce ? 1 : 0.16 + 0.84 * clamp(p * (n + 3) - i, 0, 1);
        words[i].style.opacity = o.toFixed(3);
      }
    }

    var or = ol.getBoundingClientRect(), mark = vh * 0.55;
    var h = rail.offsetHeight || 1, top0 = steps[0].getBoundingClientRect().top + 26;
    var sp = clamp((mark - top0) / h);
    fill.style.transform = 'scaleY(' + sp + ')';
    var active = 0;
    steps.forEach(function (li, i) {
      var on = li.getBoundingClientRect().top + 26 <= mark;
      li.classList.toggle('on', on);
      if (on) active = i;
    });
    now.textContent = '0' + (active + 1);
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', function () { layoutRail(); layoutRoute(); onScroll(); });

  /* ---------- pointer polish ---------- */
  if (fine && !reduce) {
    $$('.tile').forEach(function (t) {
      t.addEventListener('pointermove', function (e) {
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        t.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    $$('.magnetic').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.18, dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        b.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- faq ---------- */
  $$('.faq-item button').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.closest('.faq-item'), open = !item.classList.contains('open');
      $$('.faq-item.open').forEach(function (o) { if (o !== item) { o.classList.remove('open'); $('button', o).setAttribute('aria-expanded', 'false'); } });
      item.classList.toggle('open', open);
      b.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- form ---------- */
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(e.target);
    var body = d.get('name') + ' (' + d.get('email') + ')\n\n' + d.get('msg');
    location.href = 'mailto:contact@carthagedrive.com?subject=' +
      encodeURIComponent('[' + d.get('type') + '] Carthage Drive') + '&body=' + encodeURIComponent(body);
  });

  $('#year').textContent = new Date().getFullYear();
  apply(pick());
  document.fonts && document.fonts.ready.then(function () { layoutRail(); onScroll(); });
})();
