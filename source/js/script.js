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
const sliderImages = document.querySelectorAll('.services__item');
const sliderLine = document.querySelector('.services__list');

const sliderBtnNext = document.querySelector('.pagination__button--next');
const sliderBtnPrev = document.querySelector('.pagination__button--prev');

const paginationCurrent = document.querySelector('.pagination__page-current');
const paginationAmount = document.querySelector('.pagination__page-amount');

let sliderCount = 0;
let sliderWidth = slider.offsetWidth;

paginationAmount.textContent = sliderImages.length;

sliderBtnNext.addEventListener('click', goToNextSlide);
sliderBtnPrev.addEventListener('click', goToPrevSlide);
window.addEventListener('resize', updateSliderWidth);

function updateSliderWidth () {
  sliderWidth = slider.offsetWidth;
  resetSlider();
}

function resetSlider () {
  sliderCount = 0;
  changeSlide();
}

function goToNextSlide (evt) {
  evt.preventDefault();
  sliderCount++;

  if (sliderCount >= sliderImages.length) {
    sliderCount = 0;
  }

  changeSlide();
}

function goToPrevSlide (evt) {
  evt.preventDefault();
  sliderCount--;

  if (sliderCount < 0) {
    sliderCount = sliderImages.length - 1;
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
