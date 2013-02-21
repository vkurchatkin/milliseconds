/*global require:false, describe:false, it:false, before:false*/

(function () {
    'use strict';

    var milliseconds = require('../');

    require('chai').should();

    describe('milliseconds', function () {
        it('should be a function', function () {
            milliseconds.should.be.a('function');
        });

        describe('milliseconds(number)', function () {
            it('should return the argument', function () {
                milliseconds(57).should.be.equal(57);
            });
        });

        describe('milliseconds(string)', function () {
            it('should convert seconds', function () {
                milliseconds('1 second').should.be.equal(1000);
                milliseconds('1 seconds').should.be.equal(1000);
                milliseconds('1 sec').should.be.equal(1000);
                milliseconds('1 s').should.be.equal(1000);
            });

            it('should convert milliseconds', function () {
                milliseconds('1 millisecond').should.be.equal(1);
                milliseconds('1 milliseconds').should.be.equal(1);
                milliseconds('1 ms').should.be.equal(1);
            });

            it('should convert to milliseconds if no unit specified', function () {
                milliseconds('1').should.be.equal(1);
            });

            it('should convert minutes', function () {
                milliseconds('1 minute').should.be.equal(60000);
                milliseconds('2 minutes').should.be.equal(120000);
                milliseconds('1 min').should.be.equal(60000);
                milliseconds('1 m').should.be.equal(60000);
            });


            it('should convert hours', function () {
                milliseconds('1 hour').should.be.equal(60 * 60 * 1000);
                milliseconds('2 hours').should.be.equal(7200000);
                milliseconds('1 h').should.be.equal(3600000);
            });

            it('should convert days', function () {
                milliseconds('1 day').should.be.equal(24 * 60 * 60 * 1000);
                milliseconds('2 days').should.be.equal(2 * 24 * 60 * 60 * 1000);
                milliseconds('1 d').should.be.equal(24 * 60 * 60 * 1000);
            });

            it('should convert weeks', function () {
                milliseconds('1 week').should.be.equal(7 * 24 * 60 * 60 * 1000);
                milliseconds('2 weeks').should.be.equal(2 * 7 * 24 * 60 * 60 * 1000);
                milliseconds('1 w').should.be.equal(7 * 24 * 60 * 60 * 1000);
            });

            it('should allow multiple number-unit pairs', function () {
                milliseconds('1 minute 5 seconds').should.be.equal(65000);
            });

            it('should tolerate no space between number and unit', function () {
                milliseconds('1sec').should.be.equal(1000);
            });

            it('should accept multiple digits in a number', function () {
                milliseconds('10 seconds').should.be.equal(10000);
            });

            it('should accept decimals', function () {
                milliseconds('5.5 seconds').should.be.equal(5500);
            });

            it('should accept decimals without integral part ', function () {
                milliseconds('.5 seconds').should.be.equal(500);
            });

            it('should not accept just a point', function () {
                isNaN(milliseconds('. seconds')).should.be.equal(true);
            });

            it('should return NaN for invalid input', function () {
                isNaN(milliseconds('shit')).should.be.equal(true);
            });

            it('should tolerate leading spaces', function () {
                milliseconds('   1 second').should.be.equal(1000);
            });

            it('should tolerate spaces between a number and a unit', function () {
                milliseconds('1    second').should.be.equal(1000);
            });

            it('should tolerate trailing spaces', function () {
                milliseconds('1 second    ').should.be.equal(1000);
            });

            it('should work on complex examples', function () {
                milliseconds('7 minutes .5h   1').should.be.equal(2220001);

                milliseconds.config({
                    min: 61 * milliseconds.config.s,
                    minute: 53 * milliseconds.config.s
                });

                milliseconds('1.5min  7minute9   1minutes ').should.be.equal(1.5 * 61 * 1000 + 7 * 53 * 1000 + 9 + 60 * 1000);
            });
        });

        describe('#config(options)', function () {
            it('should allow to define new units', function () {
                milliseconds.config({
                    kiloseconds: 1000 * milliseconds.config.s
                });

                milliseconds('7 kiloseconds').should.be.equal(7000000);
            });

            it('should allow to redefine units', function () {
                milliseconds.config({
                    minutes: 61 * milliseconds.config.s
                });

                milliseconds('2 minutes').should.be.equal(122000);
            });

            it('should allow non-latin characters', function () {
                milliseconds.config({
                    'минут': milliseconds.config.m
                });

                milliseconds('5 минут').should.be.equal(300000);
            });

            it('should allow reg exp special characters', function () {
                milliseconds.config({
                    '[a-z.]$': milliseconds.config.m
                });

                milliseconds('5 [a-z.]$').should.be.equal(300000);
            });
        });
    });
}());