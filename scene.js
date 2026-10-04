/* Procedural artwork for the Tunisia -> Germany drive. Plain SVG strings, no dependencies. */
var Scene = (function () {
  var Y = '#FFC629';
  function rng(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function f(n) { return +n.toFixed(1); }
  function win(x, y, w, h, o) {
    return '<path d="M' + f(x) + ' ' + f(y + h) + 'V' + f(y + w / 2) + 'A' + w / 2 + ' ' + w / 2 + ' 0 0 1 ' + f(x + w) + ' ' + f(y + w / 2) + 'V' + f(y + h) + 'Z" fill="' + Y + '" opacity="' + o + '"/>';
  }
  function palm(x, y, h, col, sw) {
    var tx = x + h * .12, ty = y - h;
    var s = '<path d="M' + x + ' ' + y + 'Q' + f(x + h * .02) + ' ' + f(y - h * .55) + ' ' + f(tx) + ' ' + f(ty) + '" stroke="' + col + '" stroke-width="' + sw + '" fill="none" stroke-linecap="round"/>';
    [-170, -140, -110, -70, -40, -10].forEach(function (a) {
      var r = a * Math.PI / 180, L = h * .5;
      var ex = tx + Math.cos(r) * L, ey = ty + Math.sin(r) * L * .55 + L * .38;
      var cx = tx + Math.cos(r) * L * .55, cy = ty + Math.sin(r) * L * .7 - L * .1;
      s += '<path d="M' + f(tx) + ' ' + f(ty) + 'Q' + f(cx) + ' ' + f(cy) + ' ' + f(ex) + ' ' + f(ey) + '" stroke="' + col + '" stroke-width="' + f(sw * .75) + '" fill="none" stroke-linecap="round"/>';
    });
    return s;
  }
  function pine(x, base, h, col) {
    var w = h * .28;
    return '<path fill="' + col + '" d="M' + f(x) + ' ' + f(base - h) + 'L' + f(x + w * .5) + ' ' + f(base - h * .62) + 'L' + f(x + w * .3) + ' ' + f(base - h * .62) + 'L' + f(x + w * .65) + ' ' + f(base - h * .3) + 'L' + f(x + w * .4) + ' ' + f(base - h * .3) + 'L' + f(x + w * .8) + ' ' + f(base) + 'L' + f(x - w * .8) + ' ' + f(base) + 'L' + f(x - w * .4) + ' ' + f(base - h * .3) + 'L' + f(x - w * .65) + ' ' + f(base - h * .3) + 'L' + f(x - w * .3) + ' ' + f(base - h * .62) + 'L' + f(x - w * .5) + ' ' + f(base - h * .62) + 'Z"/>';
  }
  function turbine(x, h, dur, c) {
    var base = 346, hy = base - h, s = '<path fill="' + c + '" d="M' + (x - 4) + ' ' + base + 'L' + (x - 2) + ' ' + hy + 'H' + (x + 2) + 'L' + (x + 4) + ' ' + base + 'Z"/>';
    s += '<g class="blades" style="transform-origin:' + x + 'px ' + hy + 'px;animation-duration:' + dur + 's">';
    [0, 120, 240].forEach(function (a) {
      s += '<path fill="' + c + '" transform="rotate(' + a + ' ' + x + ' ' + hy + ')" d="M' + (x - 2.4) + ' ' + hy + 'L' + (x + 2.4) + ' ' + hy + 'L' + x + ' ' + (hy - h * .5) + 'Z"/>';
    });
    return s + '</g><circle cx="' + x + '" cy="' + hy + '" r="4" fill="' + c + '"/>';
  }

  function far() {
    var r = rng(11), c = '#1B2938', c2 = '#243649', s = '<svg viewBox="0 0 3000 400" xmlns="http://www.w3.org/2000/svg">';
    s += '<path fill="' + c + '" d="M0 400V318C140 292 260 300 380 322S640 306 780 318S1000 336 1120 346H1700C1800 330 1900 306 2040 316S2300 330 2420 312S2800 300 3000 322V400Z"/>';
    /* Tunisia: Sidi Bou Said */
    [[70, 100, 120], [165, 80, 160], [240, 120, 105], [350, 95, 200], [440, 115, 140], [550, 80, 115], [625, 90, 170]].forEach(function (h) {
      s += '<rect x="' + h[0] + '" y="' + (400 - h[2]) + '" width="' + h[1] + '" height="' + h[2] + '" fill="' + c2 + '"/>';
      var n = 2 + Math.floor(r() * 3);
      for (var k = 0; k < n; k++) s += win(h[0] + 10 + r() * (h[1] - 30), 400 - h[2] + 16 + r() * (h[2] - 90), 9, 15, r() < .7 ? .85 : .25);
    });
    s += '<path fill="' + c2 + '" d="M357 200A40.5 40.5 0 0 1 438 200Z"/><path stroke="' + c2 + '" stroke-width="3" d="M397 160V142"/>';
    s += '<rect x="712" y="100" width="24" height="300" fill="' + c2 + '"/><rect x="706" y="128" width="36" height="7" fill="' + c2 + '"/><path fill="' + c2 + '" d="M712 100A12 12 0 0 1 736 100Z"/><path stroke="' + c2 + '" stroke-width="2" d="M724 88V70"/>' + win(720, 150, 8, 14, .9) + win(720, 190, 8, 14, .6);
    /* Carthage columns */
    s += '<rect x="815" y="334" width="215" height="10" fill="' + c2 + '"/>';
    [110, 110, 92, 110, 64, 110].forEach(function (h, i) {
      var x = 832 + i * 34;
      s += '<rect x="' + x + '" y="' + (334 - h) + '" width="14" height="' + h + '" fill="' + c2 + '"/><rect x="' + (x - 4) + '" y="' + (334 - h - 7) + '" width="22" height="7" fill="' + c2 + '"/>';
    });
    s += '<rect x="828" y="205" width="116" height="16" fill="' + c2 + '"/>';
    s += palm(1060, 338, 120, c2, 7) + palm(1125, 342, 88, c2, 6);
    /* the crossing: ferry + lighthouse */
    s += '<path fill="' + c2 + '" d="M1250 346L1262 328H1396L1412 346Z"/><rect x="1290" y="304" width="70" height="24" fill="' + c2 + '"/><rect x="1330" y="290" width="16" height="14" fill="' + c2 + '"/>' + win(1298, 310, 7, 10, .9) + win(1316, 310, 7, 10, .9) + win(1334, 310, 7, 10, .5) + win(1352, 310, 7, 10, .9);
    s += '<path fill="' + c2 + '" d="M1510 346L1516 270H1532L1538 346Z"/><rect x="1512" y="258" width="30" height="12" fill="' + c2 + '"/><circle cx="1527" cy="250" r="22" fill="' + Y + '" opacity=".16"/><circle cx="1527" cy="250" r="6" fill="' + Y + '"/>';
    /* Germany: wind turbines, Cologne cathedral, Brandenburg gate */
    s += turbine(1790, 200, 9, c2) + turbine(1900, 232, 7.5, c2) + turbine(2025, 188, 10, c2);
    s += '<rect x="2180" y="268" width="224" height="132" fill="' + c2 + '"/>';
    [2196, 2342].forEach(function (x) {
      s += '<rect x="' + x + '" y="150" width="46" height="250" fill="' + c2 + '"/><path fill="' + c2 + '" d="M' + (x - 3) + ' 150L' + (x + 23) + ' 10L' + (x + 49) + ' 150Z"/>';
      [[x - 5, 150], [x + 43, 150]].forEach(function (q) { s += '<path fill="' + c2 + '" d="M' + q[0] + ' ' + q[1] + 'L' + (q[0] + 4) + ' ' + (q[1] - 42) + 'L' + (q[0] + 8) + ' ' + q[1] + 'Z"/>'; });
      for (var k = 0; k < 4; k++) s += win(x + 14, 190 + k * 42, 6, 22, .8) + win(x + 28, 190 + k * 42, 6, 22, .5);
    });
    s += '<path fill="' + c2 + '" d="M2288 268L2296 190L2304 268Z"/>';
    for (var k = 0; k < 5; k++) s += win(2258 + k * 18, 316, 7, 26, .55 + (k % 2) * .3);
    s += '<rect x="2530" y="338" width="300" height="10" fill="' + c2 + '"/>';
    for (var i = 0; i < 6; i++) {
      var cx = 2548 + i * 50;
      s += '<rect x="' + cx + '" y="218" width="26" height="120" fill="' + c2 + '"/>';
      if (i < 5) s += '<rect x="' + (cx + 28) + '" y="232" width="20" height="104" fill="' + Y + '" opacity=".22"/>';
    }
    s += '<rect x="2534" y="194" width="292" height="24" fill="' + c2 + '"/><rect x="2560" y="172" width="240" height="22" fill="' + c2 + '"/><rect x="2646" y="162" width="68" height="10" fill="' + c2 + '"/>';
    s += '<rect x="2664" y="146" width="32" height="16" rx="3" fill="' + c2 + '"/><circle cx="2672" cy="162" r="6" fill="' + c2 + '"/>';
    for (var h = 0; h < 4; h++) s += '<rect x="' + (2700 + h * 9) + '" y="134" width="7" height="28" rx="3" fill="' + c2 + '"/><circle cx="' + (2703.5 + h * 9) + '" cy="132" r="4.5" fill="' + c2 + '"/>';
    s += '<rect x="2681" y="116" width="6" height="30" rx="3" fill="' + c2 + '"/><circle cx="2684" cy="112" r="4.5" fill="' + c2 + '"/><path fill="' + c2 + '" d="M2684 122L2654 100L2690 128Z"/><path stroke="' + c2 + '" stroke-width="2" d="M2700 150V96"/>';
    for (var p = 0; p < 16; p++) { var px = p < 8 ? 1700 + r() * 380 : 2460 + r() * 70; s += pine(px, 346, 36 + r() * 36, c2); }
    for (var q = 0; q < 8; q++) s += pine(2850 + r() * 140, 340, 40 + r() * 34, c2);
    return s + '</svg>';
  }

  function wave(x0, x1, y) {
    var d = 'M' + x0 + ' ' + y;
    for (var x = x0; x < x1; x += 60) d += 'q15 -5 30 0t30 0';
    return '<path d="' + d + '" fill="none" stroke="#243749" stroke-width="1.6" opacity=".7"/>';
  }
  function mid() {
    var r = rng(5), c = '#101A25', s = '<svg viewBox="0 0 4500 300" xmlns="http://www.w3.org/2000/svg">';
    s += '<path fill="' + c + '" d="M0 300V235C150 210 300 225 450 240S760 215 900 235S1150 250 1300 262H3050C3150 250 3300 235 3480 242S3800 215 4000 230S4350 238 4500 225V300Z"/>';
    [[500, 56, 34], [566, 44, 46], [616, 62, 30], [690, 48, 40]].forEach(function (h) {
      s += '<rect x="' + h[0] + '" y="' + (230 - h[2]) + '" width="' + h[1] + '" height="' + (h[2] + 8) + '" fill="#16222F"/>' + win(h[0] + 10, 230 - h[2] + 8, 7, 11, .8);
    });
    s += palm(110, 246, 84, c, 6) + palm(330, 240, 104, c, 7) + palm(820, 232, 92, c, 6) + palm(1190, 258, 70, c, 5) + palm(1250, 262, 52, c, 4);
    for (var i = 0; i < 6; i++) s += wave(1320, 3040, 272 + i * 5.2);
    s += '<path fill="' + c + '" d="M2000 238H2270L2240 262H2030Z"/>';
    for (var k = 0; k < 8; k++) s += '<rect x="' + (2040 + k * 21) + '" y="' + (k % 3 === 0 ? 206 : 218) + '" width="19" height="' + (k % 3 === 0 ? 32 : 20) + '" fill="' + (k % 2 ? '#16222F' : '#1A2837') + '"/>';
    s += '<rect x="2216" y="198" width="42" height="40" fill="' + c + '"/><rect x="2224" y="180" width="22" height="18" fill="' + c + '"/>' + win(2222, 206, 6, 9, .9) + win(2234, 206, 6, 9, .9) + win(2246, 206, 6, 9, .6);
    s += '<path stroke="' + Y + '" stroke-width="2" opacity=".22" d="M2830 276h60M2810 284h100M2840 292h50"/>';
    /* Germany: village with church + forest */
    for (var h = 0; h < 7; h++) {
      var hx = 3600 + h * 52 + r() * 10, hh = 28 + r() * 16;
      s += '<path fill="#16222F" d="M' + hx + ' 236V' + (236 - hh) + 'L' + (hx + 20) + ' ' + (236 - hh - 16) + 'L' + (hx + 40) + ' ' + (236 - hh) + 'V236Z"/>' + win(hx + 14, 236 - hh + 6, 7, 10, r() < .7 ? .85 : .3);
    }
    s += '<rect x="3560" y="168" width="22" height="70" fill="#16222F"/><path fill="#16222F" d="M3556 168L3571 106L3586 168Z"/><path stroke="#16222F" stroke-width="2" d="M3571 106V92"/>' + win(3566, 186, 8, 16, .8);
    for (var p = 0; p < 70; p++) s += pine(3060 + r() * 1440, 262 - r() * 20, 44 + r() * 52, p % 3 ? '#0E1721' : '#121D29');
    return s + '</svg>';
  }

  function wheelG(x, y, r) {
    var s = '<g transform="translate(' + x + ' ' + y + ')"><circle r="' + (r + 6) + '" fill="#05080B"/><g class="wspin"><circle r="' + r + '" fill="#0B1118" stroke="#27333F" stroke-width="2"/><circle r="' + (r * .56) + '" fill="#B9C5D1"/><circle r="' + (r * .42) + '" fill="#8E9CAB"/>';
    for (var i = 0; i < 6; i++) { var a = i * 60 * Math.PI / 180; s += '<circle cx="' + f(Math.cos(a) * r * .3) + '" cy="' + f(Math.sin(a) * r * .3) + '" r="' + f(r * .075) + '" fill="#0B1118"/>'; }
    return s + '<circle r="' + f(r * .12) + '" fill="#0B1118"/></g></g>';
  }
  function truck() {
    var s = '<svg viewBox="0 0 540 200" xmlns="http://www.w3.org/2000/svg">';
    s += '<rect x="14" y="134" width="496" height="12" fill="#0B1118"/>';
    s += '<rect x="14" y="22" width="330" height="112" rx="8" fill="#E8EDF2"/><rect x="14" y="120" width="330" height="14" fill="#C6CFD8"/><rect x="14" y="100" width="330" height="9" fill="' + Y + '"/>';
    for (var i = 1; i < 6; i++) s += '<path d="M' + (14 + i * 55) + ' 26V96" stroke="#D3DAE1" stroke-width="2"/>';
    s += '<text x="179" y="68" text-anchor="middle" font-family="Geist,system-ui,sans-serif" font-weight="700" font-size="35" letter-spacing="-1.4" fill="#0A0E13">CARTHAGE DRIVE</text>';
    s += '<text x="179" y="88" text-anchor="middle" font-family="Geist Mono,monospace" font-weight="500" font-size="12" letter-spacing="2.4" fill="#4D5A69">TUNIS → DEUTSCHLAND</text>';
    s += '<rect x="10" y="40" width="5" height="12" rx="2" fill="#D9381E"/><rect x="10" y="96" width="5" height="12" rx="2" fill="#D9381E"/>';
    s += '<rect x="337" y="14" width="9" height="120" rx="3" fill="#5C6B7A"/><rect x="334" y="10" width="15" height="7" rx="2" fill="#3C4957"/>';
    s += '<rect x="328" y="128" width="46" height="8" fill="#0B1118"/>';
    s += '<path fill="' + Y + '" d="M352 134V58Q352 40 370 40H436Q452 40 460 54L500 108Q510 120 510 132V134Z"/>';
    s += '<path fill="#E2AA17" d="M370 40L372 22Q372 16 380 16H430Q440 16 442 24L444 40Z"/>';
    s += '<path fill="#14263A" d="M372 56H434Q444 56 450 66L476 108H372Z"/><path fill="#fff" opacity=".12" d="M372 56H392L420 108H372Z"/>';
    s += '<path d="M396 112V60M372 128H506" stroke="#C99700" stroke-width="2" fill="none"/><rect x="380" y="116" width="14" height="4" rx="2" fill="#B38400"/>';
    s += '<rect x="356" y="62" width="7" height="26" rx="2" fill="#0B1118"/><rect x="496" y="108" width="14" height="26" rx="3" fill="#0B1118"/><rect x="500" y="98" width="10" height="10" rx="3" fill="#FFF3C7"/>';
    s += wheelG(80, 152, 28) + wheelG(136, 152, 28) + wheelG(340, 152, 28) + wheelG(396, 152, 28) + wheelG(474, 152, 28);
    return s + '</svg>';
  }
  function bus() {
    var s = '<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="bb"><rect x="8" y="20" width="464" height="106" rx="16"/></clipPath></defs>';
    s += '<rect x="8" y="20" width="464" height="106" rx="16" fill="#F1F4F7"/><g clip-path="url(#bb)"><rect x="8" y="98" width="464" height="14" fill="' + Y + '"/><path fill="#14263A" d="M8 36Q8 28 22 28H74V92H8Z"/><path fill="#fff" opacity=".12" d="M8 28H40L22 92H8Z"/><rect x="84" y="34" width="38" height="78" fill="#14263A"/><path d="M103 34V112" stroke="#2C4A68" stroke-width="2"/></g>';
    for (var i = 0; i < 6; i++) s += '<rect x="' + (136 + i * 55) + '" y="36" width="46" height="42" rx="7" fill="#14263A"/>' + (i % 2 ? '<rect x="' + (140 + i * 55) + '" y="40" width="38" height="34" rx="5" fill="' + Y + '" opacity=".28"/>' : '');
    s += '<rect x="14" y="22" width="62" height="12" rx="2" fill="#0B1118"/><text x="45" y="31.4" text-anchor="middle" font-family="Geist Mono,monospace" font-size="7.4" font-weight="500" fill="' + Y + '">DEUTSCHLAND</text>';
    s += '<text x="300" y="109" text-anchor="middle" font-family="Geist,system-ui,sans-serif" font-weight="700" font-size="10.5" letter-spacing=".4" fill="#0A0E13">CARTHAGE DRIVE</text>';
    s += '<rect x="240" y="10" width="96" height="11" rx="4" fill="#CBD3DB"/><rect x="8" y="104" width="8" height="9" rx="2" fill="#FFF3C7"/><rect x="466" y="50" width="6" height="12" rx="2" fill="#D9381E"/><rect x="466" y="98" width="6" height="12" rx="2" fill="#D9381E"/>';
    s += wheelG(100, 134, 24) + wheelG(384, 134, 24);
    return s + '</svg>';
  }
  function wheel() {
    var s = '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><g id="wheel-rot">';
    s += '<circle cx="200" cy="200" r="160" fill="none" stroke="#0A1016" stroke-width="46"/><circle cx="200" cy="200" r="160" fill="none" stroke="#1B2733" stroke-width="40"/>';
    s += '<circle cx="200" cy="200" r="146" fill="none" stroke="#3A4C5F" stroke-width="1.6" stroke-dasharray="3 7" opacity=".9"/><circle cx="200" cy="200" r="174" fill="none" stroke="#2D3D4E" stroke-width="1.4"/>';
    s += '<path fill="#16212B" d="M44 186H150Q166 186 166 200Q166 214 150 214H44Z"/><path fill="#16212B" d="M356 186H250Q234 186 234 200Q234 214 250 214H356Z"/><path fill="#16212B" d="M186 356V250Q186 234 200 234Q214 234 214 250V356Z"/>';
    s += '<rect x="82" y="192" width="26" height="16" rx="5" fill="#0B1118"/><circle cx="95" cy="200" r="3.5" fill="' + Y + '"/><rect x="292" y="192" width="26" height="16" rx="5" fill="#0B1118"/><circle cx="305" cy="200" r="3.5" fill="' + Y + '"/>';
    s += '<circle cx="200" cy="200" r="62" fill="#0E151C" stroke="#26343F" stroke-width="4"/><g transform="translate(200 200) scale(1.7) translate(-20 -20)"><path d="M31 10.5A15 15 0 1 0 31 29.5" fill="none" stroke="' + Y + '" stroke-width="6" stroke-linecap="round"/><path d="M31 10.5A15 15 0 1 0 31 29.5" fill="none" stroke="#0E151C" stroke-width="1.5" stroke-dasharray="2.4 3.2"/></g>';
    s += '<rect x="191" y="28" width="18" height="30" rx="4" fill="' + Y + '"/></g>';
    s += '<path d="M60 140A160 160 0 0 1 150 56" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="10" stroke-linecap="round"/></svg>';
    return s;
  }
  function lamps() {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="560" height="240" viewBox="0 0 560 240"><defs><radialGradient id="g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="' + Y + '" stop-opacity=".42"/><stop offset="1" stop-color="' + Y + '" stop-opacity="0"/></radialGradient></defs><circle cx="190" cy="58" r="78" fill="url(#g)"/><path d="M178 60L202 60L262 240L118 240Z" fill="' + Y + '" opacity=".05"/><rect x="100" y="60" width="6" height="180" fill="#1B2735"/><path d="M103 66Q140 44 190 52" stroke="#1B2735" stroke-width="5" fill="none"/><rect x="176" y="48" width="30" height="9" rx="3" fill="#2A3A4C"/><rect x="180" y="55" width="22" height="3" rx="1.5" fill="#FFF3C7"/></svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(s) + '")';
  }
  return { far: far, mid: mid, truck: truck, bus: bus, wheel: wheel, lamps: lamps };
})();
