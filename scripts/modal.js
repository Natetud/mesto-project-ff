export function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
  
    modalWindow.addEventListener('click', closeByButton);
    modalWindow.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', closeByEscape);
  }
  
  export function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
  
    modalWindow.removeEventListener('click', closeByButton);
    modalWindow.removeEventListener('click', closeByOverlay);
    document.removeEventListener('keydown', closeByEscape);
  }
  
  function closeByButton(evt) {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(getActiveModal());
    }
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
  
  function getActiveModal() {
    const activeModal = document.querySelector('.popup_is-opened');
    return activeModal;
  }
  