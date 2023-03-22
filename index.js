// Event handlers
const container = document.querySelector('.container');
const loader = document.querySelector('.loader');
const header = document.querySelector('.header');
const topHeader = document.querySelector('.top--header');
const hamsburger = document.querySelector('.ham--icon');
const listItems = document.querySelector('ul');

let clicked = true;
// loader function
// setTimeout(() => {
//   loader.classList.add('hidden');
//   container.classList.remove('hidden');
// }, 5000);

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

// Hamburger functionality
function handleViewportChange() {
  const mediaQueryList = window.matchMedia('(max-width: 800px)');

  if (mediaQueryList.matches) {
    listItems.style.display = 'block';
  }
}
hamsburger.addEventListener('click', function () {
  handleViewportChange();
  if (clicked) {
    listItems.style.display = 'block';
  } else {
    listItems.style.display = 'none';
  }
  clicked = !clicked;
});

// Text animation
const options = {
  strings: ['Oluwagbemiga', 'A Frontend Developer'],
  typeSpeed: 40,
  backSpeed: 40,
  loop: true,
};
const typed = new Typed('.typing', options);
