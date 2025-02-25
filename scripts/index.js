import { initialCards } from './cards.js';

// Окна профиля, карточек и изображений
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");


// Изображение и название изображения
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");


// Добавление анимации на окна
profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");


// Функции открытия и закрытия окон
function openModal(popup) {
  popup.addEventListener("click", (evt) => {
    closePopupByOverlay(evt, popup);
  })
  document.addEventListener("keydown", closeByEsc);
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  document.removeEventListener("keydown", closeByEsc);
  popup.classList.remove('popup_is-opened');
}

// Закрытие поп-апов по оверлею
function closePopupByOverlay(evt, popup) {
  if (evt.target.classList.contains("popup")) {
    closeModal(popup);
  }
}

// Закрытие поп-апов нажатием Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}


// Открытие и закрытие окна редактирования профиля
const profileName = profilePopup.querySelector(".popup__input_type_name");
const profileJob = profilePopup.querySelector(".popup__input_type_description");
const profileInfoName = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(".profile__description");

function profileInfoToEdit() {
  profileName.value = profileInfoName.textContent;
  profileJob.value = profileInfoDescription.textContent;
}
profileInfoToEdit();

function openProfilePopup() {
  profileInfoToEdit();
  openModal(profilePopup);
}
document.querySelector(".profile__edit-button").addEventListener("click", openProfilePopup);

function closeProfilePopup() {
  closeModal(profilePopup);
}
profilePopup.querySelector(".popup__close").addEventListener("click", closeProfilePopup);
profilePopup.querySelector(".popup__button").addEventListener("click", closeProfilePopup);


// Редактирование информации в профиле
const profileFormElement = profilePopup.querySelector(".popup__form");
const profileNameInput = profileFormElement.querySelector(".popup__input_type_name");
const profileJobInput = profileFormElement.querySelector(".popup__input_type_description");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileName = profileNameInput.value;
  const profileJob = profileJobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = profileName;
  profileDescription.textContent = profileJob;
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Открытие и закрытие окна создания карточки
function openCardPopup() {
  openModal(cardPopup);
}
document.querySelector(".profile__add-button").addEventListener("click", openCardPopup);

function closeCardPopup() {
  closeModal(cardPopup);
}
cardPopup.querySelector(".popup__close").addEventListener("click", closeCardPopup);
cardPopup.querySelector(".popup__button").addEventListener("click", closeCardPopup);


// Добавление карточки
const cardFormElement = cardPopup.querySelector(".popup__form");
const placeNameInput = cardFormElement.querySelector(".popup__input_type_card-name");
const linkInput = cardFormElement.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = linkInput.value;
  const placeData = { name: placeName, link: placeLink};
  const newCard = createCard(placeData);
  placesList.prepend(newCard);
  renderCards();
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);


// Закрытие изображения карточки
function closeImagePopup() {
  closeModal(imagePopup);
}
imagePopup.querySelector(".popup__close").addEventListener("click", closeImagePopup);


// Темплейт карточки и функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Лайк карточек
  cardLikeButton.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("card__like-button_is-active");
  });

  // Удаление карточек
  cardDeleteButton.addEventListener("click", (evt) => {
    const cardElement = evt.currentTarget.closest(".card");
    if (cardElement) {
      cardElement.remove();
    }
  });

  // Отображение изображений карточек
  cardImage.addEventListener("click", evt => {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  return cardElement;
}


// Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

function renderCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    placesList.appendChild(cardElement);
  })
}

document.addEventListener("DOMContentLoaded", renderCards);


// Валидация форм
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_type_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_type_disabled');
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll("input");
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll("form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
enableValidation();
