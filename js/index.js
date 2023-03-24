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

// Implementation of the hamsburger
container.addEventListener('click', Hamsburg.hamsburger);

// Loader implementation
setTimeout(() => {
  loader.classList.add('hidden');
  container.classList.remove('hidden');
}, 5000);
setTimeout(() => {
  logo.style.display = 'inline';
}, 6100);

setTimeout(() => {
  subHeader.style.opacity = 1;
}, 7100);

// faking the delay
// setTimeout(() => {
//   subHeader.style.opacity = 1;
// }, 2100);
// Helper functions

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
