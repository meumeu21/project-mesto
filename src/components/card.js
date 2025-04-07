import { openModal } from "./modal";
import { deleteCard, likeCard, deleteLikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

function createCard(cardData, currentUserId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCount = cardElement.querySelector(".card__span");

  cardData.likes = cardData.likes || [];

  // Заполнение данными
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  // Проверка лайков
  const isLiked = cardData.likes.some(user => user._id === currentUserId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Лайк
  cardLikeButton.addEventListener("click", () => {
    const likeAction = cardLikeButton.classList.contains('card__like-button_is-active')
      ? deleteLikeCard(cardData._id)
      : likeCard(cardData._id);

    likeAction
      .then((updatedCard) => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
        cardLikeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error('Ошибка при обновлении лайка:', err);
      });
  });

  // Удаление (только для своих карточек)
  if (cardData.owner._id === currentUserId) {
    cardDeleteButton.addEventListener("click", (evt) => {
      const cardElement = evt.currentTarget.closest(".card");
      deleteCard(cardData._id)
        .then(() => cardElement.remove())
        .catch((err) => console.error('Ошибка удаления карточки:', err));
    });
  } else {
    cardDeleteButton.style.display = 'none';
  }

  // Просмотр изображения
  cardImage.addEventListener("click", () => {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  return cardElement;
}

export { createCard };  // cardTemplate не экспортируем, если он не используется вне этого файла
