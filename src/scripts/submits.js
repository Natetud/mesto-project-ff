import {createCard} from "./createCard";
import {closeModal, openCardModal} from "./modal";
import {setProfileName} from "./applylnDOM";

export function handleFormSubmit(evt, formCard, cardTemplate, placesList, popupNewCard) {
    evt.preventDefault();
    const cardInfo =
        {
            name: formCard.elements['place-name'].value,
            link: formCard.elements.link.value
        };
    const createdCard = createCard(cardInfo, cardTemplate, openCardModal);
    placesList.prepend(createdCard);
    closeModal(popupNewCard);
}

export function editFormProfile(evt, profileTitle, profileDescription, popupNewCard) {
    evt.preventDefault()
    const {name, description} = evt.target.elements
    setProfileName(profileTitle, profileDescription, name.value, description.value)
    closeModal(popupNewCard);
}