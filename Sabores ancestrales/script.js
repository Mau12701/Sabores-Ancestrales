/* ═══════════════════════════════════════════════════
   SABORES ANCESTRALES DE HIDALGO — script.js
═══════════════════════════════════════════════════ */

/* ── NAV: scroll + toggle ── */
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── REVEAL on scroll ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ── STATS COUNTER ── */
const statsSection = document.querySelector('.stats');
let counted = false;

function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString('es-MX');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('es-MX');
      }
    }, 16);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    animateCounters();
  }
}, { threshold: 0.4 });

if (statsSection) statsObserver.observe(statsSection);

/* ── PRESUPUESTO: animar barras ── */
const presItems = document.querySelectorAll('.pres-item');
const presObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    presItems.forEach((item, i) => {
      setTimeout(() => item.classList.add('animated'), i * 100);
    });
    presObserver.disconnect();
  }
}, { threshold: 0.3 });

const presSection = document.querySelector('.presupuesto');
if (presSection) presObserver.observe(presSection);

/* ── MAPA: toggle regiones ── */
function toggleRegion(card) {
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.region-card').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}
window.toggleRegion = toggleRegion;

/* ── MODAL: datos de recetas ── */
const modalData = {
  conejo: {
    emoji: '🐇',
    bg: 'linear-gradient(135deg, #5C1A1A, #8B3A3A)',
    title: 'Conejo Enchilado',
    tag: 'Plato Principal · Hidalgo',
    desc: 'Carne de conejo guisada en una salsa profunda de chiles secos, herencia directa de las cocinas prehispánicas del altiplano. Un platillo robusto y lleno de historia.',
    meta: ['⏱ 50 min cocción', '🌶 Intensidad media', '👥 4-6 porciones'],
    ingredientes: [
      '1 kg de carne de conejo en piezas',
      '4 chiles guajillo desvenados y remojados',
      '2 chiles de árbol (al gusto)',
      '3 dientes de ajo',
      '¼ de cebolla blanca',
      '2 jitomates medianos',
      'Comino, orégano seco y sal al gusto',
      'Aceite vegetal para dorar',
    ],
    procedimiento: [
      'Dorar las piezas de conejo en aceite caliente hasta sellar bien por todos lados.',
      'Remojar los chiles en agua caliente por 15 min. Escurrir.',
      'Licuar los chiles con jitomate, ajo, cebolla, comino y orégano hasta obtener una salsa tersa.',
      'Freír la salsa en el mismo aceite del conejo por 5 min, moviendo constantemente.',
      'Agregar las piezas de conejo a la salsa, cubrir con agua o caldo y cocinar a fuego medio 40-50 min hasta que la carne esté suave.',
      'Rectificar sazón y servir con tortillas de maíz y frijoles de olla.',
    ],
  },
  tamales: {
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #1A3D2B, #2D6A4F)',
    title: 'Tamales en Salsa de Xoconostle',
    tag: 'Tradición · Ingrediente endémico',
    desc: 'Masa de maíz nixtamalizado rellena y envuelta en hoja de maíz, bañada en la característica salsa agridulce de xoconostle, fruto emblemático del semidesierto hidalguense.',
    meta: ['⏱ 90 min vapor', '🌵 Ingrediente único', '🌽 Patrimonio UNESCO'],
    ingredientes: [
      '500 g de masa de maíz nixtamalizado',
      '100 g de manteca o aceite vegetal',
      '1 cdita de sal y polvo para hornear',
      '8-10 xoconostles pelados y sin semillas',
      '3 chiles morita o guajillo',
      '2 dientes de ajo',
      'Hojas de maíz secas (remojadas 30 min)',
      'Relleno al gusto: queso, frijoles o pollo',
    ],
    procedimiento: [
      'Batir la manteca hasta esponjar. Incorporar la masa, sal y polvo para hornear. La masa lista flota en agua.',
      'Para la salsa: cocer los xoconostles y los chiles en agua. Licuar con ajo y sal. Freír la salsa 5 min.',
      'Extender una capa de masa sobre la hoja de maíz escurrida, agregar relleno y un poco de salsa.',
      'Doblar y cerrar los tamales. Colocar parados en vaporera sobre agua hirviendo.',
      'Cocinar al vapor 60-75 min. Están listos cuando la masa se despega fácilmente de la hoja.',
      'Servir bañados con más salsa de xoconostle caliente.',
    ],
  },
  atole: {
    emoji: '🌽',
    bg: 'linear-gradient(135deg, #4A3000, #8B6914)',
    title: 'Atole de Maíz',
    tag: 'Bebida Caliente · Ancestral',
    desc: 'Bebida espesa y reconfortante elaborada con masa de maíz, piloncillo y canela. Presente en rituales, festividades y mañanas frías del altiplano desde la época prehispánica.',
    meta: ['⏱ 30 min', '🍯 Dulce-especiado', '🌡 Servir caliente'],
    ingredientes: [
      '200 g de masa de maíz nixtamalizado',
      '1.5 L de agua',
      '150 g de piloncillo rallado o en trozos',
      '1 raja de canela de 5 cm',
      'Pizca de sal',
      'Opcional: 1 taza de leche para enriquecer',
    ],
    procedimiento: [
      'Disolver la masa en 500 ml de agua fría, sin grumos. Colar si es necesario.',
      'En una olla calentar el litro de agua restante con la canela y el piloncillo hasta que se disuelva.',
      'Verter la masa disuelta sobre el agua con piloncillo, moviendo constantemente con paleta de madera.',
      'Cocinar a fuego medio-bajo sin dejar de mover para evitar que se pegue, durante 20-25 min.',
      'El atole está listo cuando napa la cuchara y tiene consistencia cremosa.',
      'Agregar leche al final si se desea más suave. Servir muy caliente en jícaras o tazones de barro.',
    ],
  },
  pitahaya: {
    emoji: '🍹',
    bg: 'linear-gradient(135deg, #4A0A3A, #8B1F7A)',
    title: 'Agua de Pitahaya',
    tag: 'Bebida Fresca · Semidesierto hidalguense',
    desc: 'Agua fresca elaborada con pitahaya madura, fruto del cactus pitayo silvestre. De color magenta intenso, sabor dulce y ligeramente herbal, con propiedades antioxidantes únicas.',
    meta: ['⏱ 15 min', '💜 Color magenta natural', '🧊 Servir frío'],
    ingredientes: [
      '4-5 pitahayas maduras peladas',
      '1.5 L de agua fría o natural',
      '3-4 cdas de azúcar o miel al gusto',
      'Jugo de ½ limón',
      'Hielo al gusto',
      'Opcional: hojas de hierbabuena para decorar',
    ],
    procedimiento: [
      'Pelar las pitahayas y retirar la pulpa con cuchara.',
      'Licuar la pulpa con 500 ml de agua hasta homogeneizar.',
      'Colar la mezcla para retirar semillas si se prefiere más tersa.',
      'Mezclar el licuado con el agua restante, azúcar y jugo de limón. Ajustar dulzor al gusto.',
      'Refrigerar al menos 30 min para que los sabores se integren.',
      'Servir sobre hielo. El color magenta intenso es completamente natural.',
    ],
  },
};

function openModal(id) {
  const d = modalData[id];
  if (!d) return;

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-hero" style="background:${d.bg}">
      <span>${d.emoji}</span>
    </div>
    <h2>${d.title}</h2>
    <span class="modal-tag">${d.tag}</span>
    <div class="modal-meta">${d.meta.map(m => `<span>${m}</span>`).join('')}</div>
    <p>${d.desc}</p>

    <h3 class="modal-section-title">🛒 Ingredientes</h3>
    <ul>${d.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul>

    <h3 class="modal-section-title">👨‍🍳 Preparación</h3>
    <ol>${d.procedimiento.map(p => `<li>${p}</li>`).join('')}</ol>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

window.openModal  = openModal;
window.closeModal = closeModal;

// cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
