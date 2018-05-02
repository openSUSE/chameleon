/*------------------------------------------------------------------------------
 * Gulp with SaSS and Browserify plugins
 *
 * See following links for basic usage examples:
 * http://gulpjs.com/
 * https://www.npmjs.com/package/gulp-browserify
 * https://www.npmjs.com/package/gulp-sass
 */

"use strict";

var gulp = require("gulp");
var browserify = require("gulp-browserify");
var sass = require("gulp-sass");

// Compile JavaScripts
gulp.task("js", function() {
  // Single entry point to browserify
  gulp
    .src(["src/js/app.js", "src/js/app-no-jquery.js"])
    .pipe(
      browserify({
        insertGlobals: true,
        debug: true
      })
    )
    .pipe(gulp.dest("./js"));
});

// Compile SASS stylesheets
gulp.task("sass", function() {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("copy", function() {
  return gulp
    .src(["node_modules/typicons.font/src/font/typicons.*"])
    .pipe(gulp.dest("./fonts/typicons"));
});

// Build all
gulp.task("default", ["js", "sass", "copy"]);

// Watch all
gulp.task("watch", function() {
  gulp.watch("./src/sass/**/*.scss", ["sass"]);
  gulp.watch("./src/js/**/*.js", ["js"]);
});
