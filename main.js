/**
 * main.js — URBAN HOUSE WORLD
 * Interactividad compartida entre páginas
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================================
  // 1. RESALTAR PÁGINA ACTIVA EN EL MENÚ (con soporte para subcarpetas)
  // ============================================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Para enlaces en subcarpetas (../index.html)
    const cleanHref = href.replace(/\.\.\//g, '');
    const cleanPath = currentPath.replace(/\/[^/]*\.html$/, '/') + cleanHref;
    
    if (currentPath.includes(cleanHref) || href === currentPath) {
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
  // 3. BOTONES: MANEJO DE ENLACES
  // ============================================================
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    // Si el botón tiene href real, no interferir
    if (btn.tagName === 'A' && btn.getAttribute('href') && btn.getAttribute('href') !== '#') {
      if (!btn.hasAttribute('target')) {
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      }
      return;
    }

    // Para botones sin href
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const text = this.textContent.trim().toLowerCase();
      
      if (text.includes('pre-save')) {
        window.open('https://urbanhouse.world/pre-save', '_blank');
      } else if (text.includes('spotify')) {
        window.open('https://open.spotify.com/', '_blank');
      } else if (text.includes('beatport')) {
        window.open('https://www.beatport.com/', '_blank');
      } else if (text.includes('ver perfil') || text.includes('perfil') || text.includes('redes')) {
        // Ya tienen enlace, no hacer nada
      } else {
        alert('⚡ Acción: ' + text);
      }
    });
  });

  console.log('🏛️ URBAN HOUSE WORLD · minimal radical');
});
