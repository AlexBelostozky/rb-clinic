import {openModal} from './modal.js';
import {onPaginationClick} from './slider.js';
import {updateSliderWidth} from './slider.js';

// Header navigation logic variables
const body = document.querySelector('.page__body');
const navMain = document.querySelector('.header__nav');
const navToggle = document.querySelector('.header__nav-toggle');
const headerContainer = document.querySelector('.header__container');
const enrollButtons = document.querySelectorAll('.enroll-button');
const pagination = document.querySelector('.pagination');

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
pagination.addEventListener('click', onPaginationClick);
window.addEventListener('resize', updateSliderWidth);

//
// Modal
//
enrollButtons.forEach((button) => {
  button.addEventListener('click', onEnrollButtonClick);
});

function onEnrollButtonClick (evt) {
  evt.preventDefault();

  openModal();
}
