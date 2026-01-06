const keyboard = document.querySelector('#keyboard')
const displayLine = document.querySelector('#displayLine')
const displayExpr = document.querySelector('#displayExpr')

let regex = /\++|\-+|\*+|\/+/
let decimalReg = /\./

let calc = {
    line: '',
    expr: ''
}

function render() {
    displayLine.textContent = calc.line
    displayExpr.textContent = calc.expr
}

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

function isOperatorLast() {
    if(regex.test(calc.expr[calc.expr.length - 1]) == true) {
        return true
    } else {
        return false
    }
}

function containsOperator() {
    if(regex.test(calc.expr) == true) {
        return true
    } else {
        return false
    }
}


function evaluate(button) {
    const data = button.getAttribute('data-value')
    if(data == null) {
        return
    } else if(button.classList.contains('number')) {
        if(isOperatorLast()) {
            calc.line = `${data}`
            calc.expr += `${data}`
            render()
        } else {
            calc.line += `${data}`
            calc.expr += `${data}`
            render()
        }
    } else if(button.classList.contains('operator')) {
        if(calc.expr == '') {
            return
        } else if(!containsOperator()) {
            calc.expr += `${data}`
            render()
        } else if(isOperatorLast()) {
            calc.expr[calc.expr.length - 1] = `${data}`
            render()
        } else if(containsOperator()) {
            const index = regex.exec(calc.expr).index
            const operator = calc.expr[index]
            const arr = calc.expr.split(operator)
            const result = operate(parseFloat(arr[0]), parseFloat(arr[1]), operator)
            calc.line = `${result}`
            calc.expr = `${result}${data}`
            render()
        }
    } else if(data == 'AC') {
        calc.line = ''
        calc.expr = ''
        render()
    } else if(data == '=') {
        if(containsOperator()) {
            const index = regex.exec(calc.expr).index
            const operator = calc.expr[index]
            const arr = calc.expr.split(operator)
            const result = operate(parseFloat(arr[0]), parseFloat(arr[1]), operator)
            calc.line = `${result}`
            calc.expr = `${result}`
            render()
        } else {
            return
        }
    } else if(button.classList.contains('backspace')) {
        console.log('triggered')
        if(calc.expr == '') {
            return
        } else if(isOperatorLast()) {
            calc.expr = calc.expr.slice(0, -1)
            render()
        } else {
            calc.line = calc.line.slice(0, -1)
            calc.expr = calc.expr.slice(0, -1)
            render()
        }
    } else if(data == '.') {
        if(calc.expr == '' || calc.line == '') {
            return
        } else if(decimalReg.test(calc.line)) {
            return
        } else if(isOperatorLast()) {
            return
        } else {
            calc.line += `${data}`
            calc.expr += `${data}`
            render()
        }
    }
}

keyboard.addEventListener('click', (e) => {
    e.preventDefault()
    const button = e.target.closest('button')
    console.log(button.classList)
    console.log(button.classList.contains('backspace'))
    if (!button) return
    evaluate(button)
})