import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(data) {
        this._popupElement.querySelector('.figure__image').src = data.link;
        this._popupElement.querySelector('.figure__caption').textContent = data.name;
        super.open(); 
    }
}

export default PopupWithImage;
