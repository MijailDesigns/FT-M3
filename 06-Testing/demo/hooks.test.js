var { expect } = require('chai');
// hay que instalar chai, npm install chai que es la libreria de assertions
// instalar mocha, npm install mocha
var sumArray = require('./hooks.js');

describe('SumArray', function () {
    let array = [];
    //se invoca una sola vez antes de todos los unit test
    before(function () {
        console.log('before');
    });
    //se invoca antes de cada unit test
    beforeEach(function () {
        console.log('beforeEach');
        array.push(1,2,3);
        console.log(array);
    });
    //se invoca una sola vez despues de todos los unit test
    after(function () {
        console.log('after');
        array = [];
        console.log(array);
    });
    //se invoca despues de cada unit test
    afterEach(function () {
        console.log('afterEach');
    });



    it('should be a function', function () {
        expect(sumArray).to.be.a('function');
    });
    it('should throw an error if first argument is not an array', function () {
        expect(() => sumArray('sadasd').to.throw(TypeError, /array/));
    });
    it('should throw an error if second argument is not an number', function () {
        expect(() => sumArray([], 'string').to.throw(TypeError, /number/));
    });
    it('return true when invoked with [1,2,3] and 5', function () {
        expect(sumArray([1,2,3], 5)).to.be.true;
    });
    it('return false when invoked with [1,2,3] and 7', function () {
        expect(sumArray([1,2,3], 7)).to.be.false;
    });

})