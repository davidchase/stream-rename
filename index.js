'use strict';
var through = require('through2');
var path = require('path');

var streamRename = function(options) {
    var suffix;
    var prefix;
    options = options || {};
    prefix = options.prefix || '';
    suffix = options.suffix || '';
    return through.obj(function(chunk, enc, callback) {
        var arr = chunk.path.split('/');
        var extname;
        var root = options.root || chunk.base;
        root = arr.indexOf(path.basename(root));
        extname = path.extname(arr[root + 1]);
        arr[root + 1] = prefix + (options.basename || arr[root + 1]) + suffix + (options.basename ? options.extname || extname : '');
        chunk.path = arr.join('/');
        this.push(chunk);
        callback();
    });
};

module.exports = streamRename;