import {createCard} from "./createCard";

export function setProfileInfo(form, title, description) {
    form.elements.name.value = title.textContent;
    form.elements.description.value = description.textContent;
}

export function applyNewCard(card, cardTemplate, openCardModal, placesList, userId) {
    const createdCard = createCard(
        card,
        cardTemplate,
        openCardModal,
        userId
    );
    placesList.prepend(createdCard);
}

export function setProfileName(profileTitle, profileDescription, title, description) {
    profileTitle.textContent = title
    profileDescription.textContent = description
}

export function setProfileAvatar(avatar, avatarUrl) {
    avatar.style.backgroundImage = 'url(' + avatarUrl + ')';
}