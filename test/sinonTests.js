'use strict';
var chai = require ('chai'),
    sinon = require('sinon'),
    expect = chai.expect;
chai.should();

describe('sinon tests', function(){
    var student, schedule;

    beforeEach(function(){
        student = {
            dropClass: function(classId, cb){
                if(!!cb.dropClass){
                    cb.dropClass();
                } else {
                 cb();
                }
            },
            addClass: function(schedule){
                if(!schedule.classIsFull()) {
                    return true;
                } else {
                    return false;
                }
            }
        };

    schedule = {
        dropClass: function(){
            console.log('class dropped');
        },
        classIsFull: function(){
            return true;
        }
    };
});


describe('student with spy', function(){
    it('should call the callback', function(){
        var spy = sinon.spy();

        student.dropClass(1, spy);
        spy.called.should.be.true;
    });

    it('should call the callback and log to the console', function(){
        function onClassDropped(){
            console.log("onClassDropped was called");
        }
        var spy = sinon.spy(onClassDropped);

        student.dropClass(1, spy);
        spy.called.should.be.true;
    });

    it('should call the callback even if it\'s a method of an object', function(){
        sinon.spy(schedule, 'dropClass');
        student.dropClass(1, schedule);
        schedule.dropClass.called.should.be.true;
    });
  });

  describe('student with stubs', function(){
      it('should call a stubbed method', function(){
        var stub = sinon.stub(schedule);
        student.dropClass(1, stub);
        stub.dropClass.called.should.be.true;
      });

       it('should return true when the class is not full', function(){
            var stub = sinon.stub(schedule);
            stub.classIsFull.returns(false);

            var returnVal = student.addClass(stub);
            returnVal.should.be.true;
        })
  });

    describe('students with mocks', function(){
        it('mocks schedule', function(){
            var mockObj = sinon.mock(schedule);
            var expectation = mockObj.expects('classIsFull').once();

            student.addClass(schedule);
            expectation.verify();
        });
    });
});