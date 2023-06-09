
// Swiper script


// Imports
// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'
//
// const swiper = new Swiper(".swiper", {
//   pagination: {
//     el: ".pagination__page-label",
//     type: "fraction",
//   },
//   navigation: {
//     nextEl: ".pagination__button--next",
//     prevEl: ".pagination__button--prev",
//   },
// });

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
