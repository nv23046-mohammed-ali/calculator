// Basic math operator functions
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

// Function to perform operation based on operator
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '%':
            return percent(a);
        default:
            return "Error: Invalid operator";
    }
}

// Calculator state variables
let firstOperand = null;
let operator = null;
let secondOperand = null;
let resetScreen = false;
let decimalAdded = false;

// DOM elements
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const decimalButton = document.getElementById('decimal');

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
    // Number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });

    // Operator buttons
    operatorButtons.forEach(button => {
        if (button.id !== 'clear' && button.id !== 'equals' && button.id !== 'backspace' && button.id !== 'percent') {
            button.addEventListener('click', () => {
                setOperation(button.textContent);
            });
        }
    });

    // Equals button
    equalsButton.addEventListener('click', () => {
        calculate();
    });

    // Clear button
    clearButton.addEventListener('click', () => {
        clear();
    });

    // Backspace button
    backspaceButton.addEventListener('click', () => {
        backspace();
    });

    // Decimal button
    decimalButton.addEventListener('click', () => {
        appendDecimal();
    });

    // Percent button
    document.getElementById('percent').addEventListener('click', () => {
        handlePercent();
    });

    // Keyboard support
    window.addEventListener('keydown', handleKeyboardInput);
});

// Function to append number to display
function appendNumber(number) {
    if (currentOperandTextElement.textContent === '0' || resetScreen) {
        resetScreen = false;
        currentOperandTextElement.textContent = number;
    } else {
        currentOperandTextElement.textContent += number;
    }
}

// Function to append decimal point
function appendDecimal() {
    if (resetScreen) {
        resetScreen = false;
        currentOperandTextElement.textContent = '0.';
        decimalAdded = true;
        return;
    }
    if (!currentOperandTextElement.textContent.includes('.')) {
        currentOperandTextElement.textContent += '.';
        decimalAdded = true;
    }
}

// Function to set operation
function setOperation(op) {
    if (operator !== null && !resetScreen) {
        calculate();
    }
    
    firstOperand = currentOperandTextElement.textContent;
    operator = op;
    previousOperandTextElement.textContent = `${firstOperand} ${operator}`;
    resetScreen = true;
    decimalAdded = false;
}

// Function to calculate result
function calculate() {
    if (operator === null || resetScreen) return;
    
    // Handle division by zero
    if (operator === '÷' && currentOperandTextElement.textContent === '0') {
        currentOperandTextElement.textContent = "Nice try 😏";
        previousOperandTextElement.textContent = '';
        firstOperand = null;
        operator = null;
        resetScreen = true;
        return;
    }

    secondOperand = currentOperandTextElement.textContent;
    let result = operate(operator, firstOperand, secondOperand);
    
    // Round long decimals
    if (typeof result === 'number') {
        // Convert to string and check if it has too many digits
        const resultString = result.toString();
        if (resultString.length > 12) {
            // Round to a reasonable number of decimal places
            result = parseFloat(result.toFixed(8));
        }
    }
    
    currentOperandTextElement.textContent = result;
    previousOperandTextElement.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    firstOperand = result;
    operator = null;
    resetScreen = true;
    decimalAdded = result.toString().includes('.');
}

// Function to clear calculator
function clear() {
    currentOperandTextElement.textContent = '0';
    previousOperandTextElement.textContent = '';
    firstOperand = null;
    secondOperand = null;
    operator = null;
    resetScreen = false;
    decimalAdded = false;
}

// Function to handle backspace
function backspace() {
    if (currentOperandTextElement.textContent === 'Nice try 😏') {
        clear();
        return;
    }
    
    const current = currentOperandTextElement.textContent;
    
    // If last character is a decimal point, update decimalAdded flag
    if (current.charAt(current.length - 1) === '.') {
        decimalAdded = false;
    }
    
    if (current.length === 1) {
        currentOperandTextElement.textContent = '0';
    } else {
        currentOperandTextElement.textContent = current.slice(0, -1);
    }
}

// Function to handle percent
function handlePercent() {
    if (currentOperandTextElement.textContent === '0') return;
    
    const current = parseFloat(currentOperandTextElement.textContent);
    const result = current / 100;
    
    currentOperandTextElement.textContent = result;
    decimalAdded = result.toString().includes('.');
}

// Function to handle keyboard input
function handleKeyboardInput(e) {
    // Numbers 0-9
    if ((e.key >= '0' && e.key <= '9')) {
        appendNumber(e.key);
    }
    
    // Operators
    if (e.key === '+') setOperation('+');
    if (e.key === '-') setOperation
