/*
 * grunt-testcafe
 * https://github.com/crudo/grunt-testcafe
 *
 * Copyright (c) crudo <crudo@crudo.cz>
 * Licensed under the MIT license.
 */

'use strict';

const fs = require('fs');
const createTestCafe = require('testcafe');

const DEFAULT_OPTS = {
    assertionTimeout: 3000,
    browsers: [],
    filter: null,
    quarantineMode: false,
    reporter: 'spec',
    screenshotsPath: null,
    selectorTimeout: 10000,
    skipJsErrors: false,
    speed: 1,
    startApp: { initDelay: 1000 },
    takeScreenshotsOnFail: false
};

module.exports = (grunt) => {
    grunt.registerMultiTask('testcafe', 'testcafe runner', () => {
        const currentTask = grunt.task.current;
        const done = currentTask.async();
        const opts = currentTask.options(DEFAULT_OPTS);

        let stream;
        let testCafe;
        let testCafeRunner;

        if (typeof opts.files === 'string') {
            opts.files = [opts.files];
        }

        const files = grunt.file.expand(opts.files).map((fileName) => {
            return fileName;
        });

        createTestCafe()
            .then((tc) => {
                testCafe = tc;
                testCafeRunner = testCafe.createRunner();

                if (opts.startApp.command) {
                    return testCafeRunner.startApp(opts.startApp.command, opts.startApp.initDelay);
                }

                return null;
            })
            .then(() => {
                if (opts.reporterOutputFile) {
                    stream = fs.createWriteStream(opts.reporterOutputFile);
                }

                return testCafeRunner
                    .src(files)
                    .browsers(opts.browsers)
                    .filter(opts.filter)
                    .screenshots(opts.screenshotsPath, opts.takeScreenshotsOnFail)
                    .reporter(opts.reporter, stream)
                    .run(opts);
            })
            .then((failed) => {
                if (failed > 0) {
                    throw new Error(failed);
                } else {
                    done();
                }
            })
            .catch((err) => {
                grunt.fail.warn(err.message);
            })
            .then(() => {
                return testCafe && testCafe.close();
            })
            .then(done);
    });
};
