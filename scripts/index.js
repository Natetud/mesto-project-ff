// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const imagePopup = document.querySelector('.popup__image');
const paragraphPopup = document.querySelector('.popup__caption');

// @todo: Функция создания карточки
function createCard(imageAttr, cardTemplate, openCardModal) {
    const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = imageAttr.name;
    cardImage.src = imageAttr.link;
    cardImage.alt = imageAttr.name;

    // Удаление карточки
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement)
    });
    cardImage.addEventListener('click', () => {
        openCardModal(cardImage.src, cardTitle.textContent);
    })

    return cardElement
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function initialCardsInDOM(dataList) {
    dataList.forEach(item => {
        console.log({item})
        const createdCard = createCard(item, cardTemplate, openCardModal);
        placesList.append(createdCard);
    });
}
initialCardsInDOM(initialCards)