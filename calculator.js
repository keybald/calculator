class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    append(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    updateDisplay() {
        this.currentOperandText.innerText = this.obtainDisplayNumber(this.currentOperand);
        if(this.operation!=null){
            this.previousOperandText.innerText = `${this.obtainDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }
    obtainDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        return integerDisplay;
    }
    setOperator(operation){
        if(this.currentOperand === '') { return; }
        if(this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    calculate() {
        let calculation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        switch(this.operation){
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '÷':
                calculation = prev / current;
                break;
            case 'x':
                calculation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperand = calculation;
        this.previousOperand = ''
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.slice(0,-1);
    }
}
const currentOperandText = document.getElementById('currentOperand');
const previousOperandText = document.getElementById('previousOperand');
const numberButtons = document.querySelectorAll('[data-number]');
const operator = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.innerText);
    calculator.updateDisplay();
  })
})
operator.forEach(button => {
  button.addEventListener('click', () => {
    calculator.setOperator(button.innerText);
    calculator.updateDisplay();
  })
})
equalsButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
})
clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
