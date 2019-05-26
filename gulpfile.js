"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var log = require("gulplog");
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify-es").default;
var sass = require("gulp-sass");
var svgmin = require("gulp-svgmin");
var autoprefixer = require("gulp-autoprefixer");
var connect = require("gulp-connect");
var pug = require("gulp-pug");

// Compile JavaScripts with sourcemaps
gulp.task("js", function() {
  return gulp
    .src("src/js/*.js", { read: false })
    .pipe(
      tap(function(file) {
        log.info("bundling " + file.path);
        file.contents = browserify(file.path, { debug: true }).bundle();
      })
    )
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

// Compile SaSS stylesheets with sourcemaps
gulp.task("sass", function() {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: ["node_modules"]
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});

// Minify SVG images
gulp.task("svg", function() {
  return gulp
    .src("src/images/**/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
});

// Pug templates
gulp.task("pug", function() {
  return gulp
    .src("src/pug/pages/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
});

// Build all
gulp.task("default", gulp.parallel("js", "sass", "svg", "pug"));

// Watch all
gulp.task("watch", function() {
  connect.server({
    root: ".",
    livereload: true
  });
  gulp.watch("src/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch("src/js/**/*.js", gulp.parallel("js"));
  gulp.watch("src/images/**/*.svg", gulp.parallel("svg"));
  gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
});
