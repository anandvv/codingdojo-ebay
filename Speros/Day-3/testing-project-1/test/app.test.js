// npm run test 
// npm run test -s

const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

const sayHello = require('../app').sayHello;
const addNumbers = require('../app').addNumbers;

describe('App', function(){

    it('sayHello app should return hello', function(){
        // assert.equal(sayHello(), 'hello');
        let result = sayHello();
        assert.equal(result, 'hllo');
    })

    it('sayHello should return type string', () => {
        let result = sayHello();
        assert.typeOf(result, 'string');
    })

    it('addNumbers should be above 5', () => {
        let result = addNumbers(5,5);
        assert.isAbove(result, 5);
        expect(result).to.exist;
        expect(result).to.not.be.null;
        expect(result).to.be.equal(10);
        assert.typeOf(result, 'number');
        expect(result).to.be.a('number');
        result.should.be.a('number');
    })

    it('addNumbers should return type number', ()=>{
        let result = addNumbers(5,5);
        assert.typeOf(result, 'number');
    })
    
})
