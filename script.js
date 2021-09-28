const documentScreen = document.querySelector(".screen");
const documentNumberButtons = document.querySelectorAll(".button-number");
const documentOperatorButtons = document.querySelectorAll(".button-operator");
const documentFunctionButtons = document.querySelectorAll(".button-function");


function updateScreen(text){
    documentScreen.textContent+=text;
}
function deleteLastNumber(){
    const currentText = documentScreen.textContent;
    documentScreen.textContent = currentText.slice(0,-1);
}

function pressedNumber(e){
    updateScreen(this.dataset["value"]);
}

documentNumberButtons.forEach(item => item.addEventListener("click",pressedNumber));