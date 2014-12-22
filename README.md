Stream Rename
=============

A simple stream transform that renames files/directories.



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