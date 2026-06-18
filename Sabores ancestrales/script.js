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
      '1 kg de conejo troceado',
      '8 chiles guajillo',
      '2 chiles de árbol',
      '1 cebolla',
      '3 dientes de ajo',
      '2 tomates',
      'Comino, orégano, sal y pimienta al gusto',
      'Aceite vegetal',
      'Agua o caldo de pollo',
      'Cilantro y limón para acompañar',
    ],
    procedimiento: [
      'Remojar los chiles en agua caliente, luego licuarlos con cebolla, ajo, tomate y un poco de agua.',
      'Colar la mezcla para obtener una salsa suave, sazonar con comino, orégano, sal y pimienta.',
      'Dorar el conejo troceado en aceite caliente hasta que esté dorado por todos lados, retirarlo y reservar.',
      'En la misma sartén, calentar la salsa hasta que hierva, luego regresar el conejo a la sartén.',
      'Agregar caldo suficiente para cubrir los trozos, cocinar a fuego lento durante 40-50 min hasta que el conejo esté tierno.',
      'Servir en plato hondo cubierto de salsa roja, acompañado de arroz blanco, frijoles refritos y tortillas de maíz calientes. Decorar con cilantro fresco y rodaja de limón.',
    ],
  },
  tamales: {
    emoji: '🌿',
    bg: 'linear-gradient(135deg, #1A3D2B, #2D6A4F)',
    title: 'Tamales en Salsa de Xoconostle',
    tag: 'Tradición · Ingrediente endémico',
    desc: 'Masa de maíz nixtamalizado rellena y envuelta en hoja de maíz, bañada en la característica salsa agridulce de xoconostle, fruto emblemático del semidesierto hidalguense.',
    meta: ['⏱ 45-60 min vapor', '🌵 Ingrediente único', '🌽 Patrimonio UNESCO'],
    ingredientes: [
      'Masa para tamales (hecha con maíz nixtamalizado, manteca de cerdo o aceite, sal)',
      '400 g de xoconostles maduros',
      '6 chiles guajillo',
      '2 dientes de ajo',
      '1 cdita de comino',
      'Relleno opcional: pollo desmenuzado o queso fresco',
      'Hojas de maíz o plátano para envolver',
    ],
    procedimiento: [
      'Remojar los chiles guajillo en agua caliente, desvenarlos y despepitarlos.',
      'Limpiar los xoconostles, extraer la pulpa y licuarla con los chiles, ajo y comino.',
      'Colar la mezcla, sazonar con sal y cocinar a fuego medio por 10 min hasta que espese.',
      'Extender la masa sobre las hojas, agregar un poco de salsa y el relleno, envolver los tamales.',
      'Cocinar en una vaporera durante 45-60 min hasta que la masa se despegue de la hoja.',
      'Servir en un plato de barro o madera, desenvueltos o con la punta de la hoja abierta para mostrar el color rojizo de la salsa.',
    ],
  },
  atole: {
    emoji: '🌽',
    bg: 'linear-gradient(135deg, #4A3000, #8B6914)',
    title: 'Atole de Maíz',
    tag: 'Bebida Caliente · Ancestral',
    desc: 'Bebida espesa y reconfortante elaborada con masa de maíz, piloncillo y canela. Presente en rituales, festividades y mañanas frías del altiplano desde la época prehispánica.',
    meta: ['⏱ 15-20 min', '🍯 Dulce-especiado', '🌡 Servir caliente'],
    ingredientes: [
      'Masa de maíz nixtamalizado',
      '1.5 L de agua o leche',
      'Azúcar o piloncillo al gusto',
      'Canela en rama o en polvo (opcional)',
      'Sal (pizca)',
    ],
    procedimiento: [
      'En una cacerola, calentar el agua o leche con una pizca de sal.',
      'Agregar la masa poco a poco, revolviendo constantemente para evitar grumos.',
      'Cocinar a fuego medio-bajo durante 15-20 min, revolviendo continuamente hasta que espese.',
      'Añadir azúcar o piloncillo y canela, mezclar bien y dejar hervir por 2 min más.',
      'Servir caliente en tazas de barro, espolvoreando con canela en polvo. Se puede acompañar con pan.',
    ],
  },
  pitahaya: {
    emoji: '🍹',
    bg: 'linear-gradient(135deg, #4A0A3A, #8B1F7A)',
    title: 'Agua de Pitahaya',
    tag: 'Bebida Fresca · Semidesierto hidalguense',
    desc: 'Agua fresca elaborada con pitahaya madura, fruto del cactus pitayo silvestre. De color característico, sabor dulce y ligeramente herbal, con propiedades nutritivas únicas.',
    meta: ['⏱ 15 min', '🏵️ Color natural único', '🧊 Servir frío'],
    ingredientes: [
      '500 g de pitahaya madura',
      '2 L de agua purificada',
      'Azúcar o miel de abeja al gusto',
      '1 limón (opcional)',
      'Hojas de menta fresca (opcional)',
      'Hielo',
    ],
    procedimiento: [
      'Pelar la pitahaya y extraer la pulpa, desmenuzándola para separarla de las semillas.',
      'Mezclar la pulpa con agua en una jarra y revolver hasta integrar.',
      'Agregar azúcar o miel al gusto y revolver hasta disolver completamente.',
      'Colar la mezcla para eliminar fibras y semillas restantes.',
      'Añadir jugo de limón y menta si se desea, y enfriar. Servir con hielo.',
      'Servir en vasos transparentes para resaltar su color característico, decorado con una rodaja de pitahaya o una hoja de menta. Se puede presentar en bandejas de madera típicas de la región.',
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
