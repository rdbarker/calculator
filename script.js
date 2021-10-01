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
function evaluateInput(array){
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
    console.log(total);
    return evaluatedArray;
}

documentNumberButtons.forEach(item => item.addEventListener("click",pressedNumber));
console.log(evaluateInput(["12","+","7","-","5","*","3","/","5"]));