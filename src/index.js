import "./pages/index.css";
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import {
    defaultConfig,
    editProfileModal,
    addPhotoModal,
    addCardForm,
    editProfileForm,
    cardTemplateSelector,
    editButton,
    list,
    addPhotoButton,
    initialCards,
    inputName,
    inputTitle
} from "./utils/constants.js";

const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

const imageModal = new PopupWithImage('.popup_type_image');

const cardList = new Section({
        items: initialCards,
        renderer: (data) => {
            const card = new Card({
                data,
                handleCardClick: () => {
                    imageModal.open(data);
                    }
                },
                cardTemplateSelector); 
            const cardElement = card.createCard();
            cardList.addItem(cardElement);
        }
    }, list
);

cardList.renderItems();
imageModal.setEventListeners();

const profile = new UserInfo('.profile__name', '.profile__title');

const profileForm = new PopupWithForm({
    popupSelector: ".popup_type_edit-profile",
    handleFormSubmit: (data) => {
        profile.setUserInfo(data); 
        profileForm.close();
    }
});

profileForm.setEventListeners();
editButton.addEventListener('click', () => {
    const userInfo = profile.getUserInfo();
    inputName.placeholder = userInfo.name;
    inputTitle.placeholder = userInfo.title;
    profileForm.open();
});

const addPhotoForm = new PopupWithForm({
    popupSelector: ".popup_type_add-photo",
    handleFormSubmit: (data) => {
        const newCard = new Card({
            data,
            handleCardClick: () => {
                imageModal.open(data);
                }
            },
            cardTemplateSelector);
        const cardElement = newCard.createCard();
        cardList.addItem(cardElement);
        addPhotoForm.close();
    }
});

addPhotoForm.setEventListeners();
addPhotoButton.addEventListener('click', () => {
    addPhotoForm.open();
});