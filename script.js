const op_div = document.querySelector('#op');
const result_div = document.querySelector('#result');
const all_numbers = document.querySelectorAll('.number');
const all_ops = document.querySelectorAll('.operator');
const clear_button = document.querySelector('#clear');

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

let old_number = null;
let curr_number = null;
let answer = null;
let chosen_symbol = null;
let clean_after_op = false;


function updateOperationDiv(putEqual){
    let text = chosen_symbol  !== null ? old_number + chosen_symbol : '';
    text += curr_number !== null ?  curr_number : '' ;
    text += putEqual ? '=' : '';
    op_div.textContent = text;
    result_div.textContent = answer;
}

function updateCurrNumber(val){
    curr_number = curr_number !== null ? parseInt(val) + curr_number * 10 : parseInt(val);
    if (answer){
        answer = null;
    }
    updateOperationDiv();
}

function updateOperation(symbol){
    if (symbol === '='){
        //there is an ongoing operation then calculate the result
        if(chosen_symbol && (curr_number !== null)){
            answer = symbol2func[chosen_symbol](old_number,curr_number);
            updateOperationDiv(true);
            old_number = null;
            curr_number = null;
            chosen_symbol = null;
        }
    }
    else {
        if (chosen_symbol && (curr_number !== null)){
            answer = symbol2func[chosen_symbol](old_number,curr_number);
            updateOperationDiv(true);
            curr_number = null;
            chosen_symbol = symbol;
            old_number = answer;
        }
        else if (answer !== null){
            chosen_symbol = symbol;
            old_number = answer;
            curr_number = null;
            updateOperationDiv(false);
        }
        else if(curr_number !== null){
            chosen_symbol = symbol;
            old_number = curr_number;
            curr_number = null;
            updateOperationDiv(false);
        }
    }
}

all_numbers.forEach(number_button => {
    number_button.addEventListener('click',() =>{updateCurrNumber(number_button.textContent)});
});

all_ops.forEach(operator_button => {
    operator_button.addEventListener('click',() =>{updateOperation(operator_button.textContent)});
});

clear_button.addEventListener('click', () => {
    location.reload(); //reload page
});