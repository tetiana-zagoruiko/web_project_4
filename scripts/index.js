// Wrappers
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addPhotoModal = document.querySelector('.popup_type_add-photo');
const imageModal = document.querySelector('.popup_type_image');
const form = document.querySelector('.form');

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


function togglePopup(modal) {
    modal.classList.toggle('popup_opened');
}


function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileTitle.textContent = inputTitle.value;
    togglePopup(editProfileModal);
}

form.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', () => {
    togglePopup(editProfileModal);
});

editProfileCloseButton.addEventListener('click', () => {
    togglePopup(editProfileModal);
});

addButton.addEventListener('click', () => {
    togglePopup(addPhotoModal);
});
addPhotoCloseButton.addEventListener('click', () => {
    togglePopup(addPhotoModal);
});

imageCloseButton.addEventListener('click', () => {
    togglePopup(imageModal);
});

window.onclick = function (event) {
    if (event.target == imageModal) {
        togglePopup(imageModal);
    } else if (event.target == editProfileModal) {
        togglePopup(editProfileModal);
    } else if (event.target == addPhotoModal) {
        togglePopup(addPhotoModal);
    }
}


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

const cardTemplate = document.querySelector('.photo-template').content.querySelector('.photo__item');

const createCard = (data) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector('.photo__text');
    const cardImage = cardElement.querySelector('.photo__image');
    const cardLikeButton = cardElement.querySelector('.photo__like');
    const cardRemoveButton = cardElement.querySelector('.photo__remove');
    const figureImage = imageModal.querySelector('.figure__image');
    const figureCaption = imageModal.querySelector('.figure__caption');

    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('photo__like_active');
    });

    cardRemoveButton.addEventListener('click', (e) => {
        e.target.closest('.photo__item').remove();
    });

    cardImage.addEventListener('click', () => {
        togglePopup(imageModal);
        figureImage.src = `${data.link}`;
        figureCaption.textContent = data.name;
    })
    return cardElement;
}


const renderCard = (data) => {
    list.prepend(createCard(data));
}

initialCards.forEach(renderCard);

function photoSubmitHandler(event) {
    event.preventDefault();
    const newCard = {
        name: photoTitle.value,
        link: photoUrl.value
    };
    renderCard(newCard);
    togglePopup(addPhotoModal);
}

addPhotoModal.addEventListener('submit', photoSubmitHandler);