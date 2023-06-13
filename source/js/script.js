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

//
// Modal
//

// const body = document.querySelector('.page__body');
// const navMain = document.querySelector('.header__nav');
const modal = document.querySelector('.modal');
const enrollButtons = document.querySelectorAll('.enroll-button');
const closeModalButton = document.querySelector('.modal__button--close');
const modalInputs = document.querySelectorAll('.modal__input');
const phoneInput = document.getElementById('client-phone');
const nameInput = document.getElementById('client-name');

enrollButtons.forEach((button) => {
  button.addEventListener('click', onEnrollButtonClick);
});

function onEnrollButtonClick (evt) {
  evt.preventDefault();

  openModal();
}

function openModal () {
  modal.classList.remove('modal--hide');
  body.classList.add('page__body--locked');
  closeModalButton.addEventListener('click', onCloseModalButtonClick);

  // Если загрузились скрипты, можно удалить аттрибут required,
  // так как валидация теперь будет проводиться при помощи них
  modalInputs.forEach((modalInput) => {
    modalInput.removeAttribute('required');
  });

  // Заполнение формы
  phoneInput.addEventListener('keydown', onPhoneInputKeydown);
  phoneInput.addEventListener('input', onPhoneInputChange);


  // Валидация формы
  nameInput.addEventListener('blur', onNameInputBlur);
  phoneInput.addEventListener('blur', onPhoneInputBlur);

  // Отправка формы

  // Отображение лоадера

  // Отображение статуса отправки

  // Закрытие формы
}

function onCloseModalButtonClick (evt) {
  evt.preventDefault();

  closeModal();
}

function closeModal () {
  modal.classList.add('modal--hide');
  nameInput.classList.remove('modal__input--valid');
  nameInput.value = '';
  phoneInput.classList.remove('modal__input--valid');
  phoneInput.removeAttribute('required');
  phoneInput.value = '';
  if (navMain.classList.contains('header__nav--closed')) {
    // Если навигация закрыта, то можно разблокировать скролл
    body.classList.remove('page__body--locked');
  }
  closeModalButton.removeEventListener('click', onCloseModalButtonClick);
}

function onNameInputBlur () {
  const lettersRegExp = /^[\p{L}\p{M}'\s]+$/u;
  nameInput.setAttribute('required', '');

  if (lettersRegExp.test(nameInput.value)) {
    nameInput.classList.add('modal__input--valid');
    nameInput.removeAttribute('pattern');
    nameInput.setCustomValidity("");
    return true
  } else {
    nameInput.classList.remove('modal__input--valid');
    nameInput.setAttribute('pattern', `/^[\p{L}\p{M}'\s]+$/u`);
    nameInput.setCustomValidity("Только буквы.");
    return false
  }
}

function onPhoneInputKeydown (evt) {
  if (!isNumericInput(evt) && !isModifierKey(evt)){
    event.preventDefault();
  }
}

function isNumericInput (evt) {
  const key = event.keyCode;
  return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105))
}

function isModifierKey(evt) {
  const key = evt.keyCode;
  return (evt.shiftKey === true || key === 35 || key === 36) || // Разрешить Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Разрешить Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Разрешить left, up, right, down
        (evt.ctrlKey === true || evt.metaKey === true) // Разрешить control, command
}

function onPhoneInputChange (evt) {
  formatPhoneNumber(phoneInput);
}

function onPhoneInputBlur () {
  phoneInput.setAttribute('required', '');
  validatePhoneNumber(phoneInput);
}

function formatPhoneNumber (input) {
  const userInput = input.value.replace(/^\+7|\D/g,'').substring(0,10);
  const areaCode = userInput.substring(0,3);
  const middle = userInput.substring(3,6);
  const last = userInput.substring(6,10);

  if (userInput.length > 6) {
    input.value = `+7 (${areaCode}) ${middle}–${last}`;
  } else if (userInput.length > 3) {
    input.value = `+7 (${areaCode}) ${middle}`;
  } else if (userInput.length > 0) {
    input.value = `+7 (${areaCode}`;
  }
}

function validatePhoneNumber (phoneNumber) {
  const userInput = phoneNumber.value.replace(/^\+7|\D/g,'').substring(0,10);

  if (userInput.length === 10) {
    phoneInput.classList.add('modal__input--valid');
    phoneInput.setCustomValidity("");
    phoneInput.removeAttribute('pattern');
    return true
  } else {
    phoneInput.classList.remove('modal__input--valid');
    phoneInput.setCustomValidity("Недостаточно символов.");
    return false
  }
}
