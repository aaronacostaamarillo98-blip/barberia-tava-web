/* Barbería Tava · animaciones (GSAP + Lottie). El contenido se ve igual sin JS. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function safe(fn) { try { fn(); } catch (e) { /* nunca romper la página */ } }

  // Tilde Lottie de "turno confirmado" (se reproduce al verse la tarjeta)
  safe(function () {
    var box = document.querySelector('.lottie-ok');
    if (!box || !window.lottie) return;
    var anim = window.__okAnim = lottie.loadAnimation({ container: box, renderer: 'svg', loop: false, autoplay: false, path: 'anim/check.json' });
    if (reduce) { anim.addEventListener('DOMLoaded', function () { anim.goToAndStop(44, true); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { anim.goToAndPlay(0, true); io.disconnect(); } });
    }, { threshold: 0.05 });
    io.observe(box);
  });


  // Turnos: elegir día y hora actualiza el botón y el mensaje de WhatsApp
  safe(function () {
    var card = document.querySelector('.turnos'); if (!card) return;
    var btn = card.querySelector('.btn');
    var days = card.querySelectorAll('.day'), slots = card.querySelectorAll('.slot');
    var nombres = {Lun: 'lunes', Mar: 'martes', 'Mié': 'miércoles', Jue: 'jueves', Vie: 'viernes', 'Sáb': 'sábado', Dom: 'domingo'};
    function label(d) { return d.childNodes[0].textContent.trim(); }
    function update() {
      var d = card.querySelector('.day.on'), s = card.querySelector('.slot.pick');
      if (!d || !s) return;
      var dia = nombres[label(d)] || label(d), hora = s.textContent.trim();
      btn.textContent = 'Reservar ' + dia + ' ' + hora;
      btn.href = 'https://wa.me/595000000000?text=' + encodeURIComponent('Hola, quiero turno para el ' + dia + ' a las ' + hora);
      if (window.__okAnim) window.__okAnim.goToAndPlay(0, true);
    }
    function pick(list, el, cls) { list.forEach(function (x) { x.classList.remove(cls); x.removeAttribute('aria-pressed'); }); el.classList.add(cls); el.setAttribute('aria-pressed', 'true'); update(); }
    days.forEach(function (d) { d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0');
      d.addEventListener('click', function () { pick(days, d, 'on'); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(days, d, 'on'); } }); });
    slots.forEach(function (s) { if (s.classList.contains('off')) return; s.setAttribute('role', 'button'); s.setAttribute('tabindex', '0');
      s.addEventListener('click', function () { pick(slots, s, 'pick'); });
      s.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(slots, s, 'pick'); } }); });
    update();
  });

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  // Con "reducir movimiento": solo fundidos suaves, sin desplazamientos ni loops
  var R = reduce ? 0 : 1;

  // Hero: el título entra palabra por palabra
  safe(function () {
    var h1 = document.querySelector('.hero h1');
    h1.querySelectorAll('br').forEach(function (b) { b.replaceWith(' \n '); });
    var html = h1.innerHTML.split(/(<em>.*?<\/em>)/).map(function (part) {
      if (part.indexOf('<em>') === 0) return '<em>' + part.slice(4, -5).split(' ').map(w).join(' ') + '</em>';
      return part.split(' ').map(function (t) { return t === '\n' ? '<br>' : w(t); }).join(' ');
    }).join('');
    function w(t) { return t ? '<span class="w" style="display:inline-block;overflow:hidden;vertical-align:top"><span style="display:inline-block">' + t + '</span></span>' : ''; }
    h1.innerHTML = html;
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero .eyebrow', { y: 16 * R, opacity: 0, duration: .6 })
      .from('.hero h1 .w > span', { yPercent: 110 * R, opacity: reduce ? 0 : 1, duration: 1, stagger: .07 }, '-=.3')
      .from('.hero .lead', { y: 20 * R, opacity: 0, duration: .7 }, '-=.6')
      .from('.hero .cta .btn', { y: 18 * R, opacity: 0, duration: .6, stagger: .08 }, '-=.5')
      .from('.hero .stats > div', { y: 18 * R, opacity: 0, duration: .6, stagger: .08 }, '-=.4')
      .from('.turnos', { y: 50 * R, opacity: 0, scale: reduce ? 1 : .96, duration: 1 }, .35)
      .from('.turnos .day, .turnos .slot', { y: 12 * R, opacity: 0, duration: .45, stagger: .03 }, .8);
  });

  // Poste de barbero girando (sutil)
  safe(function () {
    if (!reduce) gsap.to('.pole', { backgroundPosition: '0 96px', duration: 2.4, ease: 'none', repeat: -1 });
  });

  // Secciones: títulos y tarjetas entran al hacer scroll
  safe(function () {
    gsap.utils.toArray('section .sec-head, section .info, .final .wrap > *').forEach(function (el) {
      gsap.from(el, { y: 36 * R, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    ScrollTrigger.batch('.svc, .paso', {
      start: 'top 90%',
      onEnter: function (els) { gsap.from(els, { y: 50 * R, opacity: 0, duration: .8, ease: 'power3.out', stagger: .1 }); },
      once: true
    });
    gsap.from('.pin', { y: -60, opacity: 0, duration: 1, ease: reduce ? 'none' : 'bounce.out', scrollTrigger: { trigger: '.map', start: 'top 80%' } });
  });
})();
