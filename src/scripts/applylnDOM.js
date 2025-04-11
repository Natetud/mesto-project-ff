import {createCard} from "./createCard";
import {openCardModal} from "./modal";

export function setProfileInfo(form, title, description) {
    form.elements.name.value = title.textContent;
    form.elements.description.value = description.textContent;
}

export function applyNewCard(card, cardTemplate, placesList) {
    const createdCard = createCard(card, cardTemplate, openCardModal);
    placesList.append(createdCard);
}

export function setProfileName(profileTitle, profileDescription, title, description) {
    profileTitle.textContent = title
    profileDescription.textContent = description
}