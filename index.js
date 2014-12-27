'use strict';
// @todo create a builder method..
// if input has extension strip it
// and either append at the end or use given options.extname
var through = require('through2');
var path = require('path');

var gutil = require('gulp-util');
var globSteam = require('glob-stream');

var builder = function(options, oldBasename) {
    var prefix = options.prefix || '';
    var suffix = options.suffix || '';
    return prefix + (options.basename || oldBasename) + suffix + (options.basename ? options.extname : '');
};

var streamRename = function(options) {
    options = options || {};

    return through.obj(function(chunk, enc, callback) {
        var oldBasename;
        var arr = chunk.path.split('/');
        var root = options.root || chunk.base;
        root = arr.indexOf(path.basename(root));
        oldBasename = arr[root + 1];
        arr[root + 1] = builder(options, oldBasename);
        chunk.path = arr.join('/');
        this.push(chunk);
        callback();
    });
};

globSteam
    .create('./package.json')
    .pipe(streamRename({
        prefix: 'yo-',
        extname: '.js'
    }))
    .pipe(gutil.buffer(function(err, files) {
        if (err) {
            throw new Error(err);
        }
        gutil.log(files);
    }));

module.exports = streamRename;