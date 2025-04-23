function closeModalByMouseClick(evt) {
  if (
      // Берем обработчик на всплытии.
      // Контейнеры попапа все имеют класс popup, поэтому регистрируем
      // закрытие попапа
      evt.target.classList.contains('popup')
      // Если таргетом клика была кнопка Х, закрываем попап
      || evt.target.classList.contains('popup__close')) {
      // Т.к. повесили обработчик на модальное окно, при бабблинге
      // в currentTarget будет всегда оно
      closeModal(evt.currentTarget);
  }
}

function getActiveModal() {
  return document.querySelector('.popup_is-opened');
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
      closeModal(getActiveModal())
  }
}

export function openModal(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
  modalWindow.addEventListener('click', closeModalByMouseClick);
  document.addEventListener('keydown', closeByEscape);
}

// Закрытие модального окна
export function closeModal(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');

  modalWindow.removeEventListener('click', closeModalByMouseClick);
  document.removeEventListener('keydown', closeByEscape);
}