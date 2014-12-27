Stream Rename
=============

A simple stream transform that renames files/directories.

This module makes no assumptions how you read or write the stream

but only how you transform it.

Usage
=====
```js
// create a stream
var globSteam = require('glob-stream');
var streamRename = require('stream-rename');
globSteam
       .create('./app.js')
       .pipe(streamRename({
           basename: 'compressed',
           extname: '.min.js'
       }))
       .pipe(process.stdout);
```

Gulp Usage
==========
```js
// create a stream
var gulp = require('gulp');
var streamRename = require('stream-rename');
gulp.src('./app.js')
       .pipe(streamRename({
           basename: 'compressed',
           extname: '.min.js'
       }))
       .pipe(gulp.dest('./dest'));
```