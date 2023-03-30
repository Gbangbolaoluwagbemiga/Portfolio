'use strict';
import * as slider from './slider.js';

// Event handlers
const container = document.querySelector('.container');
const header = document.querySelector('.nav');
// const header = document.querySelector('.header--page');
const topHeader = document.querySelector('.overall-header');
// const topHeader = document.querySelector('.top--header');

// loader event handlers
const loader = document.querySelector('.loader');
const logo = document.querySelector('.logo--name');
const subHeader = document.querySelector('.sub-header');
const pretext = document.querySelector('.overall-header');

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
  threshold: 0,
  rootMargin: `-30px`,
  // rootMargin: `-${navHeight}px`,
});

headerObserver.observe(topHeader);

//////////////////////////////////
const mediaQueryList = window.matchMedia('(max-width: 800px)');
const reorderText = document.querySelector('.reorder__text');
const reorderImg = document.querySelector('.reorder__img');
const hamsburgerIcon = document.querySelector('.ham-icon');
const cancelIcon = document.querySelector('.cancel-icon');
const listItems = document.querySelector('.nav__links');
const listLink = document.querySelectorAll('.nav__link');

const reOrdering = function () {
  if (mediaQueryList.matches) {
    reorderImg.classList.add('order-1');
    reorderText.classList.add('order-2');
  }
};
reOrdering();

let clicked;

// Hamsburger functionality
hamsburgerIcon.addEventListener('click', function () {
  clicked = true;
  if (mediaQueryList.matches && clicked) {
    listItems.style.display = 'block';
  }
  if (!mediaQueryList) return (listItems.style.display = 'flex');

  clicked = !clicked;
  if (!clicked) {
    hamsburgerIcon.style.display = 'none';
    cancelIcon.style.display = 'block';
  }
});

const closeLink = function () {
  listItems.style.display = 'none';
  cancelIcon.style.display = 'none';
  hamsburgerIcon.style.display = 'block';
};
container.addEventListener('click', function (e) {
  const link = e.target;

  if (listItems.style.display === 'block') {
    if (
      link.classList.contains('ham-icon') ||
      link.classList.contains('cancel-icon')
    )
      return;
    closeLink();
  }
});
cancelIcon.addEventListener('click', closeLink);
listLink.forEach(link => link.addEventListener('click', closeLink));
// End of hamsburger functionality

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
  if (!readMoreText.classList.contains('hidden')) {
    pretext.style.height = '110vh';
  } else {
    pretext.style.height = '90vh';
  }
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
