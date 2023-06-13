const slider = document.querySelector('.services');
const sliderCards = document.querySelectorAll('.services__item');
const sliderLine = document.querySelector('.services__list');
const paginationCurrent = document.querySelector('.pagination__page-current');
const paginationAmount = document.querySelector('.pagination__page-amount');
const pagination = document.querySelector('.pagination');

let sliderCount = 0;
let sliderWidth = slider.offsetWidth;

paginationAmount.textContent = sliderCards.length;

function updateSliderWidth () {
  sliderWidth = slider.offsetWidth;
  resetSlider();
}

function resetSlider () {
  sliderCount = 0;
  changeSlide();
}

function onPaginationClick (evt) {
  evt.preventDefault();

  if (evt.target.closest('.pagination__button--next')) {
    sliderCount++;

    if (sliderCount >= sliderCards.length) {
      sliderCount = 0;
    }
  }

  if (evt.target.closest('.pagination__button--prev')) {
    sliderCount--;

    if (sliderCount < 0) {
      sliderCount = sliderCards.length - 1;
    }
  }

  changeSlide();
}

function changeSlide () {
  sliderLine.style.transform = `translateX(${- sliderCount * sliderWidth}px)`;

  updatePagination();
}

function updatePagination () {
  paginationCurrent.textContent = sliderCount + 1;
}

export {onPaginationClick};
export {updateSliderWidth};
