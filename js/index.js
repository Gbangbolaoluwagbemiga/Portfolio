'use strict';
import * as Hamsburg from './Hamsburger.js';
import * as slider from './slider.js';

// Event handlers
const container = document.querySelector('.container');
const header = document.querySelector('.nav');
// const header = document.querySelector('.header--page');
const topHeader = document.querySelector('.overall-header');
// const topHeader = document.querySelector('.top--header');

// loader event handlers
const loader = document.querySelector('.loader');
const logo = document.querySelector('.logo');
const subHeader = document.querySelector('.sub-header');
const pretext = document.querySelector('.pretext');

// Implementation of the hamsburger
// container.addEventListener('click', Hamsburg.hamsburger);

// Loader implementation
setTimeout(() => {
  loader.classList.add('hidden');
  container.classList.remove('hidden');
}, 5000);
setTimeout(() => {
  logo.style.display = 'inline';
  topHeader.style.opacity = 1;
}, 6100);

setTimeout(() => {
  subHeader.style.opacity = 1;
}, 7100);

//  faking the delay
// setTimeout(() => {
//   subHeader.style.opacity = 1;
// }, 2100);

//  Helper functions

// Sticky navigation: Intersection Observer API
const navHeight = topHeader.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    // header.classList.add('sticky');
    header.classList.add('sticky');
    arrowUp.classList.remove('hidden');
  } else {
    // header.classList.remove('sticky');
    header.classList.remove('sticky');
    arrowUp.classList.add('hidden');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.15,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(topHeader);

// Hamsburger functionality
const hamsburgerIcon = document.querySelector('.ham-icon');
const listItems = document.querySelector('.nav__links');
hamsburgerIcon.addEventListener('click', function () {
  listItems.style.display = 'block';
  // console.log(hamsburgerIcon);
  // console.log('hi');
});
// Hamsburg.handleViewportChange();
// // Hamsburger event handlers
// Hamsburg.hamsburgerIcon.addEventListener('click', Hamsburg.displayLink);
// // Dismissal: Hamsburger
// Hamsburg.cancelOpt.addEventListener('click', Hamsburg.removeLink);

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

// skill buttons
const btnContainer = document.querySelector('.btn--container');
const btnSkills = document.querySelectorAll('.btn-skills');
const skillContent = document.querySelectorAll('.skill--content');
btnContainer.addEventListener('click', function (e) {
  const link = e.target.closest('.btn-skills');
  if (!link) return;
  // console.log(link.dataset.tab);

  // Remove active classes
  btnSkills.forEach(t => t.classList.remove('active--btn--skills'));
  skillContent.forEach(c => c.classList.add('hidden'));

  // Activate tab
  link.classList.add('active--btn--skills');

  // // Activate content area
  document
    .querySelector(`.operations__content--${link.dataset.tab}`)
    .classList.remove('hidden');
});

// Reveal sections
const allSections = document.querySelectorAll('.sections');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// project slider
slider.slideProjects();

// section mail

// modal
const modal = document.querySelector('.contact-modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelector('.send-mail');
const arrowUp = document.querySelector('.back-up');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  arrowUp.classList.add('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  arrowUp.classList.remove('hidden');
};

btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
