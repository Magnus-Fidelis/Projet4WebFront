function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModal = document.querySelector(".close");

const firstname = document.getElementById("first");
const lastname = document.getElementById("last");
const emails = document.getElementById("email");
const date = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const city = document.getElementById("city");
const checkbox1 = document.getElementById("checkbox1");

const valid = document.querySelector(".valid");
const formvalid = document.querySelector(".formvalid");

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
closeModal.addEventListener("click", closeModa);
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModa() {
  modalbg.style.display = "none";
}

/** description validateform
 * @params Reçoit le formulaire html sur l'event onsubmit via formdata
 * @returns Retourne à l'utilisateur les champs ayant les erreurs sur son
 * navigateur
 *
 *
 */

function validateForm() {
  var oneRadio = false;
  var error = false;
  formData.forEach(formdata => {
    // La fonction va boucler sur chaque formData du formulaire
    for (let i = 0; i < formdata.children.length; i++) {
      let formchildren = formdata.children[i];
      if (formchildren.tagName == "INPUT") {
        switch (formchildren.type) {
          // On vérifie à quel type elle appartient
          case "text":
            if (formchildren.value.length < 2) {
              if (formchildren.id == "first") {
                setError(
                  firstname,
                  "le prénom ne doit pas faire moins de deux caractères"
                );
              } else {
                setError(
                  lastname,
                  "le nom ne doit pas faire moins de deux caractères"
                );
              }
              error = true;
              return false;
            } else {
              // Si le type est bon, on fait l'étape inverse pour que l'erreur ne s'affiche pas/plus
              if (formchildren.id == "first") {
                unsetError(firstname);
              } else {
                unsetError(lastname);
              }
            }

            break;
          case "email":
            let email = emailIsValid(formchildren.value);
            if (email == false || formchildren.value.length < 1) {
              setError(
                emails,
                "L'email que vous avez indiqué n'est pas correct"
              );
              error = true;
              return false;
            } else {
              unsetError(emails);
            }
            break;
          case "date":
            if (!formchildren.value) {
              setError(date, "vous devez indiquer une date de naissance");
              error = true;
              return false;
            } else {
              unsetError(date);
            }
            break;
          case "number":
            if (!formchildren.checkValidity()) {
              setError(
                quantity,
                "Veuillez indiquer à combien de tournois vous avez participé"
              );
            } else {
              unsetError(quantity);
            }
          case "radio":
            if (formchildren.checked) {
              oneRadio = true;
            }
            break;
          case "checkbox":
            if (formchildren.id == "checkbox1") {
              if (!formchildren.checked) {
                console.log("ici");
                setError(
                  checkbox1,
                  "Veuillez accepter les conditions d'utilisations"
                );
                error = true;
              } else {
                unsetError(checkbox1);
              }
            }

          default:
            break;
        }
      }
    }
  });
  if (oneRadio == false && quantity.value > 0) {
    // Si une case n'a pas été coché et qu'il y a plus d'une ville de signalé alors il faut indiquer quel ville
    city.setAttribute("data-error-visible", "true");
    city.setAttribute("data-error", "Veuillez indiquer la ville !");
    error = true;
  } else {
    city.setAttribute("data-error-visible", "false");
    city.removeAttribute("data-error");
  }
  if (error == false) {
    // si le formulaire ne contient aucune erreur on fait apparaître le message de validation
    valid.style.display = "flex";
    formvalid.style.display = "none";
  }
}

// vérifie si l'email est valide avec un régex
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Ajoute un style css pour prévenir que le formulaire n'est pas valide.
function setError(element, message) {
  element.parentElement.setAttribute("data-error-visible", "true");
  element.parentElement.setAttribute("data-error", message);
}

function unsetError(element) {
  element.parentElement.setAttribute("data-error-visible", "false");
  element.parentElement.removeAttribute("data-error");
}
