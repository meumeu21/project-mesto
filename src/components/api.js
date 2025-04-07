const cohortId = 'apf-cohort-202';
const token = '35ced132-4af8-4e9f-9801-f8412e445272';

function getUserInfo() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "GET",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`Ошибка получения информации о пользователе: ${error}`);
    });
}

function getUserProfile(profileName, profileAbout, profileImage) {
  getUserInfo()
    .then(userData => {
      profileName.textContent = userData.name;
      profileAbout.textContent = userData.about;
      profileImage.style.backgroundImage = `url("${userData.avatar}")`;
    })
    .catch(error => console.error("Ошибка запроса информации о пользователе:", error));
}

function fetchCards() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "GET",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Произошла ошибка при загрузке карточек:', error);
    });
}

function updateUserInfo(newProfileName, newProfileDescription) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newProfileName,
      about: newProfileDescription
    })
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Ошибка обновления информации о пользователе:', error);
    })
}

function addNewCard(imageName, imageLink) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: imageName,
      link: imageLink
    })
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Ошибка добавления новой карточки:', error);
    })
}

function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Ошибка удаления карточки:', error);
      throw error;
    })
}

function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Ошибка «лайка» на карточке:', error);
      throw error;
    })
}

function deleteLikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Ошибка «лайка» на карточке:', error);
      throw error;
    })
}

function updateUserImage(imageLink) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: imageLink
    })
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Ошибка добавления аватарки пользователю:', error);
    })
}

function renderLoading(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = "Сохранение...";
  } else {
    popupButton.textContent = "Сохранить";
  }
}

export { getUserInfo, getUserProfile, fetchCards, updateUserInfo,
        addNewCard, deleteCard, likeCard, deleteLikeCard, updateUserImage,
        renderLoading };
