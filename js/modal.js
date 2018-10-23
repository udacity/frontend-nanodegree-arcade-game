// create modal
const modal = document.createElement("div");
document.body.appendChild(modal);
modal.id = "modal";

// Create modal content
const modalHeading = document.createElement("h1");

const headerText = document.createTextNode("");

//on player death
if(player.health <= 0){
  headerText = "You Died";
  modal.style.display = "inline";
}

//on player death
if(player.health <= 0){
  headerText = "You Died";
}

const headerText = document.createTextNode("Congratulations You Win");

document.body.appendChild(modalHeading);
modalHeading.appendChild(headerTextWin);
modal.appendChild(modalHeading);


// Get the button that closes the modal
const buttonText = document.createTextNode("Play agin");
const modalButton = document.createElement("button");
modalButton.appendChild(buttonText);
modal.appendChild(modalButton);
modalButton.id = "modalButton";

// When the user clicks on the button, open the modal
modalButton.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
