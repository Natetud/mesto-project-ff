import {deleteCardApi, likeCardApi, unlikeCardApi} from "./api";

export function deleteCard(cardElement, cardId) {
    deleteCardApi(cardId).then(() => {
        cardElement.remove();
    }).catch(console.error)
}

export function likeCard(likeButton, likeCounter, cardId) {
    likeCardApi(cardId).then((res) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = res.likes.length
    })
}

export function unlikeCard(likeButton, likeCounter, cardId) {
    unlikeCardApi(cardId).then((res) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = res.likes.length
    }).catch(console.error)
}

export function createCard(imageAttr, cardTemplate, openCardModal, userId) {
    const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardTitle.textContent = imageAttr.name;
    cardImage.src = imageAttr.link;
    cardImage.alt = imageAttr.name;

    if (imageAttr.likes?.length > 0) {
        likeCounter.textContent = imageAttr.likes.length;
    } else {
        likeCounter.textContent = 0;
    }
    if (imageAttr.likes.find((item) => item._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (userId !== imageAttr.owner['_id']) {
        deleteButton.remove();
    }
    else {
        // Удаление карточки
        deleteButton.addEventListener('click', () => {
            deleteCard(cardElement, imageAttr['_id'])
        });
    }

    // Открытие модального окна с просмотром карточки
    cardImage.addEventListener('click', () => {
        openCardModal(cardImage.src, cardTitle.textContent);
    })
    // Обработчик нажатия на лайк
    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            unlikeCard(likeButton, likeCounter, imageAttr['_id'])
        } else {
            likeCard(likeButton, likeCounter, imageAttr['_id'])
        }
    })

    return cardElement
}