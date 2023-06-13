import {isNumericInput} from './utils.js';
import {isModifierKey} from './utils.js';
import {sendRequest} from './api.js';

const body = document.querySelector('.page__body');
const navMain = document.querySelector('.header__nav');
const modal = document.querySelector('.modal');
const resetButton = document.querySelector('.modal__button--reset');
const closeModalButton = document.querySelector('.modal__button--close');
const submitButton = document.querySelector('.modal__button--submit');
const modalInputs = document.querySelectorAll('.modal__input');
const phoneInput = document.getElementById('client-phone');
const nameInput = document.getElementById('client-name');

function openModal () {
  modal.classList.remove('modal--hide');
  body.classList.add('page__body--locked');
  resetButton.addEventListener('click', onResetButtonClick);

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
  submitButton.addEventListener('click', onSubmitButtonClick);

  // Отображение лоадера

  // Отображение статуса отправки

  // Закрытие формы
  closeModalButton.addEventListener('click', onCloseModalButtonClick);
}

function onSubmitButtonClick (evt) {
  evt.preventDefault();

  // Проверка инпутов
  let isValidInputs = nameInput.validity.valid && phoneInput.validity.valid;
  console.log('Valid ' + isValidInputs);
  let isEmptyInputs = !nameInput.value || !phoneInput.value;
  console.log('NotEmpty ' + !isEmptyInputs);

  if (isValidInputs && !isEmptyInputs) {
    sendRequest();
  } else {
    nameInput.checkValidity();
    phoneInput.checkValidity();
  }

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

function onResetButtonClick () {
  validateNameInput();
  nameInput.classList.remove('modal__input--valid');
  validatePhoneNumber(phoneInput);
  phoneInput.classList.remove('modal__input--valid');
}

function onNameInputBlur () {
  validateNameInput();
}

function validateNameInput () {
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

export {openModal};
