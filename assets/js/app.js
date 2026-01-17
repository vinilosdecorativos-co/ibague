
// GSAP animations for entry and scroll
document.addEventListener('DOMContentLoaded', function() {
  // Load GSAP from CDN (included in each page via script tag). Use basic animations:
  if(typeof gsap === 'undefined') return;

  // Header appear
  gsap.from('header', {y:-30, opacity:0, duration:0.8, ease:'power2.out'});

  // Hero text
  gsap.from('.hero h1', {y:40, opacity:0, duration:0.9, delay:0.2, ease:'power3.out'});
  gsap.from('.hero p', {y:20, opacity:0, duration:0.8, delay:0.35});
  gsap.from('.hero .cta', {scale:0.9, opacity:0, duration:0.6, delay:0.6});

  // Feature cards
  gsap.utils.toArray('.service, .feature-card, .portfolio-item, .project-item, .catalog-card').forEach(function(el, i){
    gsap.from(el, {y:30, opacity:0, duration:0.7, delay: 0.2 + i*0.08, ease:'power2.out'});
  });

  // Gallery hover scale
  document.querySelectorAll('.grid-gallery img').forEach(img=>{
    img.addEventListener('mouseenter', ()=> gsap.to(img, {scale:1.05, duration:0.4}));
    img.addEventListener('mouseleave', ()=> gsap.to(img, {scale:1, duration:0.4}));
  });

  // Simple scroll-trigger like effect (no ScrollTrigger license required)
  const revealEls = document.querySelectorAll('.fade-on-scroll');
  function revealOnScroll() {
    const windowBottom = window.innerHeight;
    revealEls.forEach(el=>{
      const rect = el.getBoundingClientRect();
      if(rect.top < windowBottom - 80) {
        gsap.to(el, {opacity:1, y:0, duration:0.8, ease:'power2.out'});
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); window.scrollTo({ top: target.offsetTop-18, behavior:'smooth' }); }
    });
  });
  const menuBtn = document.getElementById("menuToggle");
const menu = document.getElementById("mainMenu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    menu.classList.toggle("closed");
  });
  gsap.registerPlugin(ScrollTrigger);

gsap.from(".testimonio-card", {
    scrollTrigger: {
        trigger: ".testimonios",
        start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    stagger: 0.2
});
gsap.registerPlugin(ScrollTrigger);


gsap.utils.toArray('.fade-on-scroll').forEach(el=>{
gsap.to(el,{
opacity:1,
y:0,
duration:0.8,
ease:'power2.out',
scrollTrigger:{trigger:el,start:'top 85%'}
})
})


// Slider automático
const slides=document.querySelectorAll('.slider img');
let current=0;
if(slides.length>1){
setInterval(()=>{
const next=(current+1)%slides.length;
gsap.to(slides[current],{opacity:0,duration:0.8});
gsap.to(slides[next],{opacity:1,duration:0.8});
current=next;
},4000);
}


// Contador
document.querySelectorAll('.counter').forEach(counter=>{
gsap.fromTo(counter,{innerText:0},{
innerText:counter.dataset.target,
duration:1.6,
snap:{innerText:1},
scrollTrigger:{trigger:counter,start:'top 85%'}
})
})
});

// ===============================
// FILTRO INTERACTIVO DE BLOG (INDEX)
// ===============================
document.querySelectorAll('[data-filter]').forEach(btn=>{
btn.addEventListener('click',()=>{
const filter=btn.dataset.filter;
document.querySelectorAll('.blog-card').forEach(card=>{
card.style.display = filter==='all' || card.dataset.category===filter ? 'block':'none';
})
})
});


// ===============================
// TRACKING DE INTERACCIONES (CTA)
// ===============================
document.querySelectorAll('.btn').forEach(btn=>{
btn.addEventListener('click',()=>{
console.log('CTA Blog clickeado:', btn.textContent);
})
});

// ===================================
// BLOG – AJUSTES RESPONSIVE JS
// ===================================

// Detecta móvil
const isMobile = window.innerWidth < 768;

// Reduce animaciones en móvil (mejora INP)
if (isMobile && typeof gsap !== 'undefined') {
  gsap.globalTimeline.timeScale(1.3);
}

// Scroll suave solo en desktop
if (!isMobile) {
  document.querySelectorAll('.blog-card a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-4px)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
}

  // Slider automático para cambiar imágenes
  const slides = document.querySelectorAll('.slider img');
  let current = 0;

  function changeImage() {
    const next = (current + 1) % slides.length;
    gsap.to(slides[current], { opacity: 0, duration: 0.8 });
    gsap.to(slides[next], { opacity: 1, duration: 0.8 });
    current = next;
  }

  if (slides.length > 1) {
    setInterval(changeImage, 4000); // Cambiar cada 4 segundos
  }

  // Iniciar con la primera imagen visible
  gsap.from(slides[0], { opacity: 1, duration: 0.8 });

  gsap.utils.toArray(
  '.content-block, .info-card, .highlight'
).forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%'
    }
  });
});

document.getElementById("cotizacionForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cliente = document.getElementById("cliente").value;
  const producto = document.getElementById("producto").value;
  const cantidad = document.getElementById("cantidad").value;
  const medidas = document.getElementById("medidas").value;
  const observaciones = document.getElementById("observaciones").value || "Sin observaciones";

  const telefonoWhatsApp = "573041010263"; // Cambia por tu número

  const mensaje = `
Hola Vinilos Decorativos Ibagué, quiero una cotización:

Mi nombre es: ${nombre}
Tipo de cliente: ${cliente}
Producto: ${producto}
Cantidad: ${cantidad}
Medidas: ${medidas}
Observaciones: ${observaciones || "Sin observaciones"}
`;

  const url = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
});


window.addEventListener('scroll',()=>{
  const img=document.querySelector('.hero-image img');
  img.style.transform=`translateY(${window.scrollY*.08}px)`;
});

/* FAQ TOGGLE */
document.querySelectorAll('.faq-item').forEach(f=>{
  f.addEventListener('click',()=>{
    f.classList.toggle('active');
  });
});

/* =====================================================
   GALERÍA INTERACTIVA – SISTEMA PROFESIONAL
===================================================== */

const STORAGE_KEY = 'vdi_reactions';
const USER_KEY = 'vdi_user_id';

/* ---------- Usuario anónimo ---------- */
function getUserId() {
  let id = localStorage.getItem(USER_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_KEY, id);
  }
  return id;
}
const USER_ID = getUserId();

/* ---------- Datos ---------- */
function getData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(STORAGE_KEY + '_sync', Date.now());
}

/* ---------- Inicializar ---------- */
function initGallery() {
  const data = getData();

  document.querySelectorAll('.gallery-item').forEach(item => {
    const id = item.dataset.id;
    if (!data[id]) {
      data[id] = { likes: 0, loves: 0, users: {} };
    }

    updateUI(item, data[id]);
  });

  saveData(data);
}

/* ---------- UI ---------- */
function updateUI(item, state) {
  item.querySelector('.likes-count').textContent = `👍 ${state.likes}`;
  item.querySelector('.loves-count').textContent = `❤️ ${state.loves}`;
}

/* ---------- Delegación de eventos ---------- */
document.addEventListener('click', e => {

  /* Abrir menú */
  if (e.target.classList.contains('actions-btn')) {
    e.stopPropagation();

    document.querySelectorAll('.actions-menu').forEach(m => m.style.display = 'none');
    const menu = e.target.nextElementSibling;
    menu.style.display = 'flex';
    return;
  }

  /* Click en acciones */
  const actionBtn = e.target.closest('.actions-menu button');
  if (actionBtn) {
    e.stopPropagation();

    const item = actionBtn.closest('.gallery-item');
    const id = item.dataset.id;
    const action = actionBtn.dataset.action;

    const data = getData();
    const state = data[id];
    const user = state.users[USER_ID] || {};

    /* Evitar múltiples likes */
    if (action === 'like' || action === 'love') {
      if (user[action]) {
        alert('Ya registraste esta reacción 👍');
        return;
      }

      state[action + 's']++;
      state.users[USER_ID] = { ...user, [action]: true };

      saveData(data);
      updateUI(item, state);

      if (action === 'love') animateHeart(item);
    }

    /* WhatsApp */
    if (action === 'wa') {
      const text = `Hola, me interesa este proyecto: ${item.dataset.title} ${item.dataset.img}`;
      window.open(`https://wa.me/573010263000?text=${encodeURIComponent(text)}`, '_blank');
    }

    item.querySelector('.actions-menu').style.display = 'none';
    return;
  }

  /* Cerrar menús */
  document.querySelectorAll('.actions-menu').forEach(m => m.style.display = 'none');
});

/* ---------- Animación corazón ---------- */
function animateHeart(item) {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.className = 'heart-float';
  item.appendChild(heart);

  heart.addEventListener('animationend', () => heart.remove());
}

/* ---------- Sincronización entre páginas ---------- */
window.addEventListener('storage', e => {
  if (e.key === STORAGE_KEY || e.key === STORAGE_KEY + '_sync') {
    initGallery();
  }
});

/* ---------- Ranking ---------- */
function getRanking() {
  const data = getData();
  return Object.entries(data)
    .map(([id, d]) => ({ id, score: d.likes + d.loves * 2 }))
    .sort((a, b) => b.score - a.score);
}

/* ---------- Exportar datos ---------- */
function exportData() {
  const blob = new Blob(
    [JSON.stringify(getData(), null, 2)],
    { type: 'application/json' }
  );
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'vdi-reactions.json';
  a.click();
}

/* ---------- Init ---------- */
initGallery();
