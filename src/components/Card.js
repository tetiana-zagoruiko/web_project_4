class Card {
    constructor({ data, handleCardClick }, cardTemplateSelector) {
        this._link = data.link;
        this._text = data.name;
        this._handleCardClick = handleCardClick;

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
        cardImage.addEventListener('click', () => this._handleCardClick({ link: this._link, name: this._text}));
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
