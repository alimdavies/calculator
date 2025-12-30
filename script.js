const keyboard = document.querySelector('#keyboard')
const display = document.querySelector('#displayLine')
const displayExpr = document.querySelector('#displayExpr')

let displayLine = ''
let expr = ''

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
    return b == 0 ? 'ERROR' : a / b
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

function displayValue(str) {
    display.textContent = str
}

function uploadDisplay(str) {
    display.textContent += str
}

function uploadExpr() {
    displayExpr.textContent = expr
}

function clearDisplay() {
    displayValue('')
}

let regex = /\++|\-+|\*+|\/+/

function evaluate(target) {
    const input = target.textContent
    if(target.classList.contains('number')) {
        if(regex.exec(expr[expr.length - 1]) != null) {
            clearDisplay()
            uploadDisplay(input)
            expr += input
            uploadExpr()
        } else {
            uploadDisplay(input)
            expr += input
            uploadExpr()
        }
    } else if(target.classList.contains('operator')) {
        if(regex.exec(expr) == null) {
            expr += input
            uploadExpr()
        } else if(expr == '') {
            return
        } else if(regex.exec(expr[expr.length - 1]) != null) {
            return
        } else {
            const index = regex.exec(expr).index
            const operator = expr[index]
            const arr = expr.split(expr[index])
            const result = operate(parseFloat(arr[0]), parseFloat(arr[1]), operator)
            displayValue(result)
            expr = `${result}${input}`
            uploadExpr()
        }
    } else if(input == 'AC') {
        clearDisplay()
        expr = ''
        uploadExpr()
    } else if(input == '=') {
        if(expr == '') {
            return
        } else if(regex.exec(expr[expr.length - 1]) != null) {
            return
        } else {
            const index = regex.exec(expr).index
            const operator = expr[index]
            const arr = expr.split(expr[index])
            const result = operate(parseFloat(arr[0]), parseFloat(arr[1]), operator)
            displayValue(result)
            expr = `${result}`
        }
    } else if(target.classList.contains('backspace')) {
        if(expr == '') {
            return
        } else {
            expr = expr.slice(0, -1)
            uploadExpr()
            clearDisplay()
        }
    }
}

keyboard.addEventListener('click', (e) => {
    e.preventDefault()
    evaluate(e.target)
})