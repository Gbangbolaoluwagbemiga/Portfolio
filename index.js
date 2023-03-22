// Event handlers
const container = document.querySelector('.container');
const loader = document.querySelector('.loader');
const loaderText = document.querySelector('.loader--text');
const header = document.querySelector('.header');
const topHeader = document.querySelector('.top--header');

// loader function
setTimeout(() => {
  loader.classList.add('hidden');
  container.classList.remove('hidden');
}, 5000);

// Sticky navigation: Intersection Observer API
const navHeight = topHeader.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) topHeader.classList.add('sticky');
  else topHeader.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Text animation
const options = {
  strings: ['Oluwagbemiga', 'A Frontend Developer'],
  typeSpeed: 40,
  backSpeed: 40,
  loop: true,
};
const typed = new Typed('.typing', options);
