class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick, handleLikeIcon, handleDeleteIcon }, cardTemplateSelector) {
        this._link = data.link;
        this._text = data.name;
        this._id = data._id;
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._handleLikeIcon = handleLikeIcon;
        this._handleDeleteIcon = handleDeleteIcon;
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
    _cardLikeButton() {
        return this._card.querySelector('.photo__like-button');
    }

    _photoLikeCount() {
        return this._card.querySelector('.photo__like-count');
    }

    _cardRemoveButton() {
        return this._card.querySelector('.photo__remove');
    }

    _cardImage() {
        return this._card.querySelector('.photo__image');
    }

    _addEventListeners() {
        this._cardLikeButton().addEventListener('click', () => this._handleLikeClick(this._id));
        this._cardRemoveButton().addEventListener('click', () => this._handleDeleteClick(this._id));
        this._cardImage().addEventListener('click', () => this._handleCardClick({ link: this._link, name: this._text}));
    }

    hideTrashButton() {
        this._cardRemoveButton().classList.add('photo__remove_hide');
    }

    deleteCard() {
        this._card.remove();
        this._card = null; 
    }


    wasLiked() {
        return this._cardLikeButton().classList.contains("photo__like_active");
    }

    like(countLike) {
        this._cardLikeButton().classList.add('photo__like_active');
        this._photoLikeCount().textContent = countLike;
    }

    dislike(countLike) {
        this._cardLikeButton().classList.remove('photo__like_active');
        this._photoLikeCount().textContent = countLike;
    }

    likeAtRendering() {
        this._cardLikeButton().classList.add('photo__like_active');
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

        this._cardImage().style.backgroundImage = `url(${this._link})`;
        this._card.querySelector('.photo__text').textContent = this._text;
        if (typeof this._likes !== "undefined") {
            this._photoLikeCount().textContent = this._likes.length;
        };
        this._addEventListeners();
        this._handleLikeIcon();
        this._handleDeleteIcon();

        return this._card;
    }
}

export default Card;
