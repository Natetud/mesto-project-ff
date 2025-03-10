function closeByButton(evt) {
  if (evt.target.classList.contains('popup__close')) {
      closeModal(getActiveModal());
  }
}
function getActiveModal() {
  return document.querySelector('.popup_is-opened');
}
function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
      closeModal(getActiveModal());
  }
}
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
      closeModal(getActiveModal())
  }
}

function openModal(modalWindow) {

  modalWindow.classList.add('popup_is-opened');

  modalWindow.addEventListener('click', closeByButton);
  modalWindow.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEscape);
}

// Закрытие модального окна
function closeModal(modalWindow) {


  modalWindow.classList.remove('popup_is-opened');

  modalWindow.removeEventListener('click', closeByButton);
  modalWindow.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEscape);
}

// Открытие модального окна с параметрами: картинка, текст
function openCardModal(imageSrc, paragraphText) {
  function setImageAttr(imageSrc, paragraphText) {
      imagePopup.src = imageSrc;
      imagePopup.alt = paragraphText;
      paragraphPopup.textContent = paragraphText;
  }

  setImageAttr(imageSrc, paragraphText);
  openModal(popupImage);
}