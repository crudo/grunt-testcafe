/*
 * grunt-testcafe
 * https://github.com/crudo/grunt-testcafe
 *
 * Copyright (c) crudo <crudo@crudo.cz>
 * Licensed under the MIT license.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const createTestCafe = require('testcafe');

const DEFAULT_OPTS = {
    assertionTimeout: 3000,
    browsers: [],
    concurrency: 1,
    filter: null,
    quarantineMode: false,
    reporters: ['spec'],
    screenshotsPath: null,
    screenshotPathPattern: null,
    selectorTimeout: 10000,
    skipJsErrors: false,
    speed: 1,
    startApp: { initDelay: 1000 },
    takeScreenshotsOnFail: false,
    proxyHost: null
};

module.exports = grunt => {
    grunt.registerMultiTask('testcafe', 'testcafe runner', () => {
        const currentTask = grunt.task.current;
        const done = currentTask.async();
        const opts = currentTask.options(DEFAULT_OPTS);

        let testCafe;
        let testCafeRunner;

        if (typeof opts.files === 'string') {
            opts.files = [opts.files];
        }

        const files = grunt.file.expand(opts.files).map(fileName => {
            return fileName;
        });

        createTestCafe()
            .then(tc => {
                testCafe = tc;
                testCafeRunner = testCafe.createRunner();

                if (opts.startApp.command) {
                    return testCafeRunner.startApp(opts.startApp.command, opts.startApp.initDelay);
                }

                return null;
            })
            .then(() => {
                let tcrunner = testCafeRunner
                    .useProxy(opts.proxyHost)
                    .src(files)
                    .browsers(opts.browsers)
                    .concurrency(opts.concurrency)
                    .filter(opts.filter)
                    .screenshots(
                        opts.screenshotsPath,
                        opts.takeScreenshotsOnFail,
                        opts.screenshotPathPattern
                    )

                // reporters
                opts.reporters.forEach(r => {
                    const reporter = r.split(":");
                    
                    if(reporter.length > 1) { // stream report to a file.
                        let filePath = reporter[1];
                        mkdirp.sync(path.dirname(filePath));
                        let stream = fs.createWriteStream(filePath);

                        tcrunner.reporter(reporter[0], stream);
                    } else {
                        tcrunner.reporter(reporter[0]);
                    }
                });

                return tcrunner.run(opts);
            })
            .then(failed => {
                if (failed > 0) {
                    throw new Error(failed);
                } else {
                    done();
                }
            })
            .catch(err => {
                grunt.fail.warn(err.message);
            })
            .then(() => {
                return testCafe && testCafe.close();
            })
            .then(done);
    });
};
