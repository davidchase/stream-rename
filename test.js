'use strict';

var gutil = require('gulp-util');
var globSteam = require('glob-stream');
var path = require('path');
var test = require('tape');
var streamRename = require('./index');

test('simple rename keeps extension', function(t) {
    t.plan(1);
    globSteam
        .create('./package.json')
        .pipe(streamRename({
            basename: 'what'
        }))
        .pipe(gutil.buffer(function(err, files) {
            if (err) {
                throw new Error(err);
            }
            t.equal(path.basename(files[0].path), 'what.json');
        }));
});

test('simple prefix', function(t){
    t.plan(1);
    globSteam
        .create('./package.json')
        .pipe(streamRename({
            prefix: 'hello-'
        }))
        .pipe(gutil.buffer(function(err, files) {
            if (err) {
                throw new Error(err);
            }
            t.equal(path.basename(files[0].path), 'hello-package.json');
        }));

});