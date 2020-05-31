const editButton = document.querySelector('.profile__edit');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const inputName = document.querySelector('.form__input_type_name');
const inputTitle = document.querySelector('.form__input_type_title');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');

function togglePopup() {
    popup.classList.toggle('popup_opened');
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
}

editButton.addEventListener('click', togglePopup);

popupCloseButton.addEventListener('click', togglePopup);

const form = document.querySelector('.form');

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    profileName.textContent = inputName.value;
    profileTitle.textContent = inputTitle.value;

    togglePopup();
})