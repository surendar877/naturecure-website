// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== SEARCH =====
function doSearch() {
  const val = document.getElementById('searchInput')?.value?.trim().toLowerCase();
  if (!val) return;
  window.location.href = `remedies.html?search=${encodeURIComponent(val)}`;
}
document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

// ===== HOMEPAGE REMEDIES DATA =====
const homeRemedies = [
  {
    emoji: '🧄',
    tag: 'Ayurveda',
    title: 'Garlic Honey Mix',
    condition: 'High Blood Pressure',
    desc: 'Raw garlic with raw honey taken daily on empty stomach has been shown to significantly reduce systolic and diastolic blood pressure.',
    ingredients: ['Raw Garlic', 'Raw Honey', 'Morning Routine']
  },
  {
    emoji: '🍋',
    tag: 'Home Remedy',
    title: 'Ginger-Lemon-Honey Tea',
    condition: 'Cold & Cough',
    desc: 'This powerful anti-inflammatory combination soothes throat, fights infection and clears congestion naturally within 2–3 days.',
    ingredients: ['Fresh Ginger', 'Lemon', 'Honey', 'Warm Water']
  },
  {
    emoji: '🌿',
    tag: 'Herb',
    title: 'Bitter Gourd Juice',
    condition: 'Type 2 Diabetes',
    desc: 'Karela contains polypeptide-p that mimics insulin and helps regulate blood sugar levels. Proven in multiple studies.',
    ingredients: ['Bitter Gourd', 'Fenugreek', 'Empty Stomach']
  },
  {
    emoji: '🌸',
    tag: 'Yoga',
    title: 'Pranayama Routine',
    condition: 'Anxiety & Stress',
    desc: 'Anulom Vilom and Bhramari pranayama for 20 minutes daily activates the parasympathetic nervous system, melting anxiety.',
    ingredients: ['Anulom Vilom', 'Bhramari', 'Meditation']
  },
  {
    emoji: '💛',
    tag: 'Spice',
    title: 'Golden Milk (Haldi Doodh)',
    condition: 'Inflammation & Joint Pain',
    desc: 'Curcumin in turmeric is a potent anti-inflammatory. Combined with black pepper and warm milk it absorbs 2000% better.',
    ingredients: ['Turmeric', 'Black Pepper', 'Warm Milk', 'Ginger']
  },
  {
    emoji: '🌱',
    tag: 'Herb',
    title: 'Spearmint Tea',
    condition: 'PCOS & Hormones',
    desc: 'Drinking 2 cups of spearmint tea daily has been clinically proven to reduce excess androgens in women with PCOS.',
    ingredients: ['Spearmint Leaves', 'Hot Water', '2x Daily']
  }
];

const grid = document.getElementById('remediesGrid');
if (grid) {
  homeRemedies.forEach(r => {
    grid.innerHTML += `
      <div class="remedy-card">
        <div class="remedy-header">
          <div class="remedy-emoji">${r.emoji}</div>
          <span class="remedy-tag">${r.tag}</span>
        </div>
        <div class="remedy-body">
          <p class="remedy-condition">${r.condition}</p>
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
          <div class="remedy-ingredients">
            ${r.ingredients.map(i => `<span>${i}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  });
}

// ===== FILTER BUTTONS (used in sub-pages) =====
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('[data-category]');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
initFilters();

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#cname').value;
    const successMsg = document.getElementById('formSuccess');
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.textContent = `Thank you ${name}! We'll respond within 24 hours.`;
      form.reset();
      setTimeout(() => successMsg.style.display = 'none', 5000);
    }
  });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cat-card, .remedy-card, .testi-card, .step, .herb-card, .exercise-card, .diet-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
