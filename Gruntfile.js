/*global module:false*/

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        simplemocha: {
            all: {
                src: 'test/**/*.js',
                options: {
                    reporter: 'spec'
                }
            }
        },
        watch: {
            all: {
                files: ['lib/**/*.js', 'test/**/*.js'],
                tasks: ['test']
            }
        }

    });

    grunt.registerTask('test', 'simplemocha');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
};