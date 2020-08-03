"use strict";

const gulp = require("gulp");
const browserify = require("browserify");
const log = require("gulplog");
const tap = require("gulp-tap");
const buffer = require("gulp-buffer");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");
const open = require("gulp-open");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const wait = require("gulp-wait");

// Compile JavaScripts with sourcemaps
gulp.task("js", function () {
  return gulp
    .src(["src/js/*.js", "src/js/components/*.js"], { read: false })
    .pipe(
      tap(function (file) {
        log.info("bundling " + file.path);
        file.contents = browserify(file.path, { debug: true }).bundle();
      })
    )
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/js"))
    .pipe(wait(500))
    .pipe(connect.reload());
});

// Copy jQuery and Bootstrap JS
gulp.task("copylib", function () {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/jquery/dist/jquery.slim.js",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.js*"
    ])
    .pipe(gulp.dest("dist/js"));
});

// Copy Ruby Gem assets
gulp.task("copygem", function () {
  return gulp
    .src(["src/sass/**/*.scss", "!src/sass/chameleon-bs3.scss", "!src/sass/chameleon-wiki.scss", "!src/sass/wiki/**/*"])
    .pipe(rename(function (path) {
      if (path.extname === '.scss' && path.basename && path.basename.charAt(0) !== '_') {
        path.basename = '_' + path.basename;
      }
    }))
    .pipe(gulp.dest("assets/stylesheets"));
});

// Compile SaSS stylesheets with sourcemaps
gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["node_modules", "node_modules/bootstrap/scss"]
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/css"))
    .pipe(wait(500))
    .pipe(connect.reload());
});

// Documents
gulp.task("docs", function () {
  return gulp
    .src("docs/pug/pages/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./"))
    .pipe(wait(500))
    .pipe(connect.reload());
});

// Build all
gulp.task("build", gulp.parallel("js", "sass", "docs", "copylib", "copygem"));
gulp.task("default", gulp.parallel("build"));

// Watch all
gulp.task("watch", function () {
  // start web server with live reload
  connect.server({
    root: ".",
    port: "8044",
    debug: true,
    livereload: true
  });
  // start web browser to load test pages
  gulp.src(".").pipe(open({ uri: "http://localhost:8044" }));

  gulp.watch("src/sass/**/*.scss", gulp.parallel("sass", "copygem"));
  gulp.watch(["src/js/**/*.js", "src/langs/*.json"], gulp.parallel("js"));
  gulp.watch(["*.md", "docs/**/*.md", "docs/**/*.pug"], gulp.parallel("docs"));
});
