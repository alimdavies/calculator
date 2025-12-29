const keyboard = document.querySelector('#keyboard')
const display = document.querySelector('#display span')

let line = ''

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b)
            break;
        case '-':
            return subtract(a, b)
            break
        case '*':
            return multiply(a, b)
            break
        case '/':
            return divide(a, b)
            break
        default:
            break;
    }
}

keyboard.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.textContent == 'AC') {
        line = ''
        display.textContent = line
    } else if(e.target.textContent == '=') {
        operate()
    } else {
        line += e.target.textContent
        display.textContent = line
    }
})