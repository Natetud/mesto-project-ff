function deleteCard(cardElement) {
    cardElement.remove();
}
function likeCard(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.classList.toggle('card__like-button_is-active');
}

export function createCard(imageAttr, cardTemplate, openCardModal) {
    const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardTitle.textContent = imageAttr.name;
    cardImage.src = imageAttr.link;
    cardImage.alt = imageAttr.name;

    // Удаление карточки
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement)
    });
    // Открытие модального окна с просмотром карточки
    cardImage.addEventListener('click', () => {
        openCardModal(cardImage.src, cardTitle.textContent);
    })
    // Обработчик нажатия на лайк
    likeButton.addEventListener('click', () => {
        likeCard(cardElement)
    });
    return cardElement
}