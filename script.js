const buttons = document.querySelectorAll("button");
const display_result = document.querySelector(".result");
let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = "";

updateDisplay();

function updateDisplay(){
    display_result.textContent = displayValue;
    if (displayValue.length > 9){
        displayValue=displayValue.slice(0,9);}
}

buttons.forEach(button => {
    button.addEventListener("click", () =>{
        if (button.dataset.key == "operand"){
            getOperand(button.value);
            updateDisplay();
        }

        else if (button.dataset.key == "operator") {
            getOperator(button.value);
            updateDisplay();
        }

        else if (button.dataset.key == "clear"){
            clearResult();
            updateDisplay();
        }

        else if (button.dataset.key == "delete"){
            deleteDigit(displayValue);
            updateDisplay();
        }

        else if (button.dataset.key == "equal"){
            getResult();
            updateDisplay();
        }

        else if (button.dataset.key == "decimal"){
            getDecimal(button.value);
            updateDisplay();
        }

        else if (button.dataset.key == "percentage"){
            getPercentage(displayValue);
            updateDisplay();
        }
    });
});

function operate(operand1, operand2, operator) {
    if (operator === '+'){
        return operand1 + operand2;
    }
    else if (operator === '-'){
        return operand1 - operand2;
    }
    else if (operator === '*'){
        return operand1 * operand2;
    }
    else if (operator === '/'){
        if (operand2 == 0){
            return "That's illegal!";
        }
        else {
            return operand1 / operand2;
        }
    }
}

function getOperand(operand){
    if (firstOperator === null){
        if (displayValue === "0"){
            displayValue=operand;
        }
        else {
            displayValue += operand;
        }    
    }
    else {
        if(displayValue === firstOperand) {
            displayValue = operand;
        } 
        else {
            displayValue += operand;
        }
    }
}

function getOperator(operator){
    if(firstOperator == null && secondOperator === null){
        firstOperator = operator;
        firstOperand=displayValue;
    }

    else if (firstOperator != null && secondOperator === null){
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(firstOperand, secondOperand, firstOperator);
        displayValue=Math.round(result * Math.pow(10,9))/Math.pow(10,9);
        firstOperand=displayValue;
        result=null;
    }

    else if (firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        result = operate(firstOperand, secondOperand, secondOperator);
        secondOperator = operator;
        displayValue=Math.round(result * Math.pow(10,9))/Math.pow(10,9);
        firstOperand=displayValue;
        result=null;
    }
}

function clearResult() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function deleteDigit (){
    displayValue=displayValue.slice(0, -1);
}

function getResult (){
    if (firstOperator === null) {
        displayValue = displayValue;
    }
    else if (secondOperator !== null){
        secondOperand=displayValue;
        result = operate(firstOperand, secondOperand, secondOperator);
        if(result === 'That\'s illegal!') {
            displayValue = 'That\'s illegal!';
        }
        else {
        displayValue=Math.round(result * Math.pow(10,9))/Math.pow(10,9);
        firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
            }    
    }
    else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'That\'s illegal!') {
            displayValue = 'That\'s illegal!';
        } 
        else {
            displayValue=Math.round(result * Math.pow(10,9))/Math.pow(10,9);
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
            }
        }
    }
      
    function getDecimal(point) {
        if(displayValue === firstOperand || displayValue === secondOperand) {
            displayValue = '0';
            displayValue += point;
        } else if(!displayValue.includes(point)) {
            displayValue += point;
        } 
    }
    
    function getPercentage(input) {
        displayValue = input/100;
    }  