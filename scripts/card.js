// Функция создания карточек
export function createCard(imageAttr, cardTemplate, deleteCardOnApi, likeCardOnApi, unlikeCardOnApi, openCardModal, usrId) {
    
    const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
  
   
    cardTitle.textContent = imageAttr.name;
    cardImage.src = imageAttr.link;
    cardImage.alt = imageAttr.name;
  
    if (imageAttr.likes.length > 0) {
      likeCounter.textContent = imageAttr.likes.length;
    } else {
      likeCounter.textContent = 0;
    }
  
    if (imageAttr.likes.find((item) => item._id === usrId)) {
      likeButton.classList.add('card__like-button_is-active');
    }
  
    
    deleteButton.addEventListener('click', () => {
      deleteCardOnApi(imageAttr['_id']).then(() => deleteCard(cardElement)).catch((err) => console.log(err));
    });
    likeButton.addEventListener('click', () => {
      if (likeButton.classList.contains('card__like-button_is-active')) {
        unlikeCardOnApi(imageAttr['_id']).then((res) => {
          likeCard(cardElement);
          likeCounter.textContent = res.likes.length
        }).catch((err) => console.log(err));
      } else {
        likeCardOnApi(imageAttr['_id']).then((res) => {
          likeCard(cardElement);
          likeCounter.textContent = res.likes.length
        }).catch((err) => console.log(err));
      }
      
    });
    cardImage.addEventListener('click', () => {
      openCardModal(cardImage.src, cardTitle.textContent);
    })
  
    if (imageAttr.owner && usrId !== imageAttr.owner['_id']) {
      deleteButton.remove();
    }
  
    return cardElement
  }
  
  function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  function likeCard(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active');
  }
  