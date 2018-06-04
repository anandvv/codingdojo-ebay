# Day 1 - Javascript

Variables declared outside functions are global and available everywhere.
Variables defined within a function are scoped within a station

```Javascript
function myFunction() {
  var str = 'hello world' // only available within myFunction
}
```

let will only be available within a block

```Javascript
if (true) {
  let value = 'hello!' // only available within the brackets
}
```

let replaces var in ES6.

const is a constant value and cannot be reassigned.

In Javascript, everything besides Strings and Numbers and Booleans are Object.

### Look into: copying Object as reference? Copies etc...

### Async Await

```Javascript
async function asyncFunc() {
  let response = await axios.get(url) // await will queue the block of code
}
```

### Promise

```Javascript
axios.get(url)
  .then(myFunction) // promise block
  .then(myFucntion2) // can do another get request here
```
Traditional callback hell

```Javascript
  $.get(url, function() {
    $.get(url, function() {
      // nested callback
    })
  })
```

### Arrow functions

"This" keyword represents any instance it was made within. Without arrow function,
you need to bind the "this" keyword to any function nested within the instance.
In below example, Axios is evoking the callback and has no access to the constructed
class object's "this"

```Javascript

  // ... class body
  constructor () {
    this.x = 5;
  }

  // traditional es5 function
  getData() {
    axios.get(url)
      .then(function(response) {
        this.x = response
      }.bind(this)) // needs to bind this to the class
  }


  // with arrow function
  getData() {
    axios.get(url)
      .then(response => {
        this.x = response // allows to access this without bind
      })
  }
```

### Private/Protected

ES6 Javascript has no concept of private or protected variables. Classes that are
constructed with "this" will be mutable by outside callers.

```Javascript
constructor(){
  this.value = 123
}

ClassName.value = 456 // you can change the value from the outside...
```
