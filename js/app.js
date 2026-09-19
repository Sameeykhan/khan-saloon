/**
 * Khan's Saloon & Royal Bridal Couture - Client Application Controller
 */

// Global State
const AppState = {
  cart: [],
  currency: 'PKR',
  exchangeRates: {
    PKR: 1,
    USD: 0.0036,
    AED: 0.013
  },
  currencySymbols: {
    PKR: 'Rs. ',
    USD: '$',
    AED: 'AED '
  },
  discountPercent: 0,
  activeCoupon: '',
  bridalGalleryExpanded: false,
  currentBridalFilter: 'all',
  coutureExpanded: false,
  currentCoutureFilter: 'all',
  jewelryExpanded: false,
  currentJewelryFilter: 'all',
  cosmeticsExpanded: false
};

// Helper for clean URL/ID slugs
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadPreferencesFromStorage();
  loadCartFromStorage();
  renderSalonServices();
  renderBridalGallery('all');
  renderBridalDresses('all');
  renderJewelryBoutique('all');
  renderCosmeticsSale();
  renderBrideTestimonials();
  renderFaqs();
  setupEventListeners();
  setupStickyHeader();
  updateCartBadge();

  // Enforce today as minimum booking date
  const bookDateInput = document.getElementById('book-date');
  if (bookDateInput) {
    bookDateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  // Handle URL hash smooth scrolling across tabs/pages
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }
});

// Format Currency
function formatPrice(amountInPKR) {
  const rate = AppState.exchangeRates[AppState.currency] || 1;
  const converted = Math.round(amountInPKR * rate);
  const symbol = AppState.currencySymbols[AppState.currency] || 'Rs. ';
  return `${symbol}${converted.toLocaleString()}`;
}

// Sticky Header
function setupStickyHeader() {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 1. RENDER SALON SERVICES (Matching Image 1, 2 & 3)
function renderSalonServices() {
  const container = document.getElementById('services-container');
  if (!container) return;

  container.innerHTML = SALOON_DATA.services.map(cat => `
    <div class="service-category-group" id="${slugify(cat.category)}">
      <div class="service-category-top-bar">
        <div class="service-category-titles">
          <h3 class="service-category-title">${cat.shortTitle || cat.category}</h3>
          ${cat.tagline ? `<p class="service-category-tagline">${cat.tagline}</p>` : ''}
        </div>
        <a href="services.html#${slugify(cat.category)}" class="service-view-all-link" target="_blank" rel="noopener noreferrer" title="View all ${cat.shortTitle || cat.category} services in Services page">
          <span>View All Menu</span>
          <span>→</span>
        </a>
      </div>
      <p class="service-category-prices">${cat.subtitle}</p>
      
      <div class="service-cards-row">
        ${cat.items.map(item => `
          <div class="service-subcard">
            <div class="service-img-wrap">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
              <span class="service-card-tag">${item.tag}</span>
            </div>
            <div class="service-subcard-info">
              <div>
                <h4 class="service-subcard-title">${item.title}</h4>
                <p class="service-subcard-desc">${item.desc}</p>
              </div>
              <div class="service-subcard-footer">
                <span class="service-subcard-price">${item.priceText}</span>
                <button class="btn-book-service" onclick="openBookingModal('${item.title}', '${item.priceText}')">
                  Book Service
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Slider indicator dots matching Image 2 -->
      <div class="service-dots-indicator" aria-hidden="true">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  `).join('');
}

// 2. RENDER PAKISTANI BRIDAL GALLERY (SHOW 2-3 PICTURES INITIALLY WITH SEE MORE TOGGLE)
function renderBridalGallery(filter = null) {
  const container = document.getElementById('bridal-gallery-grid');
  if (!container) return;

  if (filter !== null && filter !== undefined) {
    if (filter !== AppState.currentBridalFilter) {
      AppState.currentBridalFilter = filter;
      AppState.bridalGalleryExpanded = false;
    }
  }
  const currentFilter = AppState.currentBridalFilter || 'all';

  const filtered = currentFilter === 'all' 
    ? SALOON_DATA.brides 
    : SALOON_DATA.brides.filter(b => b.category === currentFilter);

  // Show only 2-3 pictures initially as requested by user (default limit 3)
  const initialLimit = 3;
  const isExpanded = AppState.bridalGalleryExpanded;
  const displayed = isExpanded ? filtered : filtered.slice(0, initialLimit);

  container.innerHTML = displayed.map(bride => `
    <div class="bridal-card" data-category="${bride.category}">
      <div class="bridal-img-wrap" onclick="openLightbox('${bride.id}')">
        <img src="${bride.image}" alt="${bride.name}" loading="lazy" />
        <div class="bridal-zoom-hint" title="Click to view full portrait & details">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <div class="bridal-badge-overlay">${bride.ceremony}</div>
      </div>
      <div class="bridal-card-content">
        <h4 class="bridal-look-title">${bride.name}</h4>
        <p class="bridal-look-subtitle">${bride.makeupArtist}</p>
        <p class="bridal-details-list">
          <span>Look:</span> ${bride.lookSummary}<br>
          <span>Jewelry:</span> ${bride.jewelryDetails.substring(0, 70)}...
        </p>
        <div class="bridal-card-actions">
          <button class="btn-book-service" onclick="openBookingModal('Bridal Makeover - ${bride.name}', 'Rs. 25,000')">
            Book This Look
          </button>
          <button class="btn-outline-gold" style="padding: 6px 12px; font-size: 0.8rem;" onclick="openLightbox('${bride.id}')">
            View Details
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Handle See More button container
  let seeMoreWrap = document.getElementById('bridal-see-more-wrap');
  if (!seeMoreWrap) {
    seeMoreWrap = document.createElement('div');
    seeMoreWrap.id = 'bridal-see-more-wrap';
    seeMoreWrap.className = 'gallery-see-more-wrap';
    container.parentNode.insertBefore(seeMoreWrap, container.nextSibling);
  }

  if (filtered.length > initialLimit) {
    seeMoreWrap.style.display = 'flex';
    if (isExpanded) {
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleBridalGalleryExpand()">
          <span>See Less Looks</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(180deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      `;
    } else {
      const remaining = filtered.length - initialLimit;
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleBridalGalleryExpand()">
          <span>See More Looks (${remaining} More)</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      `;
    }
  } else {
    seeMoreWrap.style.display = 'none';
  }
}

function toggleBridalGalleryExpand() {
  AppState.bridalGalleryExpanded = !AppState.bridalGalleryExpanded;
  renderBridalGallery();
  if (!AppState.bridalGalleryExpanded) {
    const container = document.getElementById('bridal-gallery-grid');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

window.toggleBridalGalleryExpand = toggleBridalGalleryExpand;

// 3. RENDER HANDCRAFTED BRIDAL COUTURE (SHOW 3 ENSEMBLES INITIALLY WITH SEE MORE TOGGLE)
function renderBridalDresses(filter = null) {
  const container = document.getElementById('couture-grid');
  if (!container) return;

  if (filter !== null && filter !== undefined) {
    if (filter !== AppState.currentCoutureFilter) {
      AppState.currentCoutureFilter = filter;
      AppState.coutureExpanded = false;
    }
  }
  const currentFilter = AppState.currentCoutureFilter || 'all';

  const filtered = currentFilter === 'all'
    ? SALOON_DATA.dresses
    : SALOON_DATA.dresses.filter(d => d.designerSlug === currentFilter || d.category === currentFilter);

  const initialLimit = 3;
  const isExpanded = AppState.coutureExpanded;
  const displayed = isExpanded ? filtered : filtered.slice(0, initialLimit);

  container.innerHTML = displayed.map(dress => `
    <div class="couture-card">
      <div class="couture-img-wrap" onclick="openDressQuickView('${dress.id}')" style="cursor: pointer;">
        <img src="${dress.image}" alt="${dress.title}" loading="lazy" />
        <span class="badge-tag badge-couture-spec couture-badge-designer">
          ${dress.specialization}
        </span>
        <button class="couture-quick-btn" onclick="event.stopPropagation(); openDressQuickView('${dress.id}')">
          Quick View
        </button>
      </div>
      <div class="couture-content">
        <h4 class="couture-title" onclick="openDressQuickView('${dress.id}')" style="cursor: pointer;">${dress.title}</h4>
        <p class="couture-meta-fabric"><strong>Fabric:</strong> ${dress.fabric}</p>
        <p class="couture-meta-fabric" style="margin-bottom: 8px;"><strong>Craftsmanship:</strong> ${dress.work}</p>
        
        <div class="couture-price-row">
          <span class="couture-price">${formatPrice(dress.price)}</span>
          <span class="couture-tag-custom">Made to Measure</span>
        </div>

        <div class="couture-actions">
          <button class="btn-gold" onclick="addToCart('${dress.id}', '${dress.title.replace(/'/g, "\\'")}', ${dress.price}, '${dress.image}', 'dress')">
            Add to Bag
          </button>
          <button class="btn-outline-gold" onclick="openDressQuickView('${dress.id}')">
            Details & Fit
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Handle See More container
  let seeMoreWrap = document.getElementById('couture-see-more-wrap');
  if (!seeMoreWrap) {
    seeMoreWrap = document.createElement('div');
    seeMoreWrap.id = 'couture-see-more-wrap';
    seeMoreWrap.className = 'gallery-see-more-wrap';
    container.parentNode.insertBefore(seeMoreWrap, container.nextSibling);
  }

  if (filtered.length > initialLimit) {
    seeMoreWrap.style.display = 'flex';
    if (isExpanded) {
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleCoutureExpand()">
          <span>See Less Ensembles</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(180deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      `;
    } else {
      const remaining = filtered.length - initialLimit;
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleCoutureExpand()">
          <span>See More Ensembles (${remaining} More)</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      `;
    }
  } else {
    seeMoreWrap.style.display = 'none';
  }
}

function toggleCoutureExpand() {
  AppState.coutureExpanded = !AppState.coutureExpanded;
  renderBridalDresses();
  if (!AppState.coutureExpanded) {
    const container = document.getElementById('couture-grid');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
window.toggleCoutureExpand = toggleCoutureExpand;

// 4. RENDER ROYAL BRIDAL JEWELRY BOUTIQUE (SHOW 4 PIECES INITIALLY WITH SEE MORE TOGGLE)
function renderJewelryBoutique(filter = null) {
  const container = document.getElementById('jewelry-grid');
  if (!container) return;

  if (filter !== null && filter !== undefined) {
    if (filter !== AppState.currentJewelryFilter) {
      AppState.currentJewelryFilter = filter;
      AppState.jewelryExpanded = false;
    }
  }
  const currentFilter = AppState.currentJewelryFilter || 'all';

  const filtered = currentFilter === 'all'
    ? SALOON_DATA.jewelry
    : SALOON_DATA.jewelry.filter(j => j.category === currentFilter);

  const initialLimit = 4;
  const isExpanded = AppState.jewelryExpanded;
  const displayed = isExpanded ? filtered : filtered.slice(0, initialLimit);

  container.innerHTML = displayed.map(item => `
    <div class="jewelry-card">
      <div class="jewelry-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <span class="jewelry-badge-pure">${item.badge}</span>
        <button class="jewelry-quick-btn" onclick="openJewelryQuickView('${item.id}')">
          Quick View
        </button>
      </div>
      <div class="jewelry-content">
        <div class="jewelry-rating">
          <span>★★★★★</span>
          <span style="color: var(--text-muted); font-size: 0.72rem;">(${item.reviewsCount})</span>
        </div>
        <h4 class="jewelry-title">${item.title}</h4>
        <p class="jewelry-subtitle">${item.desc.substring(0, 65)}...</p>
        <div class="jewelry-price-row">
          <span class="jewelry-price">${formatPrice(item.price)}</span>
          <button class="btn-add-cart-mini" onclick="addToCart('${item.id}', '${item.title.replace(/'/g, "\\'")}', ${item.price}, '${item.image}', 'jewelry')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Handle See More container
  let seeMoreWrap = document.getElementById('jewelry-see-more-wrap');
  if (!seeMoreWrap) {
    seeMoreWrap = document.createElement('div');
    seeMoreWrap.id = 'jewelry-see-more-wrap';
    seeMoreWrap.className = 'gallery-see-more-wrap';
    container.parentNode.insertBefore(seeMoreWrap, container.nextSibling);
  }

  if (filtered.length > initialLimit) {
    seeMoreWrap.style.display = 'flex';
    if (isExpanded) {
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleJewelryExpand()">
          <span>See Less Jewelry</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(180deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      `;
    } else {
      const remaining = filtered.length - initialLimit;
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleJewelryExpand()">
          <span>See More Jewelry (${remaining} More)</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      `;
    }
  } else {
    seeMoreWrap.style.display = 'none';
  }
}

function toggleJewelryExpand() {
  AppState.jewelryExpanded = !AppState.jewelryExpanded;
  renderJewelryBoutique();
  if (!AppState.jewelryExpanded) {
    const container = document.getElementById('jewelry-grid');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
window.toggleJewelryExpand = toggleJewelryExpand;

// 5. RENDER KHAN'S BEAUTY PRODUCTS SALE
function renderCosmeticsSale() {
  const container = document.getElementById('cosmetics-grid');
  if (!container) return;

  const isHomepage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
  const initialLimit = isHomepage ? 4 : SALOON_DATA.cosmetics.length;
  const isExpanded = AppState.cosmeticsExpanded;
  const displayed = (isHomepage && !isExpanded) ? SALOON_DATA.cosmetics.slice(0, initialLimit) : SALOON_DATA.cosmetics;

  container.innerHTML = displayed.map(prod => `
    <div class="cosmetic-card">
      <div class="cosmetic-thumb-wrap">
        <img src="${prod.icon}" alt="${prod.title}" style="object-fit: cover; object-position: center; width: 100%; height: 100%; border-radius: 8px;" loading="lazy" />
      </div>
      <h4 class="cosmetic-title">${prod.title}</h4>
      <span class="cosmetic-price">${formatPrice(prod.price)}</span>
      <button class="btn-add-cosmetic" onclick="addToCart('${prod.id}', '${prod.title.replace(/'/g, "\\'")}', ${prod.price}, '${prod.icon}', 'cosmetic')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Add to Bag
      </button>
    </div>
  `).join('');

  if (isHomepage) {
    let seeMoreWrap = document.getElementById('cosmetics-see-more-wrap');
    if (!seeMoreWrap) {
      seeMoreWrap = document.createElement('div');
      seeMoreWrap.id = 'cosmetics-see-more-wrap';
      seeMoreWrap.className = 'gallery-see-more-wrap';
      container.parentNode.insertBefore(seeMoreWrap, container.nextSibling);
    }
    seeMoreWrap.style.display = 'flex';
    seeMoreWrap.style.flexWrap = 'wrap';
    seeMoreWrap.style.gap = '14px';

    if (isExpanded) {
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleCosmeticsExpand()">
          <span>See Less Products</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: rotate(180deg);">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <a href="products.html" class="btn-outline-gold" target="_blank" rel="noopener noreferrer" style="padding: 12px 28px; font-size: 0.95rem;">
          <span>Explore All Products & Couture →</span>
        </a>
      `;
    } else {
      const remaining = SALOON_DATA.cosmetics.length - initialLimit;
      seeMoreWrap.innerHTML = `
        <button class="btn-see-more" onclick="toggleCosmeticsExpand()">
          <span>See More Products (${remaining} More)</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <a href="products.html" class="btn-outline-gold" target="_blank" rel="noopener noreferrer" style="padding: 12px 28px; font-size: 0.95rem;">
          <span>Explore All Products & Couture →</span>
        </a>
      `;
    }
  }
}

function toggleCosmeticsExpand() {
  AppState.cosmeticsExpanded = !AppState.cosmeticsExpanded;
  renderCosmeticsSale();
  if (!AppState.cosmeticsExpanded) {
    const container = document.getElementById('cosmetics-grid');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
window.toggleCosmeticsExpand = toggleCosmeticsExpand;

// ==========================================================================
// CART FUNCTIONALITY
// ==========================================================================

function loadPreferencesFromStorage() {
  try {
    const savedCurrency = localStorage.getItem('khans_saloon_currency');
    if (savedCurrency && AppState.exchangeRates[savedCurrency]) {
      AppState.currency = savedCurrency;
      const currencySelect = document.getElementById('currency-selector');
      if (currencySelect) currencySelect.value = savedCurrency;
    }
  } catch (e) {
    console.error('Error loading preferences', e);
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('khans_saloon_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('khans_saloon_cart', JSON.stringify(AppState.cart));
  } catch (e) {
    console.error('Error saving cart', e);
  }
}

// Multi-Tab Synchronization
window.addEventListener('storage', (e) => {
  if (e.key === 'khans_saloon_cart') {
    loadCartFromStorage();
    updateCartBadge();
    renderCartDrawer();
  }
  if (e.key === 'khans_saloon_currency') {
    AppState.currency = e.newValue || 'PKR';
    const sel = document.getElementById('currency-selector');
    if (sel) sel.value = AppState.currency;
    renderBridalDresses('all');
    renderJewelryBoutique('all');
    renderCosmeticsSale();
    renderCartDrawer();
  }
});

function addToCart(id, title, price, image, type) {
  const existing = AppState.cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    AppState.cart.push({
      id,
      title,
      price,
      image,
      type,
      quantity: 1
    });
  }
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added "${title}" to your cart! ✨`);
}

function updateCartQuantity(id, delta) {
  const item = AppState.cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart = AppState.cart.filter(i => i.id !== id);
  }
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function removeFromCart(id) {
  AppState.cart = AppState.cart.filter(i => i.id !== id);
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
  showToast("Item removed from cart");
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge-count');
  if (badge) {
    const totalCount = AppState.cart.reduce((sum, i) => sum + i.quantity, 0);
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  }
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById('cart-items-list');
  const subtotalElem = document.getElementById('cart-subtotal');
  const discountElem = document.getElementById('cart-discount');
  const totalElem = document.getElementById('cart-total');

  if (!itemsContainer) return;

  if (AppState.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h4>Your Bag is Empty</h4>
        <p style="font-size: 0.85rem; margin-top: 6px;">Explore our royal bridal jewelry, handcrafted couture, or cosmetics to add items.</p>
      </div>
    `;
    if (subtotalElem) subtotalElem.textContent = formatPrice(0);
    if (discountElem) discountElem.textContent = formatPrice(0);
    if (totalElem) totalElem.textContent = formatPrice(0);
    return;
  }

  itemsContainer.innerHTML = AppState.cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.title}" />
      </div>
      <div class="cart-item-details">
        <h5 class="cart-item-name">${item.title}</h5>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-qty-control">
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove">✕</button>
    </div>
  `).join('');

  const rawSubtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discountAmount = Math.round(rawSubtotal * (AppState.discountPercent / 100));
  const finalTotal = rawSubtotal - discountAmount;

  if (subtotalElem) subtotalElem.textContent = formatPrice(rawSubtotal);
  if (discountElem) discountElem.textContent = `- ${formatPrice(discountAmount)} (${AppState.discountPercent}%)`;
  if (totalElem) totalElem.textContent = formatPrice(finalTotal);
}

function toggleCartDrawer(show) {
  const overlay = document.getElementById('cart-backdrop') || document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (show) {
    renderCartDrawer();
    if (overlay) overlay.classList.add('active');
    if (drawer) drawer.classList.add('active');
  } else {
    if (overlay) overlay.classList.remove('active');
    if (drawer) drawer.classList.remove('active');
  }
}

function applyCouponCode() {
  const input = document.getElementById('cart-coupon-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'KHAN2026') {
    AppState.discountPercent = 15;
    AppState.activeCoupon = 'KHAN2026';
    showToast('Promo code KHAN2026 applied! 15% discount granted 🎉');
    renderCartDrawer();
  } else if (code === 'BRIDAL20') {
    AppState.discountPercent = 20;
    AppState.activeCoupon = 'BRIDAL20';
    showToast('VIP code BRIDAL20 applied! 20% discount granted ✨');
    renderCartDrawer();
  } else {
    showToast('Invalid promo code. Use KHAN2026 for 15% OFF');
  }
}

function copyCoupon(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Code "${code}" copied to clipboard! Paste in checkout.`);
  }).catch(() => {
    showToast(`Code: ${code}`);
  });
}

// Order via WhatsApp
function checkoutViaWhatsApp() {
  if (AppState.cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  const rawSubtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discountAmount = Math.round(rawSubtotal * (AppState.discountPercent / 100));
  const finalTotal = rawSubtotal - discountAmount;

  let message = `*Order Inquiry - Khan's Saloon & Bridal Couture*%0A%0A`;
  message += `*Items Ordered:*%0A`;
  AppState.cart.forEach((item, index) => {
    message += `${index + 1}. ${item.title} (x${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString()}%0A`;
  });

  message += `%0A*Subtotal:* Rs. ${rawSubtotal.toLocaleString()}%0A`;
  if (AppState.discountPercent > 0) {
    message += `*Discount (${AppState.activeCoupon} - ${AppState.discountPercent}%):* -Rs. ${discountAmount.toLocaleString()}%0A`;
  }
  message += `*Total Order Value:* Rs. ${finalTotal.toLocaleString()}%0A%0A`;
  message += `Please confirm my order and share bank transfer / Cash-on-Delivery details. Thank you!`;

  const waUrl = `https://wa.me/923001234567?text=${message}`;
  window.open(waUrl, '_blank');
}

// ==========================================================================
// MODALS LOGIC
// ==========================================================================

function openBookingModal(serviceName = '', price = '') {
  const modal = document.getElementById('booking-modal');
  const serviceSelect = document.getElementById('book-service-select');
  if (serviceSelect && serviceName) {
    // If exact match doesn't exist, set the input or create option
    let found = false;
    for (let opt of serviceSelect.options) {
      if (opt.value.includes(serviceName) || serviceName.includes(opt.value)) {
        opt.selected = true;
        found = true;
        break;
      }
    }
    if (!found) {
      const newOpt = new Option(`${serviceName} (${price})`, serviceName, true, true);
      serviceSelect.add(newOpt);
    }
  }
  modal.classList.add('active');
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.remove('active');
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('book-name').value;
  const phone = document.getElementById('book-phone').value;
  const service = document.getElementById('book-service-select').value;
  const branch = document.getElementById('book-branch').value;
  const date = document.getElementById('book-date').value;
  const time = document.getElementById('book-time').value;

  const bookingId = 'KHAN-' + Math.floor(100000 + Math.random() * 900000);

  closeBookingModal();
  const confirmMsg = `*Appointment Confirmation - Khan's Saloon*%0A%0A*Ref:* ${bookingId}%0A*Client:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service}%0A*Branch:* ${branch}%0A*Date:* ${date} at ${time}%0A%0APlease confirm my appointment slot. Thank you!`;

  showBookingSuccessDialog(bookingId, name, service, branch, date, time, confirmMsg);
}

function showBookingSuccessDialog(bookingId, name, service, branch, date, time, waMessage) {
  const modal = document.getElementById('lightbox-modal');
  const content = document.getElementById('lightbox-content');
  if (!content) return;

  content.innerHTML = `
    <div style="padding: 36px 28px; text-align: center; width: 100%; color: #FFF;">
      <div style="width: 70px; height: 70px; background: rgba(197, 155, 88, 0.2); border: 2px solid var(--gold-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem;">
        ✨
      </div>
      <span class="badge-tag badge-gold-foil" style="margin-bottom: 12px;">Booking Reserved</span>
      <h3 style="font-family: var(--font-serif-display); font-size: 1.8rem; margin-bottom: 8px;">Appointment Confirmed</h3>
      <p style="color: var(--gold-primary); font-weight: 600; margin-bottom: 16px;">Booking Ref: #${bookingId}</p>
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(197,155,88,0.3); border-radius: 10px; padding: 16px; margin: 0 auto 24px; max-width: 480px; text-align: left; font-size: 0.9rem; line-height: 1.7;">
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Branch:</strong> ${branch}</p>
        <p><strong>Appointment:</strong> ${date} at ${time}</p>
      </div>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <button class="btn-whatsapp" onclick="window.open('https://wa.me/923001234567?text=${waMessage}', '_blank')">
          Send Booking to WhatsApp Concierge
        </button>
        <button class="btn-outline-gold" onclick="closeLightbox()">
          Done
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// Lightbox for brides
function openLightbox(brideId) {
  const bride = SALOON_DATA.brides.find(b => b.id === brideId);
  if (!bride) return;

  const modal = document.getElementById('lightbox-modal');
  const content = document.getElementById('lightbox-content');
  if (!content) return;

  content.innerHTML = `
    <div class="lightbox-img-wrap">
      <img src="${bride.image}" alt="${bride.name}" />
    </div>
    <div class="lightbox-details">
      <span class="badge-tag badge-gold-foil" style="align-self: flex-start; margin-bottom: 12px;">${bride.ceremony}</span>
      <h3>${bride.name}</h3>
      <p style="color: var(--gold-primary); font-weight: 600; font-size: 0.95rem;">${bride.makeupArtist}</p>
      <div style="border-top: 1px solid rgba(255,255,255,0.15); border-bottom: 1px solid rgba(255,255,255,0.15); padding: 14px 0; margin: 16px 0;">
        <p style="margin-bottom: 8px;"><strong>Makeup Details:</strong> ${bride.lookSummary}</p>
        <p style="margin-bottom: 8px;"><strong>Bridal Dress:</strong> ${bride.dressDetails}</p>
        <p style="margin-bottom: 0;"><strong>Royal Jewelry:</strong> ${bride.jewelryDetails}</p>
      </div>
      <div style="display: flex; gap: 12px; margin-top: 12px;">
        <button class="btn-gold" style="flex: 1;" onclick="closeLightbox(); openBookingModal('Bridal Look - ${bride.name}', 'Rs. 25,000')">
          Book This Bridal Look
        </button>
        <button class="btn-whatsapp" onclick="window.open('https://wa.me/923001234567?text=Hi%20Khan%27s%20Saloon,%20I%20am%20interested%20in%20the%20${encodeURIComponent(bride.name)}%20look.', '_blank')">
          WhatsApp
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox-modal').classList.remove('active');
}

// Quick View for Jewelry
function openJewelryQuickView(jwlId) {
  const item = SALOON_DATA.jewelry.find(j => j.id === jwlId);
  if (!item) return;

  const modal = document.getElementById('lightbox-modal');
  const content = document.getElementById('lightbox-content');
  if (!content) return;

  content.innerHTML = `
    <div class="lightbox-img-wrap">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="lightbox-details">
      <span class="badge-tag badge-gold-foil" style="align-self: flex-start; margin-bottom: 12px;">${item.badge}</span>
      <h3>${item.title}</h3>
      <div class="jewelry-rating" style="margin: 8px 0 14px;">
        <span>★★★★★</span>
        <span style="color: #BFB5AA; font-size: 0.85rem;">(${item.reviewsCount} customer reviews) • Authentic 22K Gold Plated</span>
      </div>
      <p style="font-size: 1.6rem; font-weight: 700; color: #FFF; margin-bottom: 12px;">${formatPrice(item.price)}</p>
      <p style="color: #BFB5AA; line-height: 1.6; margin-bottom: 24px;">${item.desc}</p>
      <div style="display: flex; gap: 12px;">
        <button class="btn-gold" style="flex: 1;" onclick="closeLightbox(); addToCart('${item.id}', '${item.title.replace(/'/g, "\\'")}', ${item.price}, '${item.image}', 'jewelry')">
          Add to Bag (${formatPrice(item.price)})
        </button>
        <button class="btn-whatsapp" onclick="window.open('https://wa.me/923001234567?text=Inquiring%20about%20${encodeURIComponent(item.title)}%20(${item.priceFormatted})', '_blank')">
          Inquire WhatsApp
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// Quick View for Bridal Dresses
function openDressQuickView(dressId) {
  const dress = SALOON_DATA.dresses.find(d => d.id === dressId);
  if (!dress) return;

  const modal = document.getElementById('lightbox-modal');
  const content = document.getElementById('lightbox-content');
  if (!content) return;

  content.innerHTML = `
    <div class="lightbox-img-wrap">
      <img src="${dress.image}" alt="${dress.title}" />
    </div>
    <div class="lightbox-details">
      <span class="badge-tag badge-couture-spec" style="align-self: flex-start; margin-bottom: 10px;">
        ${dress.specialization}
      </span>
      <h3>${dress.title}</h3>
      <p style="font-size: 1.6rem; font-weight: 700; color: #FFF; margin: 10px 0 14px;">${formatPrice(dress.price)}</p>
      
      <div style="border-top: 1px solid rgba(255,255,255,0.15); border-bottom: 1px solid rgba(255,255,255,0.15); padding: 12px 0; margin-bottom: 16px; font-size: 0.88rem; line-height: 1.6;">
        <p style="margin-bottom: 6px;"><strong>Fabric:</strong> ${dress.fabric}</p>
        <p style="margin-bottom: 6px;"><strong>Hand Embroidery:</strong> ${dress.work}</p>
        <p style="margin-bottom: 6px;"><strong>Includes:</strong> ${dress.includes}</p>
        <p style="margin-bottom: 0;"><strong>Tailoring & Delivery:</strong> <span style="color: var(--gold-primary); font-weight: 600;">${dress.delivery}</span></p>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn-gold" style="flex: 1; min-width: 140px;" onclick="closeLightbox(); addToCart('${dress.id}', '${dress.title.replace(/'/g, "\\'")}', ${dress.price}, '${dress.image}', 'dress')">
          Add to Bag
        </button>
        <button class="btn-outline-gold" style="flex: 1; min-width: 140px;" onclick="closeLightbox(); openBookingModal('Bridal Couture Fitting - ${dress.title}', '${formatPrice(dress.price)}')">
          Custom Fit Booking
        </button>
        <button class="btn-whatsapp" onclick="window.open('https://wa.me/923001234567?text=Hi%20Khan%27s%20Saloon,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(dress.title)}%20(${dress.priceFormatted}).', '_blank')">
          WhatsApp
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// Dress Fitting Consultation Modal
function openDressConsultModal(dressId) {
  const dress = SALOON_DATA.dresses.find(d => d.id === dressId);
  if (!dress) return;

  openBookingModal(`Bridal Couture Fitting - ${dress.title}`, dress.priceFormatted);
}

// 6. RENDER BRIDE TESTIMONIALS
function renderBrideTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container || !SALOON_DATA.reviews) return;

  container.innerHTML = SALOON_DATA.reviews.map(rev => `
    <div class="testimonial-card">
      <div class="testimonial-header">
        <img src="${rev.image}" alt="${rev.name}" class="testimonial-avatar" loading="lazy" />
        <div class="testimonial-author-info">
          <h4 class="testimonial-name">${rev.name}</h4>
          <span class="testimonial-location">${rev.city} • ${rev.date}</span>
          <div class="testimonial-rating">★★★★★</div>
        </div>
        <span class="badge-tag badge-gold-foil testimonial-badge">${rev.tag}</span>
      </div>
      <blockquote class="testimonial-text">
        "${rev.review}"
      </blockquote>
      <div class="testimonial-ceremony">
        <span>Ceremony:</span> <strong>${rev.ceremony}</strong>
      </div>
    </div>
  `).join('');
}

// 7. RENDER FAQS & ACCORDION
function renderFaqs() {
  const container = document.getElementById('faq-accordion-list');
  if (!container || !SALOON_DATA.faqs) return;

  container.innerHTML = SALOON_DATA.faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <button class="faq-question-btn" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span class="faq-q-text">${faq.question}</span>
        <span class="faq-chevron">▾</span>
      </button>
      <div class="faq-answer-panel" style="${index === 0 ? 'max-height: 200px;' : ''}">
        <p class="faq-a-text">${faq.answer}</p>
      </div>
    </div>
  `).join('');

  setupFaqAccordion();
}

function setupFaqAccordion() {
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const panel = item.querySelector('.faq-answer-panel');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        const otherPanel = other.querySelector('.faq-answer-panel');
        if (otherPanel) otherPanel.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

// 8. INTERACTIVE GLOBAL SEARCH MODAL
function openSearchModal() {
  const modal = document.getElementById('search-modal');
  if (!modal) return;
  modal.classList.add('active');
  const input = document.getElementById('search-global-input');
  if (input) {
    input.value = '';
    input.focus();
    handleSearchInput('');
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.remove('active');
}

function handleSearchInput(query) {
  const resultsContainer = document.getElementById('search-results-list');
  const countElem = document.getElementById('search-results-count');
  if (!resultsContainer) return;

  const q = (query || '').trim().toLowerCase();
  
  // Aggregate items across all catalogs
  const allItems = [];

  // Services
  SALOON_DATA.services.forEach(cat => {
    cat.items.forEach(srv => {
      allItems.push({
        type: 'Salon Service',
        typeBadge: 'badge-gold-foil',
        title: srv.title,
        desc: srv.desc,
        priceFormatted: srv.priceText,
        image: srv.image,
        actionText: 'Book Service',
        action: () => { closeSearchModal(); openBookingModal(srv.title, srv.priceText); }
      });
    });
  });

  // Real Brides
  SALOON_DATA.brides.forEach(b => {
    allItems.push({
      type: 'Bridal Look',
      typeBadge: 'badge-emerald',
      title: b.name,
      desc: `${b.ceremony} • ${b.lookSummary}`,
      priceFormatted: 'Rs. 25,000',
      image: b.image,
      actionText: 'View Look',
      action: () => { closeSearchModal(); openLightbox(b.id); }
    });
  });

  // Dresses
  SALOON_DATA.dresses.forEach(d => {
    allItems.push({
      type: 'Bridal Couture',
      typeBadge: 'badge-couture-spec',
      title: d.title,
      desc: `${d.specialization} • ${d.fabric}`,
      priceFormatted: formatPrice(d.price),
      image: d.image,
      actionText: 'Quick View',
      action: () => { closeSearchModal(); openDressQuickView(d.id); }
    });
  });

  // Jewelry
  SALOON_DATA.jewelry.forEach(j => {
    allItems.push({
      type: 'Royal Jewelry',
      typeBadge: 'badge-gold-foil',
      title: j.title,
      desc: j.desc,
      priceFormatted: formatPrice(j.price),
      image: j.image,
      actionText: 'Add to Bag',
      action: () => { closeSearchModal(); addToCart(j.id, j.title, j.price, j.image, 'jewelry'); }
    });
  });

  // Cosmetics
  SALOON_DATA.cosmetics.forEach(c => {
    allItems.push({
      type: 'Khan\'s Beauty',
      typeBadge: 'badge-emerald',
      title: c.title,
      desc: c.desc,
      priceFormatted: formatPrice(c.price),
      image: c.icon,
      actionText: 'Add to Bag',
      action: () => { closeSearchModal(); addToCart(c.id, c.title, c.price, c.icon, 'cosmetic'); }
    });
  });

  const matched = q === '' 
    ? allItems.slice(0, 6) 
    : allItems.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) || 
        item.type.toLowerCase().includes(q)
      );

  if (countElem) {
    countElem.textContent = q === '' 
      ? `Featured Luxury Highlights (${matched.length})` 
      : `Found ${matched.length} result${matched.length === 1 ? '' : 's'} for "${query}"`;
  }

  if (matched.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-empty-state">
        <p>No matches found for "<strong>${query}</strong>".</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Try searching for "Zardozi", "Mehndi", "Balayage", "Kundan", "Facial", or "Mascara".</p>
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = matched.map((item, idx) => `
    <div class="search-result-row">
      <img src="${item.image}" alt="${item.title}" class="search-result-thumb" />
      <div class="search-result-info">
        <div class="search-result-header">
          <span class="badge-tag ${item.typeBadge}">${item.type}</span>
          <span class="search-result-price">${item.priceFormatted}</span>
        </div>
        <h5 class="search-result-title">${item.title}</h5>
        <p class="search-result-desc">${item.desc.substring(0, 85)}...</p>
      </div>
      <button class="btn-gold search-result-btn" data-search-idx="${idx}">
        ${item.actionText}
      </button>
    </div>
  `).join('');

  resultsContainer.querySelectorAll('.search-result-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-search-idx'), 10);
      if (matched[idx] && matched[idx].action) {
        matched[idx].action();
      }
    });
  });
}

// 9. BESPOKE ROYAL CHECKOUT MODAL
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast("Your cart is empty! Add jewelry, couture, or cosmetics first.");
    return;
  }
  toggleCartDrawer(false);

  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  const rawSubtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discountAmount = Math.round(rawSubtotal * (AppState.discountPercent / 100));
  const finalTotal = rawSubtotal - discountAmount;

  const summaryElem = document.getElementById('checkout-order-summary');
  if (summaryElem) {
    summaryElem.innerHTML = `
      <div class="checkout-items-preview">
        ${AppState.cart.map(item => `
          <div class="checkout-preview-row">
            <span>${item.title} × ${item.quantity}</span>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
          </div>
        `).join('')}
      </div>
      <div class="checkout-totals">
        <div class="preview-line"><span>Subtotal:</span> <span>${formatPrice(rawSubtotal)}</span></div>
        ${AppState.discountPercent > 0 ? `<div class="preview-line discount"><span>Promo (${AppState.activeCoupon}):</span> <span>-${formatPrice(discountAmount)}</span></div>` : ''}
        <div class="preview-line total"><span>Total Payable:</span> <span>${formatPrice(finalTotal)}</span></div>
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('checkout-name').value;
  const phone = document.getElementById('checkout-phone').value;
  const city = document.getElementById('checkout-city').value;
  const address = document.getElementById('checkout-address').value;
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'Cash on Delivery';

  const orderId = 'ORD-KHAN-' + Math.floor(100000 + Math.random() * 900000);
  const rawSubtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discountAmount = Math.round(rawSubtotal * (AppState.discountPercent / 100));
  const finalTotal = rawSubtotal - discountAmount;

  // Build WhatsApp receipt message
  let message = `*Royal Order Invoice - Khan's Saloon & Bridal Couture*%0A`;
  message += `*Order Ref:* ${orderId}%0A`;
  message += `*Customer:* ${name}%0A`;
  message += `*Phone:* ${phone}%0A`;
  message += `*Delivery City:* ${city}%0A`;
  message += `*Address:* ${address}%0A`;
  message += `*Payment Mode:* ${paymentMethod}%0A%0A`;
  message += `*Items Ordered:*%0A`;
  AppState.cart.forEach((item, idx) => {
    message += `${idx + 1}. ${item.title} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}%0A`;
  });
  message += `%0A*Final Total:* ${formatPrice(finalTotal)}%0A%0A`;
  message += `Kindly confirm my order dispatch. Thank you!`;

  closeCheckoutModal();

  // Clear cart
  AppState.cart = [];
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();

  // Show celebratory confirmation dialog
  showOrderSuccessDialog(orderId, name, phone, paymentMethod, message);
}

function showOrderSuccessDialog(orderId, name, phone, paymentMethod, waMessage) {
  const modal = document.getElementById('lightbox-modal');
  const content = document.getElementById('lightbox-content');
  if (!content) return;

  content.innerHTML = `
    <div style="padding: 36px 28px; text-align: center; width: 100%; color: #FFF;">
      <div style="width: 70px; height: 70px; background: rgba(197, 155, 88, 0.2); border: 2px solid var(--gold-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem;">
        👑
      </div>
      <span class="badge-tag badge-gold-foil" style="margin-bottom: 12px;">Order Placed Successfully</span>
      <h3 style="font-family: var(--font-serif-display); font-size: 1.8rem; margin-bottom: 8px;">Mubarak! Order #${orderId}</h3>
      <p style="color: #D6CEBE; font-size: 0.95rem; max-width: 500px; margin: 0 auto 20px; line-height: 1.6;">
        Thank you, <strong>${name}</strong>. Your order has been recorded in Khan's Royal Concierge registry. We will contact you at <strong>${phone}</strong> via WhatsApp for dispatch confirmation.
      </p>
      <div style="background: rgba(255,255,255,0.06); border: 1px solid rgba(197,155,88,0.3); border-radius: 10px; padding: 16px; margin: 0 auto 24px; max-width: 480px; text-align: left;">
        <p style="margin-bottom: 6px; font-size: 0.88rem;"><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p style="margin-bottom: 0; font-size: 0.88rem;"><strong>Delivery ETA:</strong> 2 - 4 Business Days (Custom couture 3-5 weeks)</p>
      </div>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <button class="btn-whatsapp" onclick="window.open('https://wa.me/923001234567?text=${waMessage}', '_blank')">
          Open WhatsApp Confirmation Receipt
        </button>
        <button class="btn-outline-gold" onclick="closeLightbox()">
          Continue Browsing
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

// Event Listeners
function setupEventListeners() {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('main-nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Currency Switcher
  const currencySelect = document.getElementById('currency-selector');
  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      AppState.currency = e.target.value;
      try {
        localStorage.setItem('khans_saloon_currency', e.target.value);
      } catch (err) {}
      renderBridalDresses('all');
      renderJewelryBoutique('all');
      renderCosmeticsSale();
      renderCartDrawer();
      showToast(`Currency switched to ${AppState.currency}`);
    });
  }

  // Bridal Gallery Filter Tabs
  document.querySelectorAll('.filter-tab-btn[data-target="bridal"]').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-tab-btn[data-target="bridal"]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderBridalGallery(this.getAttribute('data-filter'));
    });
  });

  // Couture Filter Tabs
  document.querySelectorAll('.filter-tab-btn[data-target="couture"]').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-tab-btn[data-target="couture"]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderBridalDresses(this.getAttribute('data-filter'));
    });
  });

  // Jewelry Filter Tabs
  document.querySelectorAll('.filter-tab-btn[data-target="jewelry"]').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-tab-btn[data-target="jewelry"]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderJewelryBoutique(this.getAttribute('data-filter'));
    });
  });

  // Category Quick Icon smooth clicks
  document.querySelectorAll('.category-chip-item').forEach(chip => {
    chip.addEventListener('click', function() {
      const targetId = this.getAttribute('data-scroll');
      if (targetId) {
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          targetElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetElem.style.transition = 'all 0.5s ease';
          targetElem.style.boxShadow = '0 0 35px rgba(197, 155, 88, 0.6)';
          targetElem.style.transform = 'scale(1.01)';
          setTimeout(() => {
            targetElem.style.boxShadow = '';
            targetElem.style.transform = '';
          }, 1800);
        }
      }
    });
  });

  // Global search input listener
  const searchInput = document.getElementById('search-global-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearchInput(e.target.value);
    });
  }

  // Close modals on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeLightbox();
      toggleCartDrawer(false);
      closeSearchModal();
      closeCheckoutModal();
    }
  });
}

