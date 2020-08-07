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
    inputTitle,
    avatar,
    formSave,
    myId
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
        avatar.src = res.avatar;
    })

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
                    const deleteForm = new PopupWithForm({
                        popupSelector: ".popup_type_delete-card",
                        handleFormSubmit: () => {
                            api.removeCard(cardID);
                            card.deleteCard();
                            deleteForm.close();
                        }
                    });
                    deleteForm.setEventListeners();
                    deleteForm.open();
                },
                handleLikeClick: (cardID) => {
                    if (card.wasLiked() === false) {
                        api.changeLikeCardStatus(cardID, true)
                            .then(res => {
                                const countLike = res.likes.length;
                                card.like(countLike);
                            })
                    } else {
                        api.changeLikeCardStatus(cardID, false)
                            .then(res => {
                                const countLike = res.likes.length;
                                card.dislike(countLike);
                            })
                    };
                },
                handleLikeIcon: () => {
                    if (data.likes.length > 0) {
                        data.likes.forEach(cardLikes => {
                            if (cardLikes._id === myId) {
                                card.likeAtRendering();
                            }
                        });
                    }
                },
                handleDeleteIcon: () => {
                    if (myId !== data.owner._id) {
                        card.hideTrashButton();
                    }
                },
            },
                cardTemplateSelector);
            const cardElement = card.createCard();
            cardList.addItem(cardElement);
        }
    }, list
    );
    cardList.renderItems();

    const addPhotoForm = new PopupWithForm({
        popupSelector: ".popup_type_add-photo",
        handleFormSubmit: (data) => {
            renderLoading(true);
            api.addCard(data)
                .then(res => {
                    const newCard = new Card({
                        data: res,
                        handleCardClick: () => {
                            imageModal.open(data);
                        },
                        handleDeleteClick: (cardID) => {
                            const deleteForm = new PopupWithForm({
                                popupSelector: ".popup_type_delete-card",
                                handleFormSubmit: () => {
                                    api.removeCard(cardID);
                                    newCard.deleteCard();
                                    deleteForm.close();
                                }
                            });
                            deleteForm.setEventListeners();
                            deleteForm.open();
                        },
                        handleLikeClick: (cardID) => {
                            if (newCard.wasLiked() === false) {
                                api.changeLikeCardStatus(cardID, true)
                                    .then(res => {
                                        const countLike = res.likes.length;
                                        newCard.like(countLike);
                                    })
                            } else {
                                api.changeLikeCardStatus(cardID, false)
                                    .then(res => {
                                        const countLike = res.likes.length;
                                        newCard.dislike(countLike);
                                    })
                            };
                        },
                        handleLikeIcon: () => {
                        },
                        handleDeleteIcon: () => {
                        },
                    },
                        cardTemplateSelector);
                    renderLoading(false);
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
        renderLoading(true);
        api.setUserInfo(data)
            .then(res => {
                profile.setUserInfo(data);
                renderLoading(false);
                profileForm.close();
            })

    }
});

profileForm.setEventListeners();
editButton.addEventListener('click', () => {
    const userInfo = profile.getUserInfo();
    inputName.placeholder = userInfo.name;
    inputTitle.placeholder = userInfo.title;
    profileForm.open();
});


const avatarForm = new PopupWithForm({
    popupSelector: ".popup_type_edit-avatar",
    handleFormSubmit: (data) => {
        renderLoading(true);
        api.setUserAvatar(data.link)
            .then(res => {
                avatar.src = data.link;
                renderLoading(false);
                avatarForm.close();
            })
    }
});

avatarForm.setEventListeners();
avatar.addEventListener('click', () => {
    avatarForm.open();    
});

function renderLoading(isLoading) {
    if (isLoading) {
        formSave.textContent += "...";
    } else {
        formSave.textContent = formSave.textContent.slice(0,-3);
    }
}