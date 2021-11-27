function _throw(m) { throw m; } //for throwing exception inside ternary op

let add = (x,y) => x+y ;
let substract = (x,y) => x-y ;
let multiply = (x,y) => x*y;
let divide = (x,y) => y != 0 ? x/y : _throw('can not divide by 0') ;

let operate = (f,x,y) => f(x,y);

