export const hamsburgerIcon = document.querySelector('.ham--icon');
export const cancelOpt = document.querySelector('.cancel--icon');
const listItems = document.querySelector('.nav__links');

let clicked;

export const hamsburger = function (e) {
  const link = e.target;
  // console.log(link);

  if (listItems.style.display === 'block') {
    if (
      link.classList.contains('ham--icon') ||
      link.classList.contains('cancel--icon') ||
      link.classList.contains('links')
    )
      return;
    handleViewportChange();
    hamsburg('block', 'none', 'none');
  }
};

const hamsburg = function (hamsDisplay, cancelDisplay, listDisplay) {
  hamsburgerIcon.style.display = hamsDisplay;
  cancelOpt.style.display = cancelDisplay;
  listItems.style.display = listDisplay;
};

export const displayLink = function (e) {
  console.log('hmmmn');
  clicked = true;
  handleViewportChange();
  if (clicked) {
    hamsburg('none', 'block', 'block');
  }
  if (!clicked) {
    return (
      (hamsburgerIcon.style.display = 'none'),
      (cancelOpt.style.display = 'block')
    );
  }
  clicked = !clicked;
};

export const removeLink = function () {
  handleViewportChange();
  hamsburg('block', 'none', 'none');
};

export function handleViewportChange() {
  const mediaQueryList = window.matchMedia('(max-width: 800px)');
  if (mediaQueryList.matches && clicked) {
    listItems.style.display = 'block';
    console.log('hey');
  }
  if (!mediaQueryList) return (listItems.style.display = 'flex');

  if (mediaQueryList.matches) {
    console.log('hi');
    reorderImg.classList.add('order-1');
    reorderText.classList.add('order-2');
  }
}
