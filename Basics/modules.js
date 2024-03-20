//? method 1
// const maths = require("./math");
// console.log(maths.add(2,4));

//? method 2 - destructuring
const {add,sub,mul} = require("./math")
// console.log(add(12,4));
// console.log(sub(12,4));

console.log(mul(12,4));
