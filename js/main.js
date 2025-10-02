// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function(){
  // Hamburger menu toggle
  var btn = document.querySelector('.hamburger');
  var nav = document.querySelector('.site-nav');
  if(btn && nav) {
    btn.addEventListener('click', function(){
      nav.classList.toggle('open');
      btn.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  var navLinks = document.querySelectorAll('.site-nav a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('open');
      btn.classList.remove('active');
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Gallery filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // Pricing calculator
  function updateCalculator() {
    const roomType = document.getElementById('room-type');
    const duration = document.getElementById('duration');
    const mealPlan = document.getElementById('meal-plan');
    const laundry = document.getElementById('laundry');
    const parking = document.getElementById('parking');

    if (!roomType || !duration || !mealPlan) return;

    const roomCost = parseInt(roomType.value) || 0;
    const months = parseInt(duration.value) || 1;
    const mealCost = parseInt(mealPlan.value) || 0;
    
    let serviceCost = 0;
    if (laundry && laundry.checked) serviceCost += 500;
    if (parking && parking.checked) serviceCost += 300;

    const monthlyTotal = roomCost + mealCost + serviceCost;
    const grandTotal = monthlyTotal * months;

    // Update display
    document.getElementById('room-cost').textContent = '₹' + roomCost.toLocaleString();
    document.getElementById('meal-cost').textContent = '₹' + mealCost.toLocaleString();
    document.getElementById('service-cost').textContent = '₹' + serviceCost.toLocaleString();
    document.getElementById('monthly-total').textContent = '₹' + monthlyTotal.toLocaleString();
    document.getElementById('grand-total').textContent = '₹' + grandTotal.toLocaleString();
  }

  // Add event listeners for calculator inputs
  const calcInputs = ['room-type', 'duration', 'meal-plan', 'laundry', 'parking'];
  calcInputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('change', updateCalculator);
    }
  });

  // Initialize calculator
  updateCalculator();

  // Update current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Add entrance animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe sections for animations
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});