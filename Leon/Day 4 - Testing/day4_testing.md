# Testing (Mocha and Chai)

Mocha is the testing framework and chai is the assertion library.

### Install

```bash
$ npm install --save-dev mocha
$ npm install --save-dev chai
```

Assertion with Chai

```bash
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
```

Include mocha script in package.json

```json
"scripts": {
    "test": "mocha"
  }
```

You can then execute the script using **npm run test**


### Sample code

app.js
```javascript
module.exports = {
    helloWorld: function() {
        return 'Hello World';
    },
    addition: function(num1, num2){
        return num1 + num2;
    }
}
```

app.test.js
```javascript
const app = require('./app');
const assert = require('chai').assert;
const expect = require('chai').expect; 

describe('App', function(){

	// Test the string value
    it('helloWorld should return Hello World', () => {
    	let result = app.helloWorld();
        assert.equal( result, 'HelloWorld' );
    })

    // Test the return type
    it('helloWorld should return type string', () => {
        let result = app.helloWorld();
        assert.typeOf( result, 'string' );
    })

	// Test the result
    it('addition should return 7', () => {
    	let result = app.addition(2,5);
    	expect(result).to.exist;
	expect(result).to.not.be.null;
	expect(result).to.be.equal(7);
    })
})
```
