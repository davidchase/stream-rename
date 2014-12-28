'use strict';

var through = require('through2');

module.exports = function(func) {
    var buffer = [];
    var end = function(callback) {
        this.push(buffer);
        callback();
        return func && func(null, buffer);
    };
    var push = function(chunk, enc, callback) {
        buffer.push(chunk);
        callback();
    };
    return through.obj(push, end);
};