'use strict';

var through = require('through2');
var path = require('path');

// build string to rename file/directory
// based on user options
var _stringBuilder = function(options, oldBase) {
    var prefix = options.prefix || '';
    var suffix = options.suffix || '';
    var getExtname = path.extname(oldBase);
    var extname = options.extname || getExtname;
    var basename = options.basename || oldBase;
    basename = getExtname ? basename.replace(/\.[a-z]*/, '') : basename;
    return prefix + basename + suffix + extname;
};

var streamRename = function(options) {
    options = options || {};
    return through.obj(function(chunk, enc, callback) {
        var oldBase;
        var arr = chunk.path.split('/');
        var root = options.root || chunk.base;
        root = arr.indexOf(path.basename(root));
        oldBase = arr[root + 1];
        arr[root + 1] = _stringBuilder(options, oldBase);
        chunk.path = arr.join('/');
        this.push(chunk);
        callback();
    });
};

module.exports = streamRename;