import {closeModal} from "./modal";
import {applyNewCard, setProfileAvatar, setProfileName} from "./applyInDOM";
import {patchUserAvatar, patchUserData, postCard} from "./api";

export function handleCardCreationFormSubmit(evt, formCard, popupNewCard, createCardCallback, onPending, onError) {
    evt.preventDefault();
    const cardInfo =
        {
            name: formCard.elements['place-name'].value,
            link: formCard.elements.link.value
        };

    onPending()
    postCard(cardInfo).then((res) => {
        createCardCallback(res)
        closeModal(popupNewCard);
    }).catch(onError)
}

export function editFormProfile(evt, profileTitle, profileDescription, popupNewCard, onPending, onError) {
    evt.preventDefault()
    const {name, description} = evt.target.elements
    onPending()
    patchUserData(name.value, description.value).then((res) => {
        setProfileName(profileTitle, profileDescription, res.name, res.about)
        closeModal(popupNewCard);
    }).catch(onError)
}

export function editProfileAvatar(evt, popupAvatar, profileImage, onPending, onError) {
    evt.preventDefault()
    const {avatar} = evt.target.elements
    console.log({avatar})
    onPending()
    patchUserAvatar(avatar.value).then((res) => {
        setProfileAvatar(profileImage, res.avatar)
        closeModal(popupAvatar);
    }).catch(onError)
}