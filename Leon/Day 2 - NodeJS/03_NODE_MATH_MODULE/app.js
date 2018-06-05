var mathlib = require('./mathlib')();

var adding = mathlib.add(2,3);
console.log(adding);

var multiplying = mathlib.multiply(3,5);
console.log(multiplying);

var squaring = mathlib.square(5);
console.log(squaring);

var random = mathlib.random(1,35);
console.log(random);
