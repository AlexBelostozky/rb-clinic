// Header navigation logic variables
const body = document.querySelector('.page__body');
const navMain = document.querySelector('.header__nav');
const navToggle = document.querySelector('.header__nav-toggle');
const headerContainer = document.querySelector('.header__container');
// Sort select logic variables
const selectList = document.querySelector('.custom-select__option-list');
const selectToggle = document.querySelector('.custom-select__toggle');
const selectContainer = document.querySelector('.custom-select');
const selectCurrentLabel = document.querySelector('.custom-select__current-label');

// Remove nojs header tags
selectContainer.classList.remove('custom-select--nojs')
selectList.classList.add('custom-select__option-list--closed');
selectList.classList.remove('custom-select__option-list--opened');

// Remove nojs select tags
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

// Set select listener
selectToggle.addEventListener('click', function () {
  if (selectList.classList.contains('custom-select__option-list--closed')) {
    // Open list
    selectList.classList.remove('custom-select__option-list--closed');
    selectList.classList.add('custom-select__option-list--opened');
    selectList.addEventListener('click', onSelectListClick);
    selectToggle.classList.add('custom-select__toggle--checked');
    selectToggle.classList.remove('custom-select__toggle--unchecked');
  } else {
    // Close list
    selectList.classList.add('custom-select__option-list--closed');
    selectList.classList.remove('custom-select__option-list--opened');
    selectList.removeEventListener('click', onSelectListClick);
    selectToggle.classList.remove('custom-select__toggle--checked');
    selectToggle.classList.add('custom-select__toggle--unchecked');
  }
});


// Функция-обработчик выбора пункта селекта
function onSelectListClick (evt) {
  if (evt.target.tagName == 'SPAN') {
    selectCurrentLabel.textContent = evt.target.textContent;
    selectList.classList.add('custom-select__option-list--closed');
    selectList.classList.remove('custom-select__option-list--opened');
    selectToggle.classList.add('custom-select__toggle--unchecked');
    selectToggle.classList.remove('custom-select__toggle--checked');
  }
}
