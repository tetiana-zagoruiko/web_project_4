class Card {
    constructor({ data, handleCardClick, handleDeleteClick }, cardTemplateSelector) {
        this._link = data.link;
        this._text = data.name;
        this._id = data._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._sendLike = true;

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
        const cardLikeButton = this._card.querySelector('.photo__like-button');
        const cardRemoveButton = this._card.querySelector('.photo__remove');
        const cardImage = this._card.querySelector('.photo__image');

        cardLikeButton.addEventListener('click', (evt) =>  this._handleLikeIcon(evt));
        cardRemoveButton.addEventListener('click', () => this._handleDeleteClick(this._id));
        cardImage.addEventListener('click', () => this._handleCardClick({ link: this._link, name: this._text}));
    }

    hideTrashButton() {
        this._card.querySelector('.photo__remove').classList.add('photo__remove_hide');
    }


    _handleLikeIcon(evt) {
        evt.target.classList.toggle('photo__like_active');
        this._sendLike = !this._sendLike;
        console.log(this._sendLike);
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
        if (typeof this._likes !== "undefined") {
            this._card.querySelector('.photo__like-count').textContent = this._likes.length;
        };
        this._addEventListeners();

        return this._card;
    }
}

export default Card;
