# grunt-testcafe

[![Build Status](https://travis-ci.org/crudo/grunt-testcafe.svg?branch=master)](https://travis-ci.org/crudo/grunt-testcafe)

> Tests runner

## Getting Started

This plugin requires Grunt `0.4 - 1`.

```shell
npm install grunt-testcafe --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-testcafe")
```

## The "testcafe" task

### Overview

In your project's Gruntfile, add a section named `testcafe` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    testcafe: {
        test: {
            options: {
                files: ["tests/*.test.js"],
                browsers: ["chrome"]
            }
        }
    }
})
```

#### Advanced example:

```js
grunt.initConfig({
    testcafe: {
        test: {
            options: {
                files: ["tests/*.test.js"],
                browsers: ["firefox", "chrome"],
                takeScreenshotsOnFail: true,
                screenshotsPath: "tests/screenshots",
                filter: (testName, fixtureName, fixturePath) => {
                    const testNameFilter = testName.match(
                        new RegExp(grunt.option("testName"))
                    )
                    const fixtureNameFilter = fixtureName.match(
                        new RegExp(grunt.option("fixtureName"))
                    )
                    const fixturePathFilter = fixturePath.match(
                        new RegExp(grunt.option("fixturePath"))
                    )
                    return (
                        testNameFilter && fixtureNameFilter && fixturePathFilter
                    )
                }
            }
        }
    }
})
```

### Options

#### files

_Type_: `Array`

_Default_: `[]`

_Details_: [Configures the test runner to run tests from the specified files.](http://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#src)

#### browsers

_Type_: `Array`

_Default_: `[]`

_Details_: [Specifying Browsers for Test Task](https://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browser-support.html#specifying-browsers-for-test-task)

Configures the test runner to run tests in the specified browsers.

_Required_

#### concurrency

_Type_: `Number`

_Default_: `1`

_Details_: [Specifies that tests should run concurrently.](http://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-c-n---concurrency-n)

#### reporter

_Type_: `String`

_Default_: `spec`

_Details_: [Reporters](https://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/reporters.html)

Specifies the reporter.

#### reporterOutputFile

_Type_: `String`

_Details_: [Reporters](http://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#saving-the-report-to-a-file)

Specifies the output file path for reporter.

#### filter

_Type_: `function(testName, fixtureName, fixturePath)`

_Default_: `null`

_Details_: [runner.filter](https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#filter)

Allows you to manually select which tests should be run.

#### screenshotsPath

_Type_: `String`

_Default_: `null`

_Details_: [Screenshots path](http://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-s-path---screenshots-path)

The path to which the screenshots will be saved. Enables the test runner to take screenshots of the tested webpages.

#### screenshotsPathPattern

_Type_: `String`

_Default_: `null`

_Details_: [Screenshots path pattern](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-p---screenshot-path-pattern)

Specifies a custom pattern to compose screenshot files' relative path and name. This pattern overrides the default path pattern.

#### takeScreenshotsOnFail

_Type_: `Boolean`

_Default_: `false`

_Details_: [Take screenshots on fail](http://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-s---screenshots-on-fails)

Specifies if screenshots should be taken automatically whenever a test fails. Requires that the [screenshotsPath](#screenshotsPath) is set.

#### skipJsErrors

_Type_: `Boolean`

_Default_: `false`

_Details_: [Skip JS errors](http://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#-e---skip-js-errors)

Defines whether to continue running a test after a JavaScript error occurs on a page (`true`), or consider such a test failed (`false`).

#### quarantineMode

_Type_: `Boolean`

_Default_: `false`

Defines whether to enable the [quarantine mode](https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#quarantine-mode).

#### selectorTimeout

_Type_: `Number`

_Default_: `10000`

_Details_: [Selector timeout](http://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html#selector-timeout)

Specifies the amount of time, in milliseconds, within which [selectors](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html) make attempts to obtain a node to be returned.

#### assertionTimeout

_Type_: `Number`

_Default_: `3000`

_Details_: [Assertion options](http://devexpress.github.io/testcafe/documentation/test-api/assertions/#assertion-options)

Specifies the amount of time, in milliseconds, within which TestCafe makes attempts to successfully execute an assertion if a selector property or a client function was passed as an actual value.

#### speed

_Type_: `Number`

_Default_: `1`

_Details_ : [Speed factor](http://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#--speed-factor)

Specifies the speed of test execution. Should be a number between `1` (the fastest) and `0.01` (the slowest).

#### startApp

_Type_: `Object { command, initDelay }`

_Default_: `{ initDelay: 1000 }`

_Details_ : [startApp](http://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#startapp)

Specifies a shell command that will be executed before running tests. Use it to launch or deploy the application that will be tested.

#### proxyHost

_Type_: `String`

_Default_: `null`

_Details_ : [proxy](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html#--proxy-host)

Specifies the proxy server used in your local network to access the Internet. You can also specify authentication credentials with the proxy host.

## License

[The MIT License](LICENSE.txt)
