class FormValidator {
    constructor(setting, formElement) {
        this._inputSelector = setting.inputSelector;
        this._submitButtonSelector = setting.submitButtonSelector;
        this._inactiveButtonClass = setting.inactiveButtonClass;
        this._inputErrorClass = setting.inputErrorClass;
        this._errorClass = setting.errorClass;
        this._formElement = formElement;
    }

    _showErrorMessage(input) {
        const error = this._formElement.querySelector('#' + input.id + '-error');
        input.classList.add(this._inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
        
    }
 
    _hideErrorMessage(input) {
        const error = this._formElement.querySelector('#' + input.id + '-error');
        error.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
        error.textContent = '';
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideErrorMessage(input);
        } else {
            this._showErrorMessage(input);
        }
    }

    _hasInvalidInput(inputs) {
        return inputs.some((input) => {
            return !input.validity.valid;
        });
    }

    _toggleButtonState(inputs, button) { 
        if (this._hasInvalidInput(inputs)) {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        } else {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        }
    }
 
    _setEventListeners() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const button = this._formElement.querySelector(this._submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState(inputs, button);
            });
        });
    };

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        this._setEventListeners();
    };
}

export default FormValidator;
