const documentScreen = document.querySelector(".screen");
const documentNumberButtons = document.querySelectorAll(".button-number");
const documentOperatorButtons = document.querySelectorAll(".button-operator");
const documentFunctionButtons = document.querySelectorAll(".button-function");
let values = [];
let displayingTotal = false;

function updateScreen(text){
  documentScreen.textContent+=text;
}
function deleteLastNumber(){
  const currentText = documentScreen.textContent;
  documentScreen.textContent = currentText.slice(0,-1);
}
function clearScreen(){
  documentScreen.textContent = "";
}
function pressedNumber(){
  if (displayingTotal) {
    clearScreen();
    values = [];
    displayingTotal = false;
  }
  updateScreen(this.dataset["value"]);
}
function pressedOperator(){
  if (displayingTotal) displayingTotal = false;
  values.push(documentScreen.textContent);
  values.push(this.dataset["value"]);
  clearScreen();
}
function pressedFunction(){
  const functionPressed = this.dataset["value"];
  switch(functionPressed){
    case "equal":
      values.push(documentScreen.textContent);
      const total = evaluateTotal(values);
      clearScreen();
      updateScreen(total);
      displayingTotal = true;
      values = [];
      break;
    case "clear":
      clearScreen();
      values = [];
      break;
  }


}
function operate(num1,opp,num2){
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    //console.log(num1+opp+num2)
    switch(opp){
      case "+":
        return String(n1 + n2);
      case "-":
        return String(n1 - n2);
      case "*":
        return String(n1 * n2);
      case "/":
        return String(n1 / n2);
    }
    
  }
function evaluateTotal(array){
    const length = array.length;
    let evaluatedArray = [];
    let i = 0;
    while(i<length){
        if (array[i]==="*" || array[i]==="/"){
            const previousValue = evaluatedArray[evaluatedArray.length-1];
            const nextValue = array[i+1];
            const currentValue = array[i];
            evaluatedArray.pop();
            evaluatedArray.push(operate(previousValue,currentValue,nextValue));
            i++;
        }
        else {
            evaluatedArray.push(array[i]);
        }
        i++;
    }
    const total = evaluatedArray.reduce((previousValue,currentValue,index,array)=>{
      if (currentValue==="+"||currentValue==="-"){
        return operate(previousValue,currentValue,array[index+1]);
      }
      else return previousValue;
    })
    return total;
}

documentNumberButtons.forEach(item => item.addEventListener("click",pressedNumber));
documentOperatorButtons.forEach(item => item.addEventListener("click",pressedOperator));
documentFunctionButtons.forEach(item => item.addEventListener("click",pressedFunction));
console.log(evaluateTotal(["12","+","7","-","5","*","3","/","5"]));