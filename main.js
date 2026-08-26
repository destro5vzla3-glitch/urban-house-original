/**
 * main.js — URBAN HOUSE WORLD
 * Interactividad compartida entre páginas
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================================
  // 1. RESALTAR PÁGINA ACTIVA EN EL MENÚ
  // ============================================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.fb-nav-link, .nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const cleanHref = href.replace(/\.\.\//g, '');
      if (currentPath.includes(cleanHref) || href === currentPath) {
        link.classList.add('active');
      }
    }
  });

  // ============================================================
  // 2. BOTONES DE SEGUIR / MENSAJE (acción en la misma página)
  // ============================================================
  const followBtn = document.querySelector('.fb-follow-btn');
  if (followBtn) {
    followBtn.addEventListener('click', function() {
      if (this.textContent.includes('Seguir')) {
        this.textContent = '✅ Siguiendo';
        this.style.backgroundColor = '#e0e0e0';
        this.style.color = '#000';
        this.style.borderColor = '#e0e0e0';
        alert('📢 Ahora sigues a Destro5');
      } else {
        this.textContent = '➕ Seguir';
        this.style.backgroundColor = '#000';
        this.style.color = '#fff';
        this.style.borderColor = '#000';
        alert('👋 Has dejado de seguir a Destro5');
      }
    });
  }

  const messageBtn = document.querySelector('.fb-message-btn');
  if (messageBtn) {
    messageBtn.addEventListener('click', function() {
      // Abrir un modal o redirigir a contacto
      alert('💬 Envía un mensaje a Destro5: destro5@urbanhouse.world');
    });
  }

  // ============================================================
  // 3. BOTONES DE PUBLICACIONES (Me gusta, Comentar, Compartir)
  // ============================================================
  const postBtns = document.querySelectorAll('.fb-post-btn');
  postBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.textContent.trim();
      
      if (action.includes('Me gusta')) {
        if (this.style.backgroundColor === 'rgb(0, 0, 0)') {
          this.style.backgroundColor = 'transparent';
          this.style.color = '#000';
          this.style.opacity = '0.6';
          alert('👎 Ya no te gusta esta publicación');
        } else {
          this.style.backgroundColor = '#000';
          this.style.color = '#fff';
          this.style.borderRadius = '4px';
          this.style.opacity = '1';
          alert('👍 Te gusta esta publicación');
        }
      } else if (action.includes('Comentar')) {
        const comment = prompt('💬 Escribe tu comentario:');
        if (comment) {
          alert('✅ Comentario publicado: "' + comment + '"');
        }
      } else if (action.includes('Compartir')) {
        // Compartir enlace de la página actual
        const url = window.location.href;
        if (navigator.share) {
          navigator.share({
            title: document.title,
            text: 'Mira el perfil de Destro5 en URBAN HOUSE WORLD',
            url: url
          });
        } else {
          // Copiar enlace al portapapeles
          navigator.clipboard.writeText(url).then(() => {
            alert('🔗 Enlace copiado al portapapeles');
          });
        }
      }
    });
  });

  // ============================================================
  // 4. CARRUSEL (para lanzamientos.html)
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
  // 5. BOTONES DE LANZAMIENTOS (enlaces externos)
  // ============================================================
  const externalButtons = document.querySelectorAll('.btn, .release-links .btn, .fb-social-btn');
  externalButtons.forEach(btn => {
    if (btn.tagName === 'A' && btn.getAttribute('href') && btn.getAttribute('href') !== '#') {
      if (!btn.hasAttribute('target')) {
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener noreferrer');
      }
    }
  });

  console.log('🏛️ URBAN HOUSE WORLD · minimal radical');
});
