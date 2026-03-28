import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Menu Data
const menuData = {
  coffee: [
    { name: 'Classic Hot Coffee', price: '₹129', desc: 'Robust and warm brew for a cozy start.' },
    { name: 'Artisanal Latte', price: '₹189', desc: 'Silky espresso with premium micro-foam.' },
    { name: 'Classic Cold Coffee', price: '₹189', desc: 'Thick, creamy and perfectly chilled.' },
    { name: 'Masala Tea', price: '₹69', desc: 'Indian spices brewed to perfection.' },
    { name: 'Iced Americano', price: '₹159', desc: 'Bold espresso over crystal clear ice.' },
    { name: 'Hazelnut Frappe', price: '₹229', desc: 'Blended coffee with nutty hazelnut syrup.' }
  ],
  pizza: [
    { name: 'Classic Margherita (12")', price: '₹469', desc: 'Double cheese with fresh basil and tomato.' },
    { name: 'Smoky Tandoori Paneer', price: '₹399', desc: 'Spiced paneer with onions and smoky sauce.' },
    { name: 'Double Cheese Indulgence', price: '₹599', desc: 'A cheese lover\'s paradise with four varieties.' },
    { name: 'Peri Peri Veg Blaze', price: '₹339', desc: 'Hot peri-peri sauce with garden fresh veggies.' },
    { name: 'Farmhouse Classic', price: '₹259', desc: 'Loaded with capsicum, onion, and mushrooms.' },
    { name: 'Royal Veg Supreme', price: '₹899', desc: 'The ultimate fully loaded pizza experience.' }
  ],
  pasta: [
    { name: 'White Sauce Pasta', price: '₹239', desc: 'Creamy bechamel sauce with herbs and cheese.' },
    { name: 'Red Sauce Pasta', price: '₹219', desc: 'Zesty tomato base with fresh garlic and chili.' },
    { name: 'Mix Sauce Pasta', price: '₹259', desc: 'The best of both worlds – pink and creamy.' },
    { name: 'Cheese Maggi', price: '₹129', desc: 'Elevated comfort food with lots of cheese.' },
    { name: 'Veg Sandwich', price: '₹149', desc: 'Crispy toasted bread with fresh vegetable filling.' },
    { name: 'Bun Maska', price: '₹89', desc: 'Classic soft bun with a generous layer of butter.' }
  ],
  beverages: [
    { name: 'Blue Lagoon Mocktail', price: '₹199', desc: 'Refreshing blue citrus with zesty lemon.' },
    { name: 'Virgin Mojito', price: '₹199', desc: 'Classic mint and lime refresher.' },
    { name: 'Watermelon Mojito', price: '₹219', desc: 'Summer in a glass with fresh fruit hints.' },
    { name: 'Oreo Shake', price: '₹259', desc: 'Rich chocolate shake with crushed Oreo cookies.' },
    { name: 'Kitkat Shake', price: '₹259', desc: 'Blended Kitkat bars with vanilla ice cream.' },
    { name: 'Strawberry Shake', price: '₹209', desc: 'Smooth and fruity with real berry swirls.' }
  ]
};

// --- DOM Selections & Initialization ---

function init() {
  const menuGrid = document.getElementById('menu-items');
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const orderForm = document.getElementById('order-form');

  if (!menuGrid || !tabButtons.length) return;

  function renderMenu(category) {
    const items = menuData[category] || [];
    menuGrid.innerHTML = items.map(item => `
      <div class="menu-item menu-item-animate">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
        </div>
        <div class="item-price">${item.price}</div>
      </div>
    `).join('');
    
    // Animate each item individually (not with global selector)
    const newItems = menuGrid.querySelectorAll('.menu-item-animate');
    newItems.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 80);
    });
  }

  // Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.category);
    });
  });

  // Initial Render
  renderMenu('coffee');

  // Navbar Effects
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Reveal Animations
  const revealElements = document.querySelectorAll('.fade-up, .fade-in, .fade-in-left, .fade-in-right');
  revealElements.forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 0,
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Hero Parallax
  gsap.to('.hero-img', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    scale: 1.2
  });

  // WhatsApp Form
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const details = document.getElementById('order_details').value;
      const type = document.querySelector('input[name="type"]:checked').value;
      
      const message = `*New Order from Website*%0A%0A` +
                      `*Name:* ${name}%0A` +
                      `*Phone:* ${phone}%0A` +
                      `*Type:* ${type}%0A` +
                      `*Order Details:*%0A${details}%0A%0A` +
                      `_Sent from The Fika Spot Website_`;
      
      window.open(`https://wa.me/918000443431?text=${message}`, '_blank');
      alert('Taking you to WhatsApp to complete your order...');
      orderForm.reset();
    });
  }

  // Mobile Menu — class-based toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

// Start everything
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
