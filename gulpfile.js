"use strict";

const gulp = require("gulp");
const browserify = require("browserify");
const log = require("gulplog");
const tap = require("gulp-tap");
const buffer = require("gulp-buffer");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-dart-sass");
const svgmin = require("gulp-svgmin");
const autoprefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");
const open = require("gulp-open");
const pug = require("gulp-pug");

// Compile JavaScripts with sourcemaps
gulp.task("js", function () {
  return gulp
    .src("src/js/*.js", { read: false })
    .pipe(
      tap(function (file) {
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
gulp.task("sass", function () {
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
gulp.task("svg", function () {
  return gulp
    .src("src/images/**/*.svg")
    .pipe(svgmin({
      plugins: [
        { convertShapeToPath: true },
        { mergePaths: true },
        {
          removeAttrs: {
            attrs: ["style", "font.*", "overflow.*"]
          }
        }
      ]
    }))
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
});

// Pug templates
gulp.task("pug", function () {
  return gulp
    .src("src/pug/pages/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./"))
    .pipe(connect.reload());
});

// Build all
gulp.task("build", gulp.parallel("js", "sass", "svg", "pug"));
gulp.task("default", gulp.parallel("build"));

// Watch all
gulp.task("watch", function () {
  // start web server with live reload
  connect.server({
    root: ".",
    port: "8044",
    livereload: true
  });
  // start web browser to load test pages
  gulp.src('.').pipe(open({ uri: 'http://localhost:8044' }));

  gulp.watch("src/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch("src/js/**/*.js", gulp.parallel("js"));
  gulp.watch("src/langs/*.json", gulp.parallel("js"));
  gulp.watch("src/images/**/*.svg", gulp.parallel("svg"));
  gulp.watch("src/pug/**/*.pug", gulp.parallel("pug"));
});
