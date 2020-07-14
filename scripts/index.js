import FormValidator from './FormValidator.js';
import Card from './Card.js';

const defaultConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save",
    inactiveButtonClass: "form__save_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error"
};

const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addPhotoModal = document.querySelector('.popup_type_add-photo');

const addCardForm = addPhotoModal.querySelector('.form');
const editProfileForm = editProfileModal.querySelector('.form');

const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();


// Wrappers
const allModals = document.querySelectorAll('.popup');
const imageModal = document.querySelector('.popup_type_image');
const form = document.querySelector('.form');
const cardTemplateSelector = '.photo-template';

//Buttons and other DOM elements
const editButton = document.querySelector('.profile__edit');
const editProfileCloseButton = editProfileModal.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add');
const addPhotoCloseButton = addPhotoModal.querySelector('.popup__close');
const imageCloseButton = imageModal.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileName = document.querySelector('.profile__name');
const list = document.querySelector('.photo__container');

//Form data
const inputName = editProfileModal.querySelector('.form__input_type_name');
const inputTitle = editProfileModal.querySelector('.form__input_type_title');
const photoTitle = addPhotoModal.querySelector('.form__input_type_photo-title');
const photoUrl = addPhotoModal.querySelector('.form__input_type_photo-url');

const openModal = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscape);
};

const closeModal = (modal) => {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscape);
};

allModals.forEach((modal) => {
    modal.addEventListener('click', evt => {
        if (evt.target === modal) {
            closeModal(modal);
        }
    });
});

const handleEscape = (e) => {
    e.preventDefault();
    const openedPopups = document.querySelector('.popup_opened');
    if (e.which === 27) {
        closeModal(openedPopups);
    }
};

function formSubmitHandler(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileTitle.textContent = inputTitle.value;
    closeModal(editProfileModal);
}

editButton.addEventListener('click', () => {
    openModal(editProfileModal);
});

editProfileCloseButton.addEventListener('click', () => {
    closeModal(editProfileModal);
});

addButton.addEventListener('click', () => {
    openModal(addPhotoModal);
});

addPhotoCloseButton.addEventListener('click', () => {
    closeModal(addPhotoModal);
});

imageCloseButton.addEventListener('click', () => {
    closeModal(imageModal);
});



const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];


const renderCard = (data) => {
    const card = new Card(data, cardTemplateSelector);
    list.prepend(card.createCard());
}

initialCards.forEach(renderCard);

function photoSubmitHandler(e) {
    e.preventDefault();
    const newCard = {
        name: photoTitle.value,
        link: photoUrl.value
    };
    renderCard(newCard);
    closeModal(addPhotoModal);
}

addPhotoModal.addEventListener('submit', photoSubmitHandler);
form.addEventListener('submit', formSubmitHandler);
