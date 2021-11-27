const display_div = document.querySelector('#display');
const all_numbers = document.querySelectorAll('.number');
const all_ops = document.querySelectorAll('.operator');

function _throw(m) { throw m; } //for throwing exception inside ternary op

const add = (x,y) => x+y ;
const substract = (x,y) => x-y ;
const multiply = (x,y) => x*y;
const divide = (x,y) => y != 0 ? x/y : _throw('can not divide by 0') ;

const symbol2func = {
    '+':add,
    '-':substract,
    '*':multiply,
    '/':divide
}

let operate = (f,x,y) => f(x,y);


let display_value = 0;
let operand1 = null;
let chosen_operation = null;
let clean_after_op = false;

function updateDisplayValue(val){
    if (clean_after_op){
        display_value= 0;
        clean_after_op = false;
    }
    display_value = parseInt(val) + display_value * 10;
    display_div.textContent = operand1 ? operand1 + chosen_operation + display_value : display_value;
}

function updateOperation(symbol){
    if (operand1 == null){
        let operator = symbol2func[symbol];
        if (operator !== undefined){
            chosen_operation = symbol;
            operand1 = display_value;
            display_value = 0;
            display_div.textContent = operand1 + symbol;
        }
    }
    else{
        display_value = symbol2func[chosen_operation](operand1,display_value);
        chosen_operation = null;
        operand1 = null;
        display_div.textContent = symbol + display_value;
        if (symbol !== '='){
            operand1 = display_value;
            display_value = 0 ;
            chosen_operation = symbol;
            display_div.textContent = operand1 + symbol;
        }
        clean_after_op = true;
    }
}



all_numbers.forEach(number_button => {
    number_button.addEventListener('click',() =>{updateDisplayValue(number_button.textContent)});
});

all_ops.forEach(operator_button => {
    operator_button.addEventListener('click',() =>{updateOperation(operator_button.textContent)});
});