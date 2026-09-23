 // Fonction pour gérer la langue (si elle y est déjà)
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  
  const navUl = document.querySelector('.navbar-nav');
  if(navUl) {
    if(lang === 'ar') {
      navUl.classList.remove('ms-auto');
      navUl.classList.add('me-auto');
    } else {
      navUl.classList.remove('me-auto');
      navUl.classList.add('ms-auto');
    }
  }
}

// ==========================================
// CARROUSEL DYNAMIQUE (Jusqu'à 20+ éléments)
// ==========================================
// C'est ici que vous ajoutez vos souvenirs au fur et à mesure !
const mediaItems = [
  {
    type: 'image',
    url: '../assets/0_images/naima_190426.jpg',
    caption: '✨ Activités au lycée - Naïma'
  },
  {
    type: 'image',
    url: '../assets/0_images/naima_certif.jpg',
    caption: '🏆 Moments forts & Certifications'
  },
  {
    type: 'image',
    url: '../assets/0_images/naima_recompenses.jpeg',
    caption: '🌟 Récompenses et excellence'
  },
  {
    type: 'video',
    url: '../assets/0_images/video_190426.mp4',
    caption: '🎥 Vidéo souvenir - Activités'
  }
  // 📌 Pour ajouter de nouveaux souvenirs, rajoutez-les ici facilement :
  // { type: 'image', url: '../assets/0_images/naima_4.jpeg', caption: '💡 Nouveau moment fort' },
  // { type: 'video', url: '../assets/0_images/autre_video.mp4', caption: '🎬 Autre vidéo' },
];

// Code automatique pour injecter les éléments du carrousel dans le HTML
document.addEventListener("DOMContentLoaded", function() {
  const indicatorsContainer = document.getElementById('carouselIndicators');
  const innerContainer = document.getElementById('carouselInner');

  if (indicatorsContainer && innerContainer) {
    mediaItems.forEach((item, index) => {
      // 1. Création de l'indicateur (les petits tirets en bas)
      const indicatorBtn = document.createElement('button');
      indicatorBtn.type = 'button';
      indicatorBtn.setAttribute('data-bs-target', '#studentCarousel');
      indicatorBtn.setAttribute('data-bs-slide-to', index);
      if (index === 0) {
        indicatorBtn.classList.add('active');
        indicatorBtn.setAttribute('aria-current', 'true');
      }
      indicatorBtn.setAttribute('aria-label', `Slide ${index + 1}`);
      indicatorsContainer.appendChild(indicatorBtn);

      // 2. Création de l'élément du carrousel (Image ou Vidéo)
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }

      let mediaContent = '';
      if (item.type === 'video') {
        mediaContent = `
          <video class="d-block w-100" autoplay muted loop playsinline>
            <source src="${item.url}" type="video/mp4">
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        `;
      } else {
        mediaContent = `
          <img src="${item.url}" class="d-block w-100" alt="Souvenir Naïma">
        `;
      }

      carouselItem.innerHTML = `
        ${mediaContent}
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-1">
          <p class="mb-0 small">${item.caption}</p>
        </div>
      `;

      innerContainer.appendChild(carouselItem);
    });
  }
});

