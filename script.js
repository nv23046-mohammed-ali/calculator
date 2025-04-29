// Basic math operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

function percent(a) {
  return a / 100;
}

// Operate function that calls the correct operation
function operate(operator, a, b) {
  // Convert string inputs to numbers
  a = parseFloat(a);
  b = parseFloat(b);
  
  switch(operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    case "%":
      return percent(a);
    default:
      return "Error: Invalid operator";
  }
}

// Calculator state variables
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let calculationPerformed = false;

// DOM elements
const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const decimalButton = document.getElementById('decimal');

// Helper function to round long decimals
function roundResult(number) {
  // Check if it's an error message
  if (typeof number === 'string') {
    return number;
  }
  
  // Convert to string to check length
  const numberString = number.toString();
  
  // If the number has a decimal point and is longer than 12 characters
  if (numberString.includes('.') && numberString.length > 12) {
    return parseFloat(number.toFixed(10)).toString();
  }
  
  return numberString;
}

// Update display with current value
function updateDisplay() {
  display.textContent = displayValue;
}

// Handle digit button clicks
digitButtons.forEach(button => {
  button.addEventListener('click', () => {
    const digit = button.textContent;
    
    // If calculation was just performed, start fresh
    if (calculationPerformed) {
      displayValue = digit;
      calculationPerformed = false;
    } 
    // If waiting for second operand, replace display with the new digit
    else if (waitingForSecondOperand) {
      displayValue = digit;
      waitingForSecondOperand = false;
    } 
    // Otherwise append the digit (but avoid leading zeros)
    else {
      displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    
    updateDisplay();
  });
});

// Handle operator button clicks
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const newOperator = button.textContent;
    
    // If % is clicked, apply it immediately
    if (newOperator === '%') {
      const inputValue = parseFloat(displayValue);
      displayValue = roundResult(percent(inputValue));
      updateDisplay();
      return;
    }
    
    // If we have a pending operation, perform it first
    if (firstOperand !== null && !waitingForSecondOperand) {
      const result = operate(operator, firstOperand, displayValue);
      displayValue = roundResult(result);
      
      // Display error if division by zero
      if (displayValue === "Error: Division by zero") {
        updateDisplay();
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        return;
      }
      
      firstOperand = parseFloat(displayValue);
      updateDisplay();
    } else if (firstOperand === null) {
      // First time an operator is pressed
      firstOperand = parseFloat(displayValue);
    }
    
    operator = newOperator;
    waitingForSecondOperand = true;
  });
});

// Handle equals button click
equalsButton.addEventListener('click', () => {
  // Only perform calculation if we have both operands and an operator
  if (firstOperand !== null && operator !== null && !waitingForSecondOperand) {
    const result = operate(operator, firstOperand, displayValue);
    displayValue = roundResult(result);
    
    // Reset the calculator state
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    calculationPerformed = true;
    
    updateDisplay();
  }
});

// Handle clear button click
clearButton.addEventListener('click', () => {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  calculationPerformed = false;
  updateDisplay();
});

// Handle backspace button click
backspaceButton.addEventListener('click', () => {
  if (waitingForSecondOperand || calculationPerformed) {
    return;
  }
  
  displayValue = displayValue.length > 1 ? 
    displayValue.slice(0, -1) : '0';
  updateDisplay();
});

// Handle decimal button click
decimalButton.addEventListener('click', () => {
  // If we just performed a calculation or are waiting for second operand, start fresh
  if (calculationPerformed) {
    displayValue = '0.';
    calculationPerformed = false;
  } else if (waitingForSecondOperand) {
    displayValue = '0.';
    waitingForSecondOperand = false;
  } 
  // Only add decimal if there isn't one already
  else if (!displayValue.includes('.')) {
    displayValue += '.';
  }
  
  updateDisplay();
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
  // Digits
  if (/[0-9]/.test(event.key)) {
    document.getElementById(event.key).click();
  }
  // Operators
  else if (event.key === '+') {
    document.getElementById('add').click();
  }
  else if (event.key === '-') {
    document.getElementById('subtract').click();
  }
  else if (event.key === '*') {
    document.getElementById('multiply').click();
  }
  else if (event.key === '/') {
    event.preventDefault(); // Prevent browser's "Quick Find"
    document.getElementById('divide').click();
  }
  // Special keys
  else if (event.key === '.') {
    document.getElementById('decimal').click();
  }
  else if (event.key === '=' || event.key === 'Enter') {
    document.getElementById('equals').click();
  }
  else if (event.key === 'Escape') {
    document.getElementById('clear').click();
  }
  else if (event.key === 'Backspace') {
    document.getElementById('backspace').click();
  }
  else if (event.key === '%') {
    document.getElementById('percent').click();
  }
});

// Initialize display
updateDisplay();
