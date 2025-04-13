const showInputError = (formElement, inputElement, validationMessage) => {
  const errorMessageElement = document.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add("modal__input_type_error");
  errorMessageElement.textContent = validationMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove("modal__input_type_error");
  errorMessageElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.classList.remove("modal__submit-button-inactive");
    buttonElement.disabled = false;
  }
};

const disableButton = (buttonElement) => {
  buttonElement.classList.add("modal__submit-button-inactive");
  buttonElement.disabled = true;
};

const resetValidation = (formElement, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input);
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__submit-button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
