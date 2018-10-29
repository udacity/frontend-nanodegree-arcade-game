// create modal
const modal = document.createElement("div");
document.body.appendChild(modal);
modal.id = "modal";
modal.class = "play-again";

// Create modal content
const modalHeading = document.createElement("h1");

let headerText = document.createTextNode("");
document.body.appendChild(modalHeading);
modalHeading.appendChild(headerText);
modal.appendChild(modalHeading);


// Get the button that closes the modal
const buttonText = document.createTextNode("Play again");
const modalButton = document.createElement("button");
modalButton.appendChild(buttonText);
modal.appendChild(modalButton);
modalButton.id = "modalButton";

// When the user clicks on the button, open the modal
modalButton.onclick = function() {
  modal.style.display = "none";
  restartGame();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
