/**
 * UNIQUE SPACE DESIGN STUDIO - JAVASCRIPT INTERACTIONS
 * Studio: Pune, Maharashtra
 * Phone: 073870 07255
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3. Services Filter & Live Search
  const serviceFilterPills = document.querySelectorAll('.filter-pill');
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceSearchInput = document.getElementById('serviceSearchInput');

  function filterServices() {
    const activeCategory = document.querySelector('.filter-pill.active')?.dataset.filter || 'all';
    const searchQuery = (serviceSearchInput?.value || '').toLowerCase().trim();

    serviceCards.forEach(card => {
      const cardCategory = card.dataset.category || '';
      const cardTitle = card.querySelector('.service-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.service-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || cardCategory.includes(activeCategory);
      const matchesSearch = !searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  serviceFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      serviceFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterServices();
    });
  });

  if (serviceSearchInput) {
    serviceSearchInput.addEventListener('input', filterServices);
  }

  // 4. Portfolio Filter Tabs
  const portfolioTabs = document.querySelectorAll('.portfolio-tab');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portfolioTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetCategory = tab.dataset.filter;

      portfolioCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive Portfolio Lightbox
  const lightboxModal = document.getElementById('portfolioLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.portfolio-img');
      const title = card.querySelector('.portfolio-title')?.textContent || 'Unique Project';
      const tag = card.querySelector('.portfolio-tag')?.textContent || 'Interior Design';

      if (lightboxModal && lightboxImage && img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = title;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxTag) lightboxTag.textContent = tag;
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Interactive Space & Budget Estimator
  const spaceChips = document.querySelectorAll('[data-estimator-space]');
  const tierChips = document.querySelectorAll('[data-estimator-tier]');
  const estimatedPriceEl = document.getElementById('estimatedPrice');
  const estimatedScopeEl = document.getElementById('estimatedScope');
  const estimatedTimelineEl = document.getElementById('estimatedTimeline');

  const basePricing = {
    '1bhk': { premium: '₹3.5 - 5.5 Lakhs', luxury: '₹5.5 - 8.5 Lakhs', ultra: '₹8.5 - 12+ Lakhs', time: '30-40 Days', scope: 'Modular kitchen, living room TV unit, master bedroom wardrobe, lighting & painting.' },
    '2bhk': { premium: '₹5.5 - 8.5 Lakhs', luxury: '₹8.5 - 13.5 Lakhs', ultra: '₹14 - 20+ Lakhs', time: '40-55 Days', scope: 'Full home modular furniture, designer false ceilings, 2 bedrooms, ambient lighting & decor styling.' },
    '3bhk': { premium: '₹8.5 - 13.5 Lakhs', luxury: '₹14 - 22 Lakhs', ultra: '₹22 - 35+ Lakhs', time: '55-75 Days', scope: 'Complete bespoke luxury woodwork, marble dining accents, 3 bedrooms, smart lighting, wallpaper & custom brass fixtures.' },
    'villa': { premium: '₹18 - 28 Lakhs', luxury: '₹28 - 45 Lakhs', ultra: '₹48 - 75+ Lakhs', time: '75-100 Days', scope: 'Architectural redesign, double-height living, luxury Italian modular kitchen, walk-in closets, landscape terrace.' },
    'commercial': { premium: '₹1,400 / sq.ft', luxury: '₹2,200 / sq.ft', ultra: '₹3,500+ / sq.ft', time: '35-60 Days', scope: 'Bespoke reception counter, acoustic glass partitions, ergonomic workstations, branded lighting & executive lounge.' }
  };

  let selectedSpace = '2bhk';
  let selectedTier = 'luxury';

  function updateEstimator() {
    const data = basePricing[selectedSpace] || basePricing['2bhk'];
    if (estimatedPriceEl) estimatedPriceEl.textContent = data[selectedTier] || data['luxury'];
    if (estimatedScopeEl) estimatedScopeEl.textContent = data.scope;
    if (estimatedTimelineEl) estimatedTimelineEl.textContent = `Estimated Handover: ${data.time}`;
  }

  spaceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      spaceChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedSpace = chip.dataset.estimatorSpace;
      updateEstimator();
    });
  });

  tierChips.forEach(chip => {
    chip.addEventListener('click', () => {
      tierChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedTier = chip.dataset.estimatorTier;
      updateEstimator();
    });
  });

  // 7. Consultation Booking Modal & Form Triggers
  const consultationModal = document.getElementById('consultationModal');
  const consultationCloseBtn = document.getElementById('consultationCloseBtn');
  const bookConsultationBtns = document.querySelectorAll('.open-consultation-modal');

  bookConsultationBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (consultationModal) {
        // Pre-fill service if button specifies
        const servicePrefill = btn.dataset.service;
        if (servicePrefill) {
          const serviceSelect = document.getElementById('modalServiceSelect');
          if (serviceSelect) serviceSelect.value = servicePrefill;
        }
        consultationModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (consultationCloseBtn) {
    consultationCloseBtn.addEventListener('click', () => {
      consultationModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (consultationModal) {
    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        consultationModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 8. Form Submission Handling with Direct WhatsApp fallback
  const contactForm = document.getElementById('mainContactForm');
  const modalForm = document.getElementById('modalConsultationForm');

  function handleFormSubmit(form, isModal = false) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || 'Valued Client';
      const phone = formData.get('phone') || '';
      const service = formData.get('service') || 'Interior Design';
      const property = formData.get('property') || 'Residential';
      const message = formData.get('message') || 'Consultation request for ' + service;

      // Compose WhatsApp inquiry link
      const whatsappText = encodeURIComponent(
        `Hello Unique Space Design Studio,\nI would like to book a consultation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Property Type:* ${property}\n*Details:* ${message}`
      );
      const whatsappUrl = `https://wa.me/917387007255?text=${whatsappText}`;

      showToast(`Thank you, ${name}! Redirecting to connect with our design team...`);

      if (isModal && consultationModal) {
        consultationModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      form.reset();

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1200);
    });
  }

  if (contactForm) handleFormSubmit(contactForm, false);
  if (modalForm) handleFormSubmit(modalForm, true);

  // 9. Toast Notification System
  function showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.className = 'toast-alert';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E5C378" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Pre-initialize estimator
  updateEstimator();
});
