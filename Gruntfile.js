/*
 * grunt-testcafe
 * https://github.com/crudo/grunt-testcafe
 *
 * Copyright (c) crudo <crudo@crudo.cz>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = (grunt) => {
    // Project configuration.
    grunt.initConfig({
        clean: {
            test: ['xunit.xml']
        },

        eslint: {
            all: [
                'Gruntfile.js',
                'tests/*.js',
                'tasks/**/*.js'
            ],
            options: {
                configFile: '.eslintrc'
            }
        },

        connect: {
            dev: {
                options: {
                    port: 3113,
                    host: 'localhost'
                }
            }
        },

        // Configuration to be run (and then tested).
        testcafe: {
            all: {
                options: {
                    files: ['tests/*.{js,ts}'],
                    browsers: ['chrome']
                }
            },
            form: {
                options: {
                    reporters: ['xunit:xunit.xml'],
                    files: [
                        'tests/form.test.js',
                        'tests/type.test.ts'
                    ],
                    browsers: ['chrome']
                }
            },
            fail: {
                options: {
                    files: ['tests/fail.test.js'],
                    browsers: ['chrome']
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('gruntify-eslint');

    grunt.registerTask('test-locally', ['connect', 'testcafe', 'clean:test']);
    grunt.registerTask('test-ci', ['connect', 'testcafe:form', 'clean:test']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['eslint', 'test-locally']);
};
