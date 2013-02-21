/*global module:false*/

(function () {
    'use strict';

    var regexp,
        milliseconds,
        buildRegExp,
        escape,
        config = function (options) {
            var key;

            for (key in options) {
                if (options.hasOwnProperty(key)) {
                    config[key] = options[key];
                }
            }

            buildRegExp();

            return milliseconds;
        };

    config.ms = config.millisecond = config.milliseconds = config[''] = 1;
    config.s = config.sec = config.second = config.seconds = 1000 * config.ms;
    config.m = config.min = config.minute = config.minutes = 60 * config.s;
    config.h = config.hour = config.hours = 60 * config.m;
    config.d = config.day = config.days = 24 * config.h;
    config.w = config.week = config.weeks = 7 * config.d;


    escape = function (str) { //This can be an overkill
        var escapedStr = '',
            i,
            utf = function (number) {
                var code = number.toString(16),
                    zeros = 4 - code.length;

                while (zeros > 0) {
                    code = '0' + code;
                    zeros -= 1;
                }

                return code;
            };

        for (i = 0; i < str.length; i += 1) {
            escapedStr += '\\u' + utf(str.charCodeAt(i));
        }

        return escapedStr;
    };

    buildRegExp = function () {
        var regexpString = '((?:(?:\\d+)?.\\d+)|(?:\\d+)) *(',
            unit;

        for (unit in config) {
            if (config.hasOwnProperty(unit) && unit !== '') {
                regexpString += escape(unit) + '|';
            }
        }


        regexpString = regexpString.slice(0, -1);

        if (config[''] !== 'undefined') {
            regexpString += '|';  //empty unit should be the last alternative
        }

        regexpString += ')';

        regexp = new RegExp(regexpString, 'gi');
    };


    buildRegExp();


    milliseconds = function (interval) {
        var matches,
            nan = true, //this flag means, we found no pairs and should return NaN
            value = 0;

        if (typeof interval === 'number') {
            return interval;
        }

        if (typeof interval === 'string') {


            matches = regexp.exec(interval);

            while (matches) {
                nan = false;
                value += parseFloat(matches[1]) * config[matches[2]];
                matches = regexp.exec(interval);
            }


            return nan ? NaN : value;
        }

        return NaN;
    };

    module.exports = milliseconds;
    module.exports.config = config;
}());