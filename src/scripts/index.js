import '../pages/index.css';
import {initialCards} from './cards'
import {closeModal, openModal} from './modal'
import {editFormProfile, editProfileAvatar, handleCardCreationFormSubmit} from "./submits";
import {applyNewCard, setProfileAvatar, setProfileInfo, setProfileName} from "./applyInDOM";
import {clearValidation, enableValidation} from "./validation";
import {getCards, getUserData, patchUserData} from "./api";
import {createCard} from "./createCard";
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
const editProfileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImage = document.querySelector('.popup_type_image');
const imagePopup = document.querySelector('.popup__image');
const paragraphPopup = document.querySelector('.popup__caption');


let userId = -1

function getData() {
    Promise.all([getUserData(), getCards()])
        .then(([userData, cardsData]) => {

            console.log({
                userData,
                cardsData
            })

            userId = userData['_id'];
            setProfileName(profileTitle, profileDescription, userData.name, userData.about)
            setProfileAvatar(profileImage, userData.avatar)
            initialApiCards(cardsData, userId);
        })
        .catch((err) => console.log(err))
}

function initialApiCards(apiDataList, userId) {
    apiDataList.reverse().forEach(item => applyNewCard(item, cardTemplate, (src, title) => {
        // Обработчик открытия карточки в модальном окне
        imagePopup.src = src;
        imagePopup.alt = title;
        paragraphPopup.textContent = title;
        openModal(popupImage);
    }, placesList, userId));
}

getData()

enableValidation()

addButton.addEventListener('click', () => {
    // Очистка полей ввода перед открытием формы
    formCard.reset()
    const formButton = formProfile.querySelector('.popup__button');
    formButton.textContent = 'Создать'
    clearValidation(formCard);
    openModal(popupNewCard);
});

editButton.addEventListener('click', () => {
    const formButton = formProfile.querySelector('.popup__button');
    formButton.textContent = 'Сохранить'
    clearValidation(formProfile);
    setProfileInfo(formProfile, profileTitle, profileDescription);
    openModal(popupProfile);
});

formCard.addEventListener(
    'submit',
    (e => handleCardCreationFormSubmit(e, formCard, popupNewCard, (res) => {
                applyNewCard(res, cardTemplate, (src, title) => {
                    // Обработчик открытия карточки в модальном окне
                    imagePopup.src = src;
                    imagePopup.alt = title;
                    paragraphPopup.textContent = title;
                    openModal(popupImage);
                }, placesList, userId)
            }, () => {
                const formButton = formCard.querySelector('.popup__button');
                formButton.textContent = 'Создание...'
            },
            (e) => {
                const formButton = formCard.querySelector('.popup__button');
                formButton.textContent = 'Ошибка создания места';
            }
        )
    )
);

formProfile.addEventListener('submit', (evt) => editFormProfile(evt, profileTitle, profileDescription, popupProfile, () => {
    const formButton = formProfile.querySelector('.popup__button');
    formButton.textContent = 'Сохранение...'
}), (e) => {
    const formButton = formProfile.querySelector('.popup__button');
    formButton.textContent = 'Ошибка редактирования профиля';
});

function setImageAttr(imageSrc, paragraphText) {
    imagePopup.src = imageSrc;
    imagePopup.alt = paragraphText;
    paragraphPopup.textContent = paragraphText;
}



avatarButton.addEventListener('click', () => {
    console.log({formAvatar, })
    clearValidation(formAvatar);
    const formButton = formAvatar.querySelector('.popup__button');
    formButton.textContent = 'Сохранить аватар'
    openModal(popupAvatar);
});

popupAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editProfileAvatar(evt, popupAvatar, profileImage, () => {
        const formButton = formAvatar.querySelector('.popup__button');
        formButton.textContent = 'Сохранение...'
    }, (e) => {
        const formButton = formAvatar.querySelector('.popup__button');
        formButton.textContent = 'Ошибка редактирования аватара';
    })


    // patchUserAvatar(formAvatar.elements.avatar.value)
    //     .then(res => {
    //         setApiUserInfo(profileTitle, profileDescription, profileImage, res);
    //         changeButtonStatus(formAvatar, false);
    //         closeModal(popupAvatar);
    //     })
    //     .catch((err) => {
    //         changeButtonStatus(formAvatar, false, true);
    //         console.log(err);
    //     });
});
