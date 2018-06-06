var mathlib = require('./mathlib') ();

var add = mathlib.add(100, 230);
console.log('add 2 nums: '+ add);

var  multiply= mathlib.multiply(5, 6);
console.log('multiply 2 nums: '+ multiply);

var square = mathlib.square(5);
console.log('square num: '+ square);

var random = mathlib.random(5, 10);
console.log('random num: '+ random);