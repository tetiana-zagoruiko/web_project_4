function togglePopup(modal) {
    modal.classList.toggle('popup_opened');
}

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
        cardRemoveButton.addEventListener('click', this._handleDeleteCard);
        cardImage.addEventListener('click', () => this._handlePreviewPicture(this._link, this._text));
    }

    _handleLikeIcon(evt) {
        evt.target.classList.toggle('photo__like_active');
    }

    _handleDeleteCard(evt) {
        evt.target.closest('.photo__item').remove();
    }

    _handlePreviewPicture(link, text) {
        const imageModal = document.querySelector('.popup_type_image');
        togglePopup(imageModal);
        imageModal.querySelector('.figure__image').src = `${link}`;
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
