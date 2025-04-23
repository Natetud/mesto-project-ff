import {createCard, deleteCard, likeCard} from "./createCard";
import {closeModal} from "./modal";
import {setProfileName} from "./applyInDOM";

export function handleCardCreationFormSubmit(evt, formCard, cardTemplate, placesList, popupNewCard, openCardModal) {
    evt.preventDefault();
    const cardInfo =
        {
            name: formCard.elements['place-name'].value,
            link: formCard.elements.link.value
        };
    const createdCard = createCard(
        cardInfo,
        cardTemplate,
        openCardModal,
        deleteCard,
        likeCard
    );

    placesList.prepend(createdCard);
    closeModal(popupNewCard);
}

export function editFormProfile(evt, profileTitle, profileDescription, popupNewCard) {
    evt.preventDefault()
    const {name, description} = evt.target.elements
    setProfileName(profileTitle, profileDescription, name.value, description.value)
    closeModal(popupNewCard);
}