'use strict';
import * as Hamsburg from './Hamsburger.js';

// Event handlers
const container = document.querySelector('.container');
const header = document.querySelector('.header');
const topHeader = document.querySelector('.top--header');

// loader event handlers
const loader = document.querySelector('.loader');
const logo = document.querySelector('.logo');
const subHeader = document.querySelector('.sub--header');
const pretext = document.querySelector('.pretext');

// Implementation of the hamsburger
container.addEventListener('click', Hamsburg.hamsburger);

// Loader implementation
// setTimeout(() => {
//   loader.classList.add('hidden');
//   container.classList.remove('hidden');
// }, 5000);
// setTimeout(() => {
//   logo.style.display = 'inline';
//   topHeader.style.opacity = 1;
// }, 6100);

// setTimeout(() => {
//   subHeader.style.opacity = 1;
// }, 7100);

//  faking the delay
setTimeout(() => {
  subHeader.style.opacity = 1;
}, 2100);

//  Helper functions

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

// headerObserver.observe(pretext);

// Hamsburger functionality
Hamsburg.handleViewportChange();
// Hamsburger event handlers
Hamsburg.hamsburgerIcon.addEventListener('click', Hamsburg.displayLink);
// Dismissal: Hamsburger
Hamsburg.cancelOpt.addEventListener('click', Hamsburg.removeLink);

// Text animation
const options = {
  strings: ['Oluwagbemiga', 'A Frontend Developer'],
  typeSpeed: 40,
  backSpeed: 40,
  loop: true,
};
const typed = new Typed('.typing', options);

// section header pretext
const readMoreText = document.querySelector('.read--more');
const chooseView = document.querySelector('.choose--view');
const chooseViewText = document.querySelector('.choose--view--text');

chooseView.addEventListener('click', function () {
  readMoreText.classList.toggle('hidden');
  readMoreText.classList.contains('hidden')
    ? (chooseViewText.innerText = 'see more')
    : (chooseViewText.innerText = 'see less');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-50px',
});

imgTargets.forEach(img => imgObserver.observe(img));
