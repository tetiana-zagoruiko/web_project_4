const openModal = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscape);
};

const closeModal = (modal) => {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscape);
};

const handleEscape = (e) => {
    e.preventDefault();
    const openedPopups = document.querySelector('.popup_opened');
    if (e.which === 27) {
        closeModal(openedPopups);
    }
};

class Card {
    constructor(data, cardTemplateSelector) {
        this._link = data.link;
        this._text = data.name;

        this._cardTemplateSelector = cardTemplateSelector
    }

    _getCardTemplate() {
        const cardTemplate = document
        .querySelector(this._cardTemplateSelector)
        .content
        .querySelector('.photo__item')
        .cloneNode(true);

        return cardTemplate;

    }

    _addEventListeners() {
        const cardLikeButton = this._card.querySelector('.photo__like');
        const cardRemoveButton = this._card.querySelector('.photo__remove');
        const cardImage = this._card.querySelector('.photo__image');

        cardLikeButton.addEventListener('click', this._handleLikeIcon);
        cardRemoveButton.addEventListener('click', () => this._handleDeleteCard());
        cardImage.addEventListener('click', () => this._handlePreviewPicture(this._link, this._text));
    }

    _handleLikeIcon(evt) {
        evt.target.classList.toggle('photo__like_active');
    }

    _handleDeleteCard() {
        this._card.remove();
        this._card = null;
    }

    _handlePreviewPicture(link, text) {
        const imageModal = document.querySelector('.popup_type_image');
        const figureImage = imageModal.querySelector('.figure__image');
        figureImage.src = `${link}`;
        figureImage.alt = `The image of ${text}`;
        imageModal.querySelector('.figure__caption').textContent = text;
        openModal(imageModal);
    }

    createCard() {
        const element = this._getCardTemplate();

        this._card = element;

        this._card.querySelector('.photo__image').style.backgroundImage = `url(${this._link})`;
        this._card.querySelector('.photo__text').textContent = this._text;

        this._addEventListeners();

        return this._card;
    }
}

export default Card;
