Stream Rename
=============

> A simple stream transform that renames files/directories.

This module makes no assumptions how you read or write streams.


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
       .pipe(process.stdout); // path will contain compressed.min.js
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
       .pipe(gulp.dest('./dest')); // path will contain compressed.min.js
```

API
===

```js
var streamRename = require('stream-rename');
```

var sr = streamRename(opts={})
------

`opts.prefix` a prefix to the new or original basename. ie: `pre-`

`opts.basename` is the new name of the file or directory you want to change.

`opts.extname` is a new extension you want to add to the basename. ie: `.js`

`opts.suffix` a suffix to the new or original basename. ie: `-ing`

returns a `through` stream to `pipe` to a write stream.
