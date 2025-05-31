import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

const avatar = document.querySelector(".profile__avatar");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fb5b0323-edd5-4941-8b0a-dcd83a4212f5",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardslist.prepend(cardElement);
    });
    avatar.src = userInfo.avatar;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .catch(console.error);

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardModalButton = document.querySelector(".profile__add-button");
const editProfileModal = document.querySelector("#editProfileModal");
const previewModal = document.querySelector("#preview-modal");
const deleteForm = document.querySelector("#delete-form");
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

let selectedCard;
let selectedCardId;

const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarButton = document.querySelector(".avatar__edit-button");
const closeAvatarModalButton = editAvatarModal.querySelector(
  ".modal__close-button"
);
const avatarLink = editAvatarModal.querySelector("#add-profile-link-input");
const avatarProfilePic = document.querySelector(".profile__avatar");

const deleteModal = document.querySelector("#delete-modal");
const closeDeleteModal = deleteModal.querySelector(".modal__close-button");
const cancelDeleteModal = document.querySelector("#cancel-confirm-button");
const evtModals = [
  editProfileModal,
  cardModal,
  previewModal,
  deleteModal,
  editAvatarModal,
];

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  data.isLiked
    ? cardLikeButton.classList.add("card__like-button_liked")
    : cardLikeButton.classList.remove("card__like-button_liked");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardElement.id = data._id;
  cardElement.status = data.isLiked;

  cardLikeButton.addEventListener("click", (evt) =>
    handleLikeStatus(evt, data._id)
  );

  cardDeleteButton.addEventListener("click", (evt) => {
    openModal(deleteModal);
    selectedCard = data.name;
    selectedCardId = data._id;
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
  setButtonText(editFormElement, true, "Save", "Saving...");
  api
    .editUserInfo({
      name: modalNameInput.value,
      about: modalDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(editFormElement, false, "Save", "Saving...");
    });
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  setButtonText(cardForm, true, "Save", "Saving...");
  api
    .addNewCard({
      name: cardNameInput.value,
      link: cardLinkInput.value,
    })
    .then((inputValues) => {
      const cardElement = getCardElement(inputValues);
      cardslist.prepend(cardElement);
      evt.target.reset();
      disableButton(cardSubmitButton, settings);
      closeModal(cardModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardForm, false, "Save", "Saving...");
    });
}

function handleCardDelete(id) {
  setButtonText(deleteForm, true, "Delete", "Deleting...");
  api
    .deleteCard(id)
    .then(() => {
      document.getElementById(id).remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteForm, false, "Delete", "Deleting...");
    });
}

function handleLikeStatus(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api
    .handleLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_liked");
    })
    .catch(console.error);
}

function editUserProfilePic(avatar) {
  setButtonText(editAvatarModal, true, "Save", "Saving...");
  api
    .editUserProfilePic(avatarLink.value)
    .then((data) => {
      avatarProfilePic.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(editAvatarModal, false, "Save", "Saving...");
    });
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

closeDeleteModal.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleCardDelete(selectedCardId);
});

cancelDeleteModal.addEventListener("click", () => {
  closeModal(deleteModal);
});

editAvatarButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});

closeAvatarModalButton.addEventListener("click", () => {
  closeModal(editAvatarModal);
});

editAvatarModal.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editUserProfilePic(avatar);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleCardSubmit);

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

enableValidation(settings);
