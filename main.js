/**
 * main.js — URBAN HOUSE WORLD
 * Interactividad compartida entre páginas
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================================
  // 1. RESALTAR PÁGINA ACTIVA EN EL MENÚ
  // ============================================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ============================================================
  // 2. CARRUSEL: DRAG PARA DESPLAZAR
  // ============================================================
  const carousel = document.querySelector('.carousel-wrapper');
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Soporte táctil
    let touchStartX = 0;
    let touchScrollLeft = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX - carousel.offsetLeft;
      touchScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - touchStartX) * 1.5;
      carousel.scrollLeft = touchScrollLeft - walk;
    });
  }

  // ============================================================
  // 3. BOTONES: ACCIONES
  // ============================================================
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.tagName === 'A' && this.getAttribute('href') && this.getAttribute('href') !== '#') {
        return;
      }
      e.preventDefault();
      const text = this.textContent.trim().toLowerCase();
      
      if (text.includes('pre-save')) {
        window.open('https://urbanhouse.world/pre-save', '_blank');
      } else if (text.includes('spotify')) {
        window.open('https://open.spotify.com/', '_blank');
      } else if (text.includes('beatport')) {
        window.open('https://www.beatport.com/', '_blank');
      } else if (text.includes('perfil') || text.includes('redes')) {
        window.open('https://urbanhouse.world/artists', '_blank');
      } else {
        alert('⚡ Acción: ' + text);
      }
    });
  });

  console.log('🏛️ URBAN HOUSE WORLD · minimal radical');
});
