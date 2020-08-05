import "./pages/index.css";
import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';
import {
    defaultConfig,
    addCardForm,
    editProfileForm,
    cardTemplateSelector,
    editButton,
    list,
    addPhotoButton,
    inputName,
    inputTitle
} from "./utils/constants.js";

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-3",
    headers: {
        authorization: "bbe6c8a6-0cbf-4192-8ad0-65526caf9994",
        "Content-Type": "application/json"
    }
});

api.getUserInfo()
    .then(res => {
        profile.setUserInfo({ name: res.name, title: res.about });
    })

function getUserID() {
    api.getUserInfo()
    .then(res => {
        return res._id;
    })
}

api.getCardList().then(res => {
    const cardList = new Section({
        items: res,
        renderer: (data) => {
            const card = new Card({
                data,
                handleCardClick: () => {
                    imageModal.open(data);
                },
                handleDeleteClick: (cardID) => {
                    api.removeCard(cardID);
                }
            },
                cardTemplateSelector);
            const cardElement = card.createCard();
            cardList.addItem(cardElement);
            api.getUserInfo()
            .then(res => {
                if (res._id !== data.owner._id) {
                    card.hideTrashButton();
                }
                })
        }
    }, list
    );
    cardList.renderItems();

    const addPhotoForm = new PopupWithForm({
        popupSelector: ".popup_type_add-photo",
        handleFormSubmit: (data) => {
            api.addCard(data)
                .then(res => {
                    const newCard = new Card({
                        data,
                        handleCardClick: () => {
                            imageModal.open(data);
                        },
                        handleDeleteClick: (cardID) => {
                            api.removeCard(cardID);
                        }
                    },
                        cardTemplateSelector);
                    cardList.addItem(newCard.createCard());
                    addPhotoForm.close();
                })
        }
    });

    addPhotoForm.setEventListeners();
    addPhotoButton.addEventListener('click', () => {
        addPhotoForm.open();
    });
})

const profile = new UserInfo('.profile__name', '.profile__title');



const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

const imageModal = new PopupWithImage('.popup_type_image');

imageModal.setEventListeners();



const profileForm = new PopupWithForm({
    popupSelector: ".popup_type_edit-profile",
    handleFormSubmit: (data) => {
        profile.setUserInfo(data); 
        api.setUserInfo(data);
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




