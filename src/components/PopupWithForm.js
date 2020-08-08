import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector); 
        this._handleFormSubmit = handleFormSubmit;

        this._popupElement = document.querySelector(popupSelector);
        this._inputList = this._popupElement.querySelectorAll(".form__input");
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setDeleteHandler(handler) {
        this._handleFormSubmit = handler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        this._inputList.forEach(input => input.value = "");
        super.close();
    }

}

export default PopupWithForm;
