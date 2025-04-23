import '../pages/index.css';
import {initialCards} from './cards'
import {openModal} from './modal'
import {editFormProfile, handleCardCreationFormSubmit} from "./submits";
import {applyNewCard, setProfileInfo} from "./applyInDOM";
// Карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const formCard = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
// Профиль
const formProfile = document.forms['edit-profile'];
const editProfileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImage = document.querySelector('.popup_type_image');
const imagePopup = document.querySelector('.popup__image');
const paragraphPopup = document.querySelector('.popup__caption');

function initialCardsInDOM(dataList) {
    dataList.forEach((cardData) => applyNewCard(
        cardData,
        cardTemplate,
        (src, title) => {
            // Обработчик открытия карточки в модальном окне
            imagePopup.src = src;
            imagePopup.alt = title;
            paragraphPopup.textContent = title;
            openModal(popupImage);
        },
        placesList));
}

initialCardsInDOM(initialCards)

addButton.addEventListener('click', () => {
    // Очистка полей ввода перед открытием формы
    formCard.reset()
    openModal(popupNewCard);
});

formCard.addEventListener(
    'submit',
    (e => handleCardCreationFormSubmit(e, formCard, cardTemplate, placesList, popupNewCard, (src, title) => {
            // Обработчик открытия карточки в модальном окне
            imagePopup.src = src;
            imagePopup.alt = title;
            paragraphPopup.textContent = title;
            openModal(popupImage);
        })
    )
);
editProfileButton.addEventListener('click', () => {
    setProfileInfo(formProfile, profileTitle, profileDescription);
    openModal(popupProfile);
});
formProfile.addEventListener('submit', (evt) => editFormProfile(evt, profileTitle, profileDescription, popupProfile));
