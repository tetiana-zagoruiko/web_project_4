class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(e) {
        e.preventDefault();
        if (e.which === 27) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close').addEventListener('click', (e) => {
            this.close();
        })
    }
}

export default Popup;
