// Header navigation logic variables
const body = document.querySelector('.page__body');
const navMain = document.querySelector('.header__nav');
const navToggle = document.querySelector('.header__nav-toggle');
const headerContainer = document.querySelector('.header__container');

// Remove nojs header tags
headerContainer.classList.remove('header__container--nojs')
navMain.classList.add('header__nav--closed');
navMain.classList.remove('header__nav--opened');

// Set header nav listener
navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('header__nav--closed')) {
    navMain.classList.remove('header__nav--closed');
    navMain.classList.add('header__nav--opened');
    body.classList.add('page__body--locked');
  } else {
    navMain.classList.add('header__nav--closed');
    navMain.classList.remove('header__nav--opened');
    body.classList.remove('page__body--locked');
  }
});

//
// Slider
//
const slider = document.querySelector('.services');
const sliderCards = document.querySelectorAll('.services__item');
const sliderLine = document.querySelector('.services__list');

const pagination = document.querySelector('.pagination');

const paginationCurrent = document.querySelector('.pagination__page-current');
const paginationAmount = document.querySelector('.pagination__page-amount');

let sliderCount = 0;
// let sliderCountPrev = 0;
let sliderWidth = slider.offsetWidth;

paginationAmount.textContent = sliderCards.length;

pagination.addEventListener('click', onPaginationClick);
window.addEventListener('resize', updateSliderWidth);

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
    // sliderCountPrev = sliderCount;
    sliderCount++;

    if (sliderCount >= sliderCards.length) {
      sliderCount = 0;
    }
  }

  if (evt.target.closest('.pagination__button--prev')) {
    // sliderCountPrev = sliderCount;
    sliderCount--;

    if (sliderCount < 0) {
      sliderCount = sliderCards.length - 1;
    }
  }

  changeSlide();
}

function changeSlide () {
  sliderLine.style.transform = `translateX(${- sliderCount * sliderWidth}px)`;
  // sliderCards[sliderCountPrev].classList.remove('services__item--show');
  // sliderCards[sliderCount].classList.add('services__item--show');

  updatePagination();
}

function updatePagination () {
  paginationCurrent.textContent = sliderCount + 1;
}
