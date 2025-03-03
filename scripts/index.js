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
];

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#editProfileModal");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__close-button"
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

function getCardElement(data) {
  const CardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameElement = CardElement.querySelector(".card__title");
  const cardImageElement = CardElement.querySelector(".card__image");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return CardElement;
}

function openModal() {
  modalNameInput.value = profileName.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  editProfileModal.classList.add("modal_opened");
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

function handelEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = modalNameInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal();
}

closeProfileModal.addEventListener("click", closeModal);
profileEditButton.addEventListener("click", openModal);
editFormElement.addEventListener("submit", handelEditFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const CardElement = getCardElement(initialCards[i]);
  cardslist.prepend(CardElement);
}
