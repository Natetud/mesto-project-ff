import { createCard, deleteCard, likeCard } from "./createCard";

export function setProfileInfo(form, title, description) {
    form.elements.name.value = title.textContent;
    form.elements.description.value = description.textContent;
}

export function applyNewCard(card, cardTemplate, openCardModal, placesList) {
    const createdCard = createCard(
        card,
        cardTemplate,
        openCardModal,
        (cardElement) => {
            //Доп. условия для API, в других коллбеках аналогично
            deleteCard(cardElement)
        },
        likeCard
    );
    placesList.append(createdCard);
}

export function setProfileName(profileTitle, profileDescription, title, description) {
    profileTitle.textContent = title
    profileDescription.textContent = description
}