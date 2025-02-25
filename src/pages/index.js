// Импорт главного файла стилей
import '../pages/index.css';
// Импорт начальных карточек
import { initialCards } from '../utils/cards.js';
// Импорт валидации
import { enableValidation } from '../components/validate.js';
// Импорт создания карточки
import { createCard } from '../components/card.js';
// Импорт модальных функций (открытия и закрытия)
import { openModal, closeModal } from '../components/modal.js';


// Изображения в index.html
const logoSvg = new URL('../images/logo.svg', import.meta.url);
const profileImage = new URL('../images/avatar.jpg', import.meta.url);

const whoIsTheGoat = [
  { name: 'Логотип проекта место', link: logoSvg },
  { name: 'Изображение профиля', link: profileImage },
];


// Окна профиля, карточек и изображений
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileName = profilePopup.querySelector(".popup__input_type_name");
const profileJob = profilePopup.querySelector(".popup__input_type_description");
const profileInfoName = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(".profile__description");


// Добавление анимации на окна
profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");


// Открытие и закрытие окна редактирования профиля
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
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);


// Закрытие изображения карточки
function closeImagePopup() {
  closeModal(imagePopup);
}
imagePopup.querySelector(".popup__close").addEventListener("click", closeImagePopup);


// Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

function renderCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    placesList.appendChild(cardElement);
  })
}
document.addEventListener("DOMContentLoaded", renderCards);


// Включение валидации
enableValidation();
