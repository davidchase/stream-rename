'use strict';

var globSteam = require('glob-stream');
var path = require('path');
var test = require('tape');
var streamRename = require('./index');
var buffer = require('./buffer');

test('simple rename keeps extension', function(t) {
    t.plan(1);
    globSteam
        .create('./package.json')
        .pipe(streamRename({
            basename: 'what'
        }))
        .pipe(buffer(function(err, files) {
            if (err) {
                throw new Error(err);
            }
            t.equal(path.basename(files[0].path), 'what.json');
        }));
});

test('simple prefix', function(t) {
    t.plan(1);
    globSteam
        .create('./package.json')
        .pipe(streamRename({
            prefix: 'hello-'
        }))
        .pipe(buffer(function(err, files) {
            if (err) {
                throw new Error(err);
            }
            t.equal(path.basename(files[0].path), 'hello-package.json');
        }));

});

test('simple suffix', function(t) {
    t.plan(1);
    globSteam
        .create('./package.json')
        .pipe(streamRename({
            suffix: '-ing'
        }))
        .pipe(buffer(function(err, files) {
            if (err) {
                throw new Error(err);
            }
            t.equal(path.basename(files[0].path), 'package-ing.json');
        }));

});

test('simple extension', function(t) {
    t.plan(1);
    globSteam
        .create('./package.json')
        .pipe(streamRename({
            extname: '.js'
        }))
        .pipe(buffer(function(err, files) {
            if (err) {
                throw new Error(err);
            }
            t.equal(path.basename(files[0].path), 'package.js');
        }));

});