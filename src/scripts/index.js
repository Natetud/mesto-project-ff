import '../pages/index.css';
import {openModal} from './modal'
import {editFormProfile, editProfileAvatar, handleCardCreationFormSubmit} from "./submits";
import {applyNewCard, setProfileAvatar, setProfileInfo, setProfileName} from "./applyInDOM";
import {clearValidation, enableValidation} from "./validation";
import {getCards, getUserData} from "./api";

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const formCard = document.forms['new-place'];
const popupNewCard = document.querySelector('.popup_type_new-card');
// Профиль
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__edit-avatar-button');
const editButton = document.querySelector('.profile__edit-button');
const formAvatar = document.forms.editAvatar;
const profileImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formProfile = document.forms['edit-profile'];
const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImage = document.querySelector('.popup_type_image');
const imagePopup = document.querySelector('.popup__image');
const paragraphPopup = document.querySelector('.popup__caption');


let userId;

function getData() {
    Promise.all([getUserData(), getCards()])
        .then(([userData, cardsData]) => {
            userId = userData['_id'];
            setProfileName(profileTitle, profileDescription, userData.name, userData.about)
            setProfileAvatar(profileImage, userData.avatar)
            initialApiCards(cardsData, userId);
        })
        .catch((err) => console.error(err))
}

const openModalCallback = (src, title) => {
    // Обработчик открытия карточки в модальном окне
    imagePopup.src = src;
    imagePopup.alt = title;
    paragraphPopup.textContent = title;
    openModal(popupImage);
}

function initialApiCards(apiDataList, userId) {
    apiDataList.reverse().forEach(item => applyNewCard(item, cardTemplate, openModalCallback, placesList, userId));
}

getData()

enableValidation(validationConfig)

addButton.addEventListener('click', () => {
    // Очистка полей ввода перед открытием формы
    formCard.reset()
    clearValidation(formCard, validationConfig);
    openModal(popupNewCard);
});

editButton.addEventListener('click', () => {
    const formButton = formProfile.querySelector('.popup__button');
    formButton.textContent = 'Сохранить'
    clearValidation(formProfile, validationConfig);
    setProfileInfo(formProfile, profileTitle, profileDescription);
    openModal(popupProfile);
});

formCard.addEventListener(
    'submit',
    (e => handleCardCreationFormSubmit(e, formCard, popupNewCard, {
                onSuccess: (res) => {
                    applyNewCard(res, cardTemplate, (src, title) => {
                        // Обработчик открытия карточки в модальном окне
                        imagePopup.src = src;
                        imagePopup.alt = title;
                        paragraphPopup.textContent = title;
                        openModal(popupImage);
                        const formButton = formCard.querySelector('.popup__button');
                        formButton.textContent = 'Создать'
                    }, placesList, userId)
                },
                onPending: () => {
                    const formButton = formCard.querySelector('.popup__button');
                    formButton.textContent = 'Создание...'
                },
                onError: (e) => {
                    const formButton = formCard.querySelector('.popup__button');
                    formButton.textContent = 'Ошибка создания места';
                }
            },
        )
    )
);

formProfile.addEventListener('submit', (evt) => editFormProfile(evt, profileTitle, profileDescription, popupProfile, {
        onPending: () => {
            const formButton = formProfile.querySelector('.popup__button');
            formButton.textContent = 'Сохранение...'
        },
        onError: (e) => {
            const formButton = formProfile.querySelector('.popup__button');
            formButton.textContent = 'Ошибка редактирования профиля';
        }
    }
))

avatarButton.addEventListener('click', () => {
    clearValidation(formAvatar, validationConfig);
    const formButton = formAvatar.querySelector('.popup__button');
    formButton.textContent = 'Сохранить аватар'
    openModal(popupAvatar);
});

popupAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editProfileAvatar(evt, popupAvatar, profileImage, {
            onPending: () => {
                const formButton = formAvatar.querySelector('.popup__button');
                formButton.textContent = 'Сохранение...'
            },
            onError: (e) => {
                const formButton = formAvatar.querySelector('.popup__button');
                formButton.textContent = 'Ошибка редактирования аватара';
            }
        }
    )
});
