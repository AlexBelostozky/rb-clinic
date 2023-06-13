import {isNumericInput} from './utils.js';
import {isModifierKey} from './utils.js';
import {isEscKeyPressed} from './utils.js';
import {sendRequest} from './api.js';

const body = document.querySelector('.page__body');
const navMain = document.querySelector('.header__nav');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const modalForm = document.querySelector('.modal__form')
const resetButton = document.querySelector('.modal__button--reset');
const closeModalButton = document.querySelector('.modal__button--close');
const submitButton = document.querySelector('.modal__button--submit');
const modalInputs = document.querySelectorAll('.modal__input');
const nameInput = document.getElementById('client-name');
const phoneInput = document.getElementById('client-phone');
const nameErrorLabel = document.querySelector('.modal__input-error--name');
const phoneErrorLabel = document.querySelector('.modal__input-error--phone');
const modalLoader = document.querySelector('.modal__form-loader');

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
  nameInput.addEventListener('input', onNameInputChange);
  phoneInput.addEventListener('keydown', onPhoneInputKeydown);
  phoneInput.addEventListener('input', onPhoneInputChange);


  // Валидация формы
  nameInput.addEventListener('blur', onNameInputBlur);
  phoneInput.addEventListener('blur', onPhoneInputBlur);

  // Отправка формы
  submitButton.addEventListener('click', onSubmitButtonClick);

  // Закрытие формы
  closeModalButton.addEventListener('click', onCloseModalButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('mousedown', outsideModalClick);
}

function onSubmitButtonClick (evt) {
  evt.preventDefault();

  // Проверка инпутов
  let isValidInputs = nameInput.validity.valid && phoneInput.validity.valid;
  let isEmptyInputs = !nameInput.value || !phoneInput.value;

  if (isValidInputs && !isEmptyInputs) {
    sendRequest(
      modalForm,
      showLoader,
      setSuccessLoader,
      setFailLoader,
      closeModal
    );
  } else {
    validateNameInput();
    validatePhoneNumber();
  }
}

function onCloseModalButtonClick (evt) {
  evt.preventDefault();

  closeModal();
}

function onModalEscKeydown (evt) {
  if (isEscKeyPressed(evt)) {
    evt.preventDefault();

    closeModal();
  }
}

function outsideModalClick (evt) {
  if (!modalContainer.contains(evt.target)) {

    closeModal();
  }
}

function closeModal () {
  modal.classList.add('modal--hide');
  nameInput.classList.remove('modal__input--valid');
  nameInput.removeAttribute('required');
  nameInput.value = '';
  nameInput.setCustomValidity("");
  nameErrorLabel.textContent = nameInput.validationMessage;
  phoneInput.classList.remove('modal__input--valid');
  phoneInput.removeAttribute('required');
  phoneInput.value = '';
  phoneInput.setCustomValidity("");
  phoneErrorLabel.textContent = phoneInput.validationMessage;
  modalLoader.style.display = 'none';
  if (navMain.classList.contains('header__nav--closed')) {
    // Если навигация закрыта, то можно разблокировать скролл
    body.classList.remove('page__body--locked');
  }
  resetButton.removeEventListener('click', onResetButtonClick);
  nameInput.removeEventListener('input', onNameInputChange);
  phoneInput.removeEventListener('keydown', onPhoneInputKeydown);
  phoneInput.removeEventListener('input', onPhoneInputChange);
  nameInput.removeEventListener('blur', onNameInputBlur);
  phoneInput.removeEventListener('blur', onPhoneInputBlur);
  submitButton.removeEventListener('click', onSubmitButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
  document.removeEventListener('mousedown', outsideModalClick);
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
    nameErrorLabel.textContent = nameInput.validationMessage;
    return true
  } else {
    nameInput.classList.remove('modal__input--valid');
    nameInput.setAttribute('pattern', `/^[\p{L}\p{M}'\s]+$/u`);
    nameInput.setCustomValidity("Имя должно состоять только из букв.");
    nameErrorLabel.textContent = nameInput.validationMessage;
    return false
  }
}

function onPhoneInputKeydown (evt) {
  if (!isNumericInput(evt) && !isModifierKey(evt)){
    event.preventDefault();
  }
}

function onNameInputChange () {
  formatName(nameInput);
}

function formatName(input) {
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
}

function onPhoneInputChange () {
  formatPhoneNumber(phoneInput);
}

function onPhoneInputBlur () {
  phoneInput.setAttribute('required', '');
  validatePhoneNumber();
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

function validatePhoneNumber () {
  const userInput = phoneInput.value.replace(/^\+7|\D/g,'').substring(0,10);
  if (userInput.length === 10) {
    phoneInput.classList.add('modal__input--valid');
    phoneInput.setCustomValidity("");
    phoneErrorLabel.textContent = phoneInput.validationMessage;
    phoneInput.removeAttribute('pattern');
    return true
  } else {
    phoneInput.classList.remove('modal__input--valid');
    phoneInput.setCustomValidity("Недостаточно символов.");
    phoneErrorLabel.textContent = phoneInput.validationMessage;
    return false
  }
}

function showLoader () {
  modalLoader.style.display = 'flex';
  modalLoader.innerHTML = 'Записываем...<br>✍️';
}

function setSuccessLoader () {
  modalLoader.innerHTML = 'Готово!<br>✅';
}

function setFailLoader () {
  modalLoader.innerHTML = 'Что-то пошло не так...<br>🙅‍♂️';
}

export {openModal};
