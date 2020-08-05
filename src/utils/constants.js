export const defaultConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error"
};
export const editProfileModal = document.querySelector('.popup_type_edit-profile');
export const addPhotoModal = document.querySelector('.popup_type_add-photo');
export const addCardForm = addPhotoModal.querySelector('.form');
export const editProfileForm = editProfileModal.querySelector('.form');
export const cardTemplateSelector = '.photo-template';
export const editButton = document.querySelector('.profile__edit');
export const list = '.photo__container';
export const addPhotoButton = document.querySelector('.profile__add');
export const inputName = document.querySelector('.form__input_type_name');
export const inputTitle = document.querySelector('.form__input_type_title');
