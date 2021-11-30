const op_div = document.querySelector('#op');
const result_div = document.querySelector('#result');
const all_numbers = document.querySelectorAll('.number');
const all_ops = document.querySelectorAll('.operator');
const clear_button = document.querySelector('#clear');
const point_button = document.querySelector('#point');

const DECIMAL_PLACES = 6;

function _throw(m) { throw m; } //for throwing exception inside ternary op

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}

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
let floating_point = false;
let floating_zeros = 0;

function updateOperationDiv(putEqual,addZeros2Curr){
    let text = chosen_symbol  !== null ? old_number + chosen_symbol : '';
    text += curr_number !== null ?  curr_number + addZeros2Curr : '' ;
    text += putEqual ? '=' : '';
    op_div.textContent = text;
    result_div.textContent = answer;
}

function updateCurrNumber(val){
    let addZeros2Curr = '';
    if (floating_point){
        if (curr_number.countDecimals() == DECIMAL_PLACES){
            return;
        }
        if(val == 0){
            floating_zeros += 1
            addZeros2Curr = curr_number % 1 === 0 ?'.' + ('0'.repeat(floating_zeros )) : ('0'.repeat(floating_zeros )) ;
        }
        else{
        curr_number = curr_number !== null ? parseFloat(( parseInt(val) / Math.pow(10,(curr_number.countDecimals()+floating_zeros+ 1))+ curr_number).toFixed(DECIMAL_PLACES)) : parseInt(val) / 10;
        floating_zeros = 0;
    }
    }
    else{
        curr_number = curr_number !== null ? parseInt(val) + curr_number * 10 : parseInt(val);
    }
    if (answer){
        answer = null;
    }
    updateOperationDiv(false,addZeros2Curr);
}

function updateOperation(symbol){
    if (symbol === '='){
        //there is an ongoing operation then calculate the result
        if(chosen_symbol && (curr_number !== null)){
            try {
            answer = symbol2func[chosen_symbol](old_number,curr_number);
            }
            catch(err){
                alert(err);
                return;
            }
            if (answer % 1 !== 0){
                answer = parseFloat(answer.toFixed(DECIMAL_PLACES));
            }
            updateOperationDiv(true,'');
            old_number = null;
            curr_number = null;
            floating_point = false;
            floating_zeros = 1;
            point_button.disabled =false
            chosen_symbol = null;
        }
    }
    else {
        if (chosen_symbol && (curr_number !== null)){
            try {
            answer = symbol2func[chosen_symbol](old_number,curr_number);
            }
            catch(err){
                alert(err);
                return;
            }
            if (answer % 1 !== 0){
                answer = parseFloat(answer.toFixed(DECIMAL_PLACES));
            }
            updateOperationDiv(true,'');
            curr_number = null;
            floating_point = false;
            floating_zeros = 1;
            point_button.disabled =false
            chosen_symbol = symbol;
            old_number = answer;
        }
        else if (answer !== null){
            chosen_symbol = symbol;
            old_number = answer;
            curr_number = null;
            floating_point = false;
            floating_zeros = 1;
            point_button.disabled =false;
            updateOperationDiv(false,'');
        }
        else if(curr_number !== null){
            chosen_symbol = symbol;
            old_number = curr_number;
            curr_number = null;
            floating_point = false;
            floating_zeros = 1;
            point_button.disabled =false;
            updateOperationDiv(false,'');
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

point_button.addEventListener('click', () => {
    floating_point = true;
    point_button.disabled =true;
});