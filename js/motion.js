/* Barbería Tava · animaciones (GSAP + Lottie). El contenido se ve igual sin JS. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function safe(fn) { try { fn(); } catch (e) { /* nunca romper la página */ } }

  // Tilde Lottie de "turno confirmado" (se reproduce al verse la tarjeta)
  safe(function () {
    var box = document.querySelector('.lottie-ok');
    if (!box || !window.lottie) return;
    var anim = lottie.loadAnimation({ container: box, renderer: 'svg', loop: false, autoplay: false, path: 'anim/check.json' });
    if (reduce) { anim.addEventListener('DOMLoaded', function () { anim.goToAndStop(44, true); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { anim.goToAndPlay(0, true); io.disconnect(); } });
    }, { threshold: 0.05 });
    io.observe(box);
  });

  if (reduce || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

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
    tl.from('.hero .eyebrow', { y: 16, opacity: 0, duration: .6 })
      .from('.hero h1 .w > span', { yPercent: 110, duration: 1, stagger: .07 }, '-=.3')
      .from('.hero .lead', { y: 20, opacity: 0, duration: .7 }, '-=.6')
      .from('.hero .cta .btn', { y: 18, opacity: 0, duration: .6, stagger: .08 }, '-=.5')
      .from('.hero .stats > div', { y: 18, opacity: 0, duration: .6, stagger: .08 }, '-=.4')
      .from('.turnos', { y: 50, opacity: 0, scale: .96, duration: 1 }, .35)
      .from('.turnos .day, .turnos .slot', { y: 12, opacity: 0, duration: .45, stagger: .03 }, .8);
  });

  // Poste de barbero girando (sutil)
  safe(function () {
    gsap.to('.pole', { backgroundPosition: '0 96px', duration: 2.4, ease: 'none', repeat: -1 });
  });

  // Secciones: títulos y tarjetas entran al hacer scroll
  safe(function () {
    gsap.utils.toArray('section .sec-head, section .info, .final .wrap > *').forEach(function (el) {
      gsap.from(el, { y: 36, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    ScrollTrigger.batch('.svc, .paso', {
      start: 'top 90%',
      onEnter: function (els) { gsap.from(els, { y: 50, opacity: 0, duration: .8, ease: 'power3.out', stagger: .1 }); },
      once: true
    });
    gsap.from('.pin', { y: -60, opacity: 0, duration: 1, ease: 'bounce.out', scrollTrigger: { trigger: '.map', start: 'top 80%' } });
  });
})();
