/*
 * grunt-testcafe
 * https://github.com/crudo/grunt-testcafe
 *
 * Copyright (c) crudo <crudo@crudo.cz>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        testcafe: {
            all: {
                options: {
                    files: ['tests/*.js'],
                    browsers: ['chrome']
                }
            },
            form: {
                options: {
                    reporter: 'xunit',
                    reporterOutputFile: 'xunit.xml',
                    files: ['tests/form.test.js'],
                    browsers: ['chrome']
                }
            },
            fail: {
                options: {
                    files: ['tests/fail.test.js'],
                    browsers: ['chrome']
                }
            }
        },

        'http-server': {
            'dev': {
                port: 3113,
                host: 'localhost',
                showDir: true,
                runInBackground: true,
                autoIndex: true
            }
        },

        clean: {
            test: ['xunit.xml']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['http-server', 'testcafe', 'clean:test']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);
};
