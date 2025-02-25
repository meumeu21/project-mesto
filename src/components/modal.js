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

export { openModal, closeModal,  closePopupByOverlay, closeByEsc };
