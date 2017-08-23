'use strict';

var chai = require ('chai'),
    expect = chai.expect;

chai.should();

describe('number tests', function(){


    function isEven(num){
        return num % 2 ===0;
    }

    describe('isEven', function(){
        it('return true when number is even', function(){
            isEven(4).should.be.true;
        })
        it('should return false when number is odd', function(){
            expect(isEven(5)).to.be.false;
        });
    });

    function add(num1, num2){
        return num1 + num2;
    }

    describe('add without setup/teardown', function(){
        var num;
        
        beforeEach(function(){
            num = 5;
        });

        it('shold be ten when adding 5 to 5', function(){
            num = add(num, 5);
            num.should.equal(10);
        });

        it('should be twelve when adding 7 to 5', function(){
            add(num, 7).should.equal(12);
        })
    });
});