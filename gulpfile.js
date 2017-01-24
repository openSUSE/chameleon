/*------------------------------------------------------------------------------
 * Gulp with SaSS and Browserify plugins
 *
 * See following links for basic usage examples:
 * http://gulpjs.com/
 * https://www.npmjs.com/package/gulp-browserify
 * https://www.npmjs.com/package/gulp-sass
 */

'use strict';

var argv = require('yargs').argv;
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');

// Compile JavaScripts
gulp.task('js', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
    .pipe(browserify({
        insertGlobals : true,
        debug : !argv.production
    }))
    .pipe(gulp.dest('./dist/js'))
});

// Compile SASS stylesheets
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

// Copy fonts, images, etc.
gulp.task('copy', function () {
    gulp.src('./node_modules/npm-font-open-sans-condensed/fonts/*')
        .pipe(gulp.dest('./dist/fonts/open-sans-condensed'));
    gulp.src('./node_modules/open-sans-fontface/fonts/*/*')
        .pipe(gulp.dest('./dist/fonts/open-sans'));
});

// Build all
gulp.task('default', [ 'js', 'sass' ]);

// Watch all
gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
});
