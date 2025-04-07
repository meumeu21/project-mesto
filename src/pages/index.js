// Импорт главного файла стилей
import '../pages/index.css';
// Импорт валидации
import { enableValidation } from '../components/validate.js';
// Импорт создания карточки
import { createCard } from '../components/card.js';
// Импорт модальных функций (открытия и закрытия)
import { openModal, closeModal } from '../components/modal.js';
// Импорт API
import { getUserInfo, getUserProfile, fetchCards, updateUserInfo,
        addNewCard, updateUserImage, renderLoading } from '../components/api.js';


// Изображения в index.html
const logoSvg = new URL('../images/logo.svg', import.meta.url);
const profileImageUrl = new URL('../images/avatar.jpg', import.meta.url);
const editIconSvg = new URL('../images/edit-icon.svg', import.meta.url);

const whoIsTheGoat = [
  { name: 'Логотип проекта место', link: logoSvg },
  { name: 'Изображение профиля', link: profileImageUrl },
  { name: 'Иконка редактирования аватарки', link: editIconSvg },
];


let userCurrentId;

// Загрузка данных
Promise.all([getUserInfo(), fetchCards()])
  .then(([userData, cardsData]) => {
    userCurrentId = userData._id;
  })
  .catch(err => console.error('Ошибка загрузки данных:', err));


// Окна профиля, карточек и изображений
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_edit_avatar");
const profileName = profilePopup.querySelector(".popup__input_type_name");
const profileJob = profilePopup.querySelector(".popup__input_type_description");
const profileInfoName = document.querySelector(".profile__title");
const profileInfoDescription = document.querySelector(".profile__description");
const profileInfoImage = document.querySelector(".profile__image");


// Информация о профиле
getUserProfile(profileInfoName, profileInfoDescription, profileInfoImage);

// Добавление анимации на окна
profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");
avatarPopup.classList.add("popup_is-animated");


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
// profilePopup.querySelector(".popup__button").addEventListener("click", closeProfilePopup);


// Редактирование информации в профиле
const profileFormElement = profilePopup.querySelector(".popup__form");
const profileNameInput = profileFormElement.querySelector(".popup__input_type_name");
const profileJobInput = profileFormElement.querySelector(".popup__input_type_description");
const profileSubmitButton = profileFormElement.querySelector(".popup__button");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newProfileName = profileNameInput.value;
  const newProfileJob = profileJobInput.value;
  renderLoading(true, profileSubmitButton);
  updateUserInfo(newProfileName, newProfileJob)
    .then((updatedUser) => {
      profileInfoName.textContent = updatedUser.name;
      profileInfoDescription.textContent = updatedUser.about;
      closeProfilePopup();
    })
    .catch((err) => {
      console.error('Не удалось обновить профиль:', err);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    });
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Открытие и закрытие окна редактирования аватарки
function openAvatarPopup() {
  openModal(avatarPopup);
}
document.querySelector(".profile__image").addEventListener("click", openAvatarPopup);

function closeAvatarPopup() {
  closeModal(avatarPopup);
}
avatarPopup.querySelector(".popup__close").addEventListener("click", closeAvatarPopup);
// avatarPopup.querySelector(".popup__button").addEventListener("click", closeAvatarPopup);


// Редактирование аватарки пользователя
const avatarFormElement = avatarPopup.querySelector(".popup__form");
const avatarLinkInput = avatarFormElement.querySelector(".popup__input_type_url");
const avatarSubmitButton = avatarFormElement.querySelector(".popup__button");

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarLink = avatarLinkInput.value;
  renderLoading(true, avatarSubmitButton);
  updateUserImage(avatarLink)
    .then((newAvatar) => {
      profileInfoImage.style.backgroundImage = `url("${newAvatar.avatar}")`;
      console.log(newAvatar.avatar);
      closeAvatarPopup();
    })
    .catch((error) => {
      console.error("Ошибка загрузки аватарки:", error);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    });
}
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);


// Открытие и закрытие окна создания карточки
function openCardPopup() {
  openModal(cardPopup);
}
document.querySelector(".profile__add-button").addEventListener("click", openCardPopup);

function closeCardPopup() {
  closeModal(cardPopup);
}
cardPopup.querySelector(".popup__close").addEventListener("click", closeCardPopup);
// cardPopup.querySelector(".popup__button").addEventListener("click", closeCardPopup);


// Добавление карточки
const cardFormElement = cardPopup.querySelector(".popup__form");
const placeNameInput = cardFormElement.querySelector(".popup__input_type_card-name");
const linkInput = cardFormElement.querySelector(".popup__input_type_url");
const cardSubmitButton = cardFormElement.querySelector(".popup__button");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = linkInput.value;
  renderLoading(true, cardSubmitButton);
  addNewCard(placeName, placeLink)
    .then((newCard) => {
      const placeData = { name: newCard.name, link: newCard.link,
        owner: { _id: userCurrentId }, _id: newCard._id,
        likes: [] };
      const newCardInfo = createCard(placeData, userCurrentId);
      placesList.prepend(newCardInfo);
      closeCardPopup();
    })
    .catch((err) => {
      console.error('Не удалось добавить новую карточку:', err);
    })
    .finally(() => {
      renderLoading(false, cardSubmitButton);
    });
}
cardFormElement.addEventListener('submit', handleCardFormSubmit);


// Закрытие изображения карточки
function closeImagePopup() {
  closeModal(imagePopup);
}
imagePopup.querySelector(".popup__close").addEventListener("click", closeImagePopup);


// Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

function renderCards(initialCards) {
  initialCards.forEach((card) => {
    const cardElement = createCard(card, userCurrentId);
    placesList.appendChild(cardElement);
  })
}

fetchCards().then((initialCards) => {
  renderCards(initialCards);
  console.log(initialCards);
});


// Включение валидации
enableValidation();
