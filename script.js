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
    var h1 = $('.hero-over h1');
    h1.classList.remove('words-on');
    requestAnimationFrame(function () { requestAnimationFrame(function () { h1.classList.add('words-on'); }); });
    words = $$('.sw');
    setCaption(capIdx, true);
    onScroll();
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

  /* ---------- the drive ---------- */
  var J = $('#process'), farEl = $('#far'), midEl = $('#mid'), side = $('#roadside'), dashes = $('#dashes');
  var truck = $('#truck'), bus1 = $('#bus1'), bus2 = $('#bus2'), buses = [bus1, bus2];
  var wheelEl = $('#wheel'), heroOver = $('#heroOver'), scrim = $('#scrim'), cap = $('#caption'), endEl = $('#end'), cue = $('#cue');
  var sun = $('#sun'), glow = $('#glow'), dawn = $('#dawn'), starsEl = $('#stars'), stage = $('#stage');
  var gantries = $$('.gantry'), boards = $$('.board');
  var signP = [0.13, 0.285, 0.44, 0.595, 0.75, 0.905], busStart = [0.2, 0.585];
  farEl.innerHTML = Scene.far(); midEl.innerHTML = Scene.mid();
  $('#truck-art').innerHTML = Scene.truck();
  buses.forEach(function (b) { b.innerHTML = Scene.bus(); });
  wheelEl.innerHTML = Scene.wheel();
  $('#lamps').style.backgroundImage = Scene.lamps();
  var wheelRot = $('#wheel-rot');
  (function () {
    var r = 3, n = 0, st = '';
    var rand = function () { r = (r * 16807) % 2147483647; return r / 2147483647; };
    for (n = 0; n < 70; n++) st += '<i style="left:' + (rand() * 100).toFixed(1) + '%;top:' + (rand() * 100).toFixed(1) + '%;opacity:' + (0.25 + rand() * 0.75).toFixed(2) + '"></i>';
    starsEl.innerHTML = st;
    var sk = '';
    for (n = 0; n < 9; n++) sk += '<i style="--w:' + (80 + rand() * 180).toFixed(0) + 'px;--d:' + (1 + rand() * 1.4).toFixed(2) + 's;--dl:-' + (rand() * 2).toFixed(2) + 's;--b:' + (0.08 + rand() * 1.1).toFixed(2) + '"></i>';
    $('#streaks').innerHTML = sk;
  })();
  var tSpin = $$('.wspin', truck), b1Spin = $$('.wspin', bus1), b2Spin = $$('.wspin', bus2);
  var vw, vh, farW, midW, travel, tw, tl, centerX, busW, jTop = 0;
  function layoutJourney() {
    vw = innerWidth; vh = innerHeight;
    var fh = Math.max(clamp(vh * 0.38, 180, 360), vw * 1.25 * 400 / 3000);
    var mh = Math.max(clamp(vh * 0.24, 120, 240), vw * 1.6 * 300 / 4500);
    farEl.style.height = fh + 'px'; midEl.style.height = mh + 'px';
    farW = farEl.firstElementChild.getBoundingClientRect().width;
    midW = midEl.firstElementChild.getBoundingClientRect().width;
    side.style.width = (vw * 9) + 'px';
    travel = vw * 8;
    tw = truck.offsetWidth; tl = truck.offsetLeft; centerX = tl + tw * 0.58;
    busW = bus1.offsetWidth;
    gantries.forEach(function (g, i) { g.style.left = (centerX + signP[i] * travel - g.offsetWidth / 2) + 'px'; });
  }
  var current_cap = -2, capIdx = -1;
  function setCaption(i, force) {
    if (i === current_cap && !force) return;
    current_cap = i;
    if (i < 0) { cap.classList.remove('show'); return; }
    var d = I18N[current];
    $('#cap-n').textContent = '0' + (i + 1);
    $('#cap-t').textContent = d['p' + (i + 1) + '.t'];
    $('#cap-d').textContent = d['p' + (i + 1) + '.d'];
    cap.classList.remove('show'); void cap.offsetWidth; cap.classList.add('show');
  }
  var drag = 0, dragV = 0, dragging = false, lastA = 0, intro = reduce ? 1 : 0, t0 = null;
  function ang(e) { var r = wheelEl.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
  wheelEl.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || reduce) return;
    dragging = true; lastA = ang(e); wheelEl.setPointerCapture(e.pointerId); wheelEl.classList.add('grab');
  });
  wheelEl.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var a = ang(e), d = a - lastA;
    if (d > 180) d -= 360; if (d < -180) d += 360;
    drag += d; dragV = d; lastA = a;
  });
  ['pointerup', 'pointercancel'].forEach(function (n) { wheelEl.addEventListener(n, function () { dragging = false; wheelEl.classList.remove('grab'); }); });

  var easeOut = function (t) { return 1 - Math.pow(1 - t, 4); };
  var jVisible = true, sv = 0, prevY = scrollY, prevT = 0;
  new IntersectionObserver(function (es) { jVisible = es[0].isIntersecting; }, { rootMargin: '200px' }).observe(J);

  function render(ts) {
    requestAnimationFrame(render);
    if (!jVisible) return;
    if (t0 === null) t0 = ts;
    if (intro < 1) intro = clamp((ts - t0) / 2300);
    var ie = easeOut(intro);
    var r = J.getBoundingClientRect();
    var p = clamp(-r.top / (r.height - vh));
    /* scroll speed -> streaks */
    var dy = Math.abs(scrollY - prevY), dt = Math.max(1, ts - prevT);
    prevY = scrollY; prevT = ts;
    sv += (clamp(dy / dt * 16 / 45) - sv) * 0.18;
    stage.style.setProperty('--sv', sv.toFixed(3));

    /* world */
    farEl.style.transform = 'translate3d(' + (-p * Math.max(0, farW - vw)).toFixed(1) + 'px,0,0)';
    midEl.style.transform = 'translate3d(' + (-p * Math.max(0, midW - vw)).toFixed(1) + 'px,0,0)';
    side.style.transform = 'translate3d(' + (-p * travel).toFixed(1) + 'px,0,0)';
    dashes.style.backgroundPositionX = (-p * travel).toFixed(1) + 'px';
    sun.style.transform = 'translateY(' + (p * 300).toFixed(1) + 'px)';
    sun.style.opacity = (1 - clamp(p / 0.3)).toFixed(3);
    glow.style.opacity = (1 - clamp(p / 0.4)).toFixed(3);
    dawn.style.opacity = clamp((p - 0.78) / 0.2).toFixed(3);
    starsEl.style.opacity = clamp((p - 0.1) / 0.3).toFixed(3);

    /* truck: slides in on load, wheels roll with the road */
    var inOff = -(1 - ie) * (tl + tw + 60);
    var roll = (p * travel - inOff) / (2 * Math.PI * 28 * (tw / 540)) * 360;
    var steer = (38 * Math.sin(p * 21) + 22 * Math.sin(p * 9 + 1)) * (reduce ? 0.4 : 1);
    truck.style.transform = 'translate3d(' + inOff.toFixed(1) + 'px,0,0) rotate(' + (steer * 0.012).toFixed(3) + 'deg)';
    for (var i = 0; i < tSpin.length; i++) tSpin[i].style.transform = 'rotate(' + (roll % 360).toFixed(1) + 'deg)';

    /* oncoming buses */
    buses.forEach(function (b, k) {
      var x = vw * 1.15 - (p - busStart[k]) * vw * 22;
      var on = x > -busW - 40 && x < vw * 1.2;
      b.style.visibility = on ? 'visible' : 'hidden';
      if (!on) return;
      b.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      var deg = (x / (2 * Math.PI * 24 * (busW / 480)) * 360) % 360;
      var sp = k ? b2Spin : b1Spin;
      for (var j = 0; j < sp.length; j++) sp[j].style.transform = 'rotate(' + deg.toFixed(1) + 'deg)';
    });

    /* steering wheel */
    if (!dragging) { dragV = (dragV - 0.05 * drag) * 0.9; drag += dragV; }
    var a = steer + (1 - ie) * -520 + drag + p * 40;
    wheelRot.style.transform = 'rotate(' + a.toFixed(2) + 'deg)';
    wheelRot.style.transformOrigin = '200px 200px';

    /* story */
    var heroO = 1 - clamp(p / 0.08);
    heroOver.style.opacity = heroO.toFixed(3);
    heroOver.style.transform = 'translateY(' + (-p * 260).toFixed(1) + 'px)';
    heroOver.classList.toggle('hide', heroO < 0.02);
    scrim.style.opacity = heroO.toFixed(3);
    cue.style.opacity = (1 - clamp(p / 0.04)).toFixed(3);
    var idx = -1;
    for (var s = 0; s < 6; s++) if (p >= signP[s] - 0.055) idx = s;
    if (p >= 0.94) idx = -1;
    capIdx = idx;
    setCaption(idx);
    endEl.classList.toggle('show', p >= 0.94);
    boards.forEach(function (bd, k) { bd.classList.toggle('on', p >= signP[k] - 0.02); });
  }
  layoutJourney();
  requestAnimationFrame(render);
  $$('a[href="#process"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault(); closeMenu();
      scrollTo({ top: scrollY + J.getBoundingClientRect().top + 0.11 * (J.offsetHeight - vh), behavior: 'smooth' });
    });
  });

  /* ---------- scroll loop ---------- */
  var words = [], statement = $('#statement'), bar = $('#progress');
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

    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', function () { layoutJourney(); onScroll(); });

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
  document.fonts && document.fonts.ready.then(function () { layoutJourney(); onScroll(); });
})();
