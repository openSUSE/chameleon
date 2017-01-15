/*------------------------------------------------------------------------------
 * Gulp with SaSS and Browserify plugins
 *
 * See following links for basic usage examples:
 * http://gulpjs.com/
 * https://www.npmjs.com/package/gulp-browserify
 * https://www.npmjs.com/package/gulp-sass
 */

'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');

// Compile JavaScripts
gulp.task('js', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
    .pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
    }))
    .pipe(gulp.dest('./dist/js'))
});

// Watch JavaScript file changes
gulp.task('js:watch', function () {
    gulp.watch('./src/js/**/*.js', ['js']);
});

// Compile SASS stylesheets
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

// Watch SASS file changes
gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// Build all
gulp.task('default', [ 'js', 'sass' ]);

// Watch all
gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
});
