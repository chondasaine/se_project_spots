const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Griffin Wolldridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardModalButton = document.querySelector(".profile__add-button");
const editProfileModal = document.querySelector("#editProfileModal");
const previewModal = document.querySelector("#preview-modal");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__close-button"
);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const closePreviewModal = previewModal.querySelector(
  ".modal__close-button_preview"
);

const profileName = document.querySelector(".profile__name");
const modalNameInput = editProfileModal.querySelector("#profile-name-input");
const profileDescription = document.querySelector(".profile__description");
const modalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editFormElement = editProfileModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");
const cardslist = document.querySelector(".cards__list");

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const evtModals = [editProfileModal, cardModal, previewModal];

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalCaption.textContent = data.name;
    previewModalImage.alt = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("click", handleClickOutsideModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
  document.removeEventListener("click", handleClickOutsideModal);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardslist.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitButton, settings);
  closeModal(cardModal);
}

closeProfileModal.addEventListener("click", () => {
  closeModal(editProfileModal);
});

profileEditButton.addEventListener("click", () => {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editFormElement,
    [modalNameInput, modalDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

addCardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

closePreviewModal.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleCardSubmit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardslist.prepend(cardElement);
});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    evtModals.forEach((modal) => {
      if (modal.classList.contains("modal_opened")) {
        closeModal(modal);
      }
    });
  }
}

function handleClickOutsideModal(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}
