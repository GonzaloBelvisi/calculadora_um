// Seleccionar elementos clave
const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

// Variables de estado de la calculadora
let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Función para actualizar el contenido de la pantalla
function updateDisplay() {
  display.innerText = displayValue;
}

// Manejo de clics en botones
buttonsContainer.addEventListener('click', function (event) {
  const target = event.target;
  if (!target.matches('button')) return;

  if (target.classList.contains('number')) {

    const digit = target.innerText;
    if (displayValue === '0' || waitingForSecondOperand || displayValue === 'Error') {

      displayValue = digit;
      waitingForSecondOperand = false;
    } else {

      displayValue += digit;
    }
    updateDisplay();
  }
  else if (target.classList.contains('decimal')) {

    if (waitingForSecondOperand) {

      displayValue = '0.';
      waitingForSecondOperand = false;
    } else if (!displayValue.includes('.')) {

      displayValue += '.';
    }
    updateDisplay();
  }
  else if (target.classList.contains('operator')) {
    const nextOperator = target.innerText;
    const currentValue = parseFloat(displayValue);
    if (firstOperand === null) {
      firstOperand = currentValue;
    } else if (!waitingForSecondOperand) {
      const result = calculate(firstOperand, operator, currentValue);
      displayValue = String(result);
      firstOperand = (result === 'Error') ? null : result;
      updateDisplay();
    }
    operator = nextOperator;
    waitingForSecondOperand = true;
  }
  else if (target.classList.contains('equals')) {
    if (operator !== null && firstOperand !== null && !waitingForSecondOperand) {
      const currentValue = parseFloat(displayValue);
      const result = calculate(firstOperand, operator, currentValue);
      displayValue = String(result);
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = true;
      updateDisplay();
    }
  }
  else if (target.classList.contains('clear')) {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
  }
  else if (target.classList.contains('sign')) {
    if (displayValue !== '0' && displayValue !== 'Error') {
      displayValue = displayValue.charAt(0) === '-'
        ? displayValue.substring(1)
        : '-' + displayValue;
      updateDisplay();
    }
  }
  else if (target.classList.contains('percent')) {
    if (displayValue !== 'Error') {
      const currentValue = parseFloat(displayValue);
      displayValue = String(currentValue / 100);
      updateDisplay();
    }
  }
});

// Función de cálculo para las operaciones básicas
function calculate(a, operator, b) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (operator === '/') {
    return b === 0 ? 'Error' : a / b;
  }
  return b;
}
