'use strict';

// Event handlers
const container = document.querySelector('.container');
const loader = document.querySelector('.loader');
const header = document.querySelector('.header');
const topHeader = document.querySelector('.top--header');
const hamsburger = document.querySelector('.ham--icon');
const cancelOpt = document.querySelector('.cancel--icon');
const listItems = document.querySelector('ul');

let clicked;
// loader function
// setTimeout(() => {
//   loader.classList.add('hidden');
//   container.classList.remove('hidden');
// }, 5000);

// Helper functions
const hamsburg = function (hamsDisplay, cancelDisplay, listDisplay) {
  hamsburger.style.display = hamsDisplay;
  cancelOpt.style.display = cancelDisplay;
  listItems.style.display = listDisplay;
};

// Sticky navigation: Intersection Observer API
const navHeight = topHeader.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) topHeader.classList.add('sticky');
  else topHeader.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Hamsburger functionality
function handleViewportChange() {
  const mediaQueryList = window.matchMedia('(max-width: 800px)');
  if (mediaQueryList.matches && clicked) {
    listItems.style.display = 'block';
  }
  if (!mediaQueryList) return (listItems.style.display = 'flex');
}
handleViewportChange();
// Hamsburger event handlers
hamsburger.addEventListener('click', function () {
  clicked = true;
  handleViewportChange();
  if (clicked) {
    hamsburg('none', 'block', 'block');
  }
  if (!clicked) {
    return (
      (hamsburger.style.display = 'none'), (cancelOpt.style.display = 'block')
    );
  }
  clicked = !clicked;
});

// Dismissal: Hamsburger
cancelOpt.addEventListener('click', function () {
  handleViewportChange();
  hamsburg('block', 'none', 'none');
});

// Text animation
const options = {
  strings: ['Oluwagbemiga', 'A Frontend Developer'],
  typeSpeed: 40,
  backSpeed: 40,
  loop: true,
};
const typed = new Typed('.typing', options);
