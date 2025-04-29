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
    if (b === 0) return "Error";
    return a / b;
}

// Function to perform operation based on operator
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
        default: return null;
    }
}

// Calculator state variables
let firstOperand = null;
let currentOperator = null;
let resetScreen = false;

// DOM elements
const displayElement = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

// Load DOM event handlers
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Add event listeners to number buttons
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Number clicked:', button.textContent);
            appendNumber(button.textContent);
        });
    });
    
    // Add event listeners to operators
    document.querySelectorAll('.operator').forEach(button => {
        if (button.id !== 'clear' && button.id !== 'equals' && button.id !== 'backspace') {
            button.addEventListener('click', () => {
                console.log('Operator clicked:', button.textContent);
                handleOperator(button.textContent);
            });
        }
    });
    
    // Equals button
    document.getElementById('equals').addEventListener('click', () => {
        console.log('Equals clicked');
        calculate();
    });
    
    // Clear button
    document.getElementById('clear').addEventListener('click', () => {
        console.log('Clear clicked');
        clear();
    });
    
    // Test log
    console.log('All event listeners added');
});

// Function to append number to display
function appendNumber(number) {
    if (displayElement.textContent === '0' || resetScreen) {
        displayElement.textContent = number;
        resetScreen = false;
    } else {
        displayElement.textContent += number;
    }
}

// Function to handle operators
function handleOperator(op) {
    if (currentOperator !== null && !resetScreen) {
        calculate();
    }
    
    firstOperand = displayElement.textContent;
    currentOperator = op;
    previousDisplay.textContent = `${firstOperand} ${currentOperator}`;
    resetScreen = true;
}

// Function to calculate result
function calculate() {
    if (currentOperator === null || resetScreen) return;
    
    const secondOperand = displayElement.textContent;
    
    // Handle division by zero
    if (currentOperator === '÷' && secondOperand === '0') {
        displayElement.textContent = "Error";
        return;
    }
    
    const result = operate(currentOperator, firstOperand, secondOperand);
    displayElement.textContent = typeof result === 'number' && result.toString().length > 10 ? 
                                result.toFixed(4) : result;
    
    previousDisplay.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
}

// Function to clear calculator
function clear() {
    displayElement.textContent = '0';
    previousDisplay.textContent = '';
    firstOperand = null;
    currentOperator = null;
    resetScreen = false;
}
