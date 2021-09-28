const documentScreen = document.querySelector(".screen");
const documentNumberButtons = document.querySelectorAll(".button-number");

function updateScreen(text){
    documentScreen.textContent+=text;
}
function deleteLastNumber(){
    const currentText = documentScreen.textContent;
    documentScreen.textContent = currentText.slice(0,-1);
}
