"use strict";

const gulp = require("gulp");
const browserify = require("browserify");
const log = require("gulplog");
const tap = require("gulp-tap");
const buffer = require("gulp-buffer");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");
const open = require("gulp-open");
const pug = require("gulp-pug");
const svgSprite = require("gulp-svg-sprite");

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

// Icons (SVG Sprite)
gulp.task("icons", function() {
  return gulp
    .src(["node_modules/remixicon/icons/*/*.svg", "src/icons/*.svg"])
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: "svg",
            sprite: "sprite.svg"
          }
        }
      })
    )
    .pipe(gulp.dest("dist"));
});

// Pug templates
gulp.task("pug", function() {
  return gulp
    .src("src/pug/pages/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
});

// Build all
gulp.task("build", gulp.parallel("js", "sass", "pug", "icons"));
gulp.task("default", gulp.parallel("build"));

// Watch all
gulp.task("watch", function() {
  // start web server with live reload
  connect.server({
    root: ".",
    port: "8044",
    debug: true,
    livereload: true
  });
  // start web browser to load test pages
  gulp.src(".").pipe(open({ uri: "http://localhost:8044" }));

  gulp.watch("src/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch(["src/js/**/*.js", "src/langs/*.json"], gulp.parallel("js"));
  gulp.watch("src/icons/*.svg", gulp.parallel("icons"));
  gulp.watch(["src/pug/**/*.pug", "*.md"], gulp.parallel("pug"));
});
