/* Define global variables for storing operand, operator values */
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let resetScreen = false;

/* Get reference to the display and buttons on the page */
const display = document.querySelector("#display");
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const eqButton = document.querySelector(".eqButton");
const clearButton = document.querySelector(".clearButton");

/* Event listener for number buttons. On click, append the number to the display */
numButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

/* Event listener for operator buttons. On click, store the first operand and set the current operator */
opButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

/* Event listener for equals button. On click, perform the calculation and display the result */
eqButton.addEventListener("click", () => compute());

/* Event listener for clear button. On click, clear all stored data and reset the display */
clearButton.addEventListener("click", () => clear());

/* Function to append the clicked number to the display */
function appendNumber(num) {
  if (resetScreen) {
    display.textContent = "";
    resetScreen = false;
  }
  if (
    display.textContent === "0" ||
    display.textContent === "Error! Div by 0"
  ) {
    display.textContent = "";
  }
  display.textContent += num;
}

/* Function to set the operator and store the first operand */
function setOperation(op) {
  if (currentOperator !== null) compute();
  firstOperand = display.textContent;
  currentOperator = op;
  resetScreen = true;
}

/* Function to perform the calculation and display the result */
function compute() {
  if (currentOperator === null) {
    displayError("No operator selected");
    return;
  }
  secondOperand = display.textContent;
  try {
    const result = operate(currentOperator, firstOperand, secondOperand);
    if (result === "Error! Div by 0") {
      displayError(result);
    } else {
      display.textContent = result;
      firstOperand = result;
      currentOperator = null;
    }
  } catch (error) {
    displayError("Calculation error");
  }
}

/* Function to clear all stored data and reset the display */
function clear() {
  display.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  resetScreen = false;
}

/* Function to display error message */
function displayError(message) {
  display.textContent = message;
  resetScreen = true;
}

/* Function to perform the selected operation on the two operands */
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      /* Error handling for division by zero */
      if (b === 0) return "Error! Div by 0";
      return a / b;
    default:
      throw new Error("Unknown operator");
  }
}
