(function () {
  var langs = ['en', 'de', 'fr'];
  var titles = {
    en: 'Carthage Drive – Bus & Truck Drivers from Tunisia to Germany',
    de: 'Carthage Drive – Bus- und Lkw-Fahrer aus Tunesien für Deutschland',
    fr: 'Carthage Drive – Chauffeurs de bus et de camion de Tunisie vers l’Allemagne'
  };
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    var s = null; try { s = localStorage.getItem('lang'); } catch (e) {}
    var n = (navigator.language || 'en').slice(0, 2);
    return [q, s, n].find(function (l) { return langs.indexOf(l) > -1; }) || 'en';
  }
  function setLang(l) {
    document.documentElement.lang = l;
    document.title = titles[l];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var t = I18N[l][el.getAttribute('data-i18n')];
      if (t) el.textContent = t;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === l);
    });
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
  });
  menu.addEventListener('click', function () { menu.classList.remove('open'); });
  document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, d = new FormData(f);
    var body = d.get('name') + ' (' + d.get('email') + ')\n\n' + d.get('msg');
    location.href = 'mailto:contact@carthagedrive.com?subject=' +
      encodeURIComponent('[' + d.get('type') + '] Carthage Drive') + '&body=' + encodeURIComponent(body);
  });
  setLang(pick());
})();
