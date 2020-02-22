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
const header = require("gulp-header");
const footer = require("gulp-footer");
const rename = require("gulp-rename");
const wait = require("gulp-wait");

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
    .pipe(wait(500))
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
    .pipe(wait(500))
    .pipe(connect.reload());
});

// Icons (SVG Sprite in JS)
gulp.task("icons-svg", function() {
  return gulp
    .src([
      "node_modules/remixicon/icons/Buildings/*.svg",
      "node_modules/remixicon/icons/Business/*.svg",
      "node_modules/remixicon/icons/Communication/*.svg",
      "node_modules/remixicon/icons/Design/*.svg",
      "node_modules/remixicon/icons/Development/*.svg",
      "node_modules/remixicon/icons/Device/*.svg",
      "node_modules/remixicon/icons/Document/*.svg",
      "node_modules/remixicon/icons/Editor/*.svg",
      "node_modules/remixicon/icons/Finance/*.svg",
      "node_modules/remixicon/icons/Logos/*.svg",
      "node_modules/remixicon/icons/Map/*.svg",
      "node_modules/remixicon/icons/Media/*.svg",
      "node_modules/remixicon/icons/Others/*.svg",
      "node_modules/remixicon/icons/System/*.svg",
      "node_modules/remixicon/icons/User/*.svg",
      "node_modules/remixicon/icons/Weather/*.svg",
      "src/icons/*.svg"
    ])
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: "icons",
            sprite: "sprite.svg"
          }
        }
      })
    )
    .pipe(gulp.dest("src"));
});

gulp.task("icons-js", function() {
  return gulp
    .src("src/icons/sprite.svg")
    .pipe(
      header(
        "const div = document.createElement('div'); div.className='d-none'; div.innerHTML ='"
      )
    )
    .pipe(footer("'; document.body.append(div);"))
    .pipe(rename("sprite.js"))
    .pipe(gulp.dest("src/js/data"));
});

gulp.task("icons", gulp.series("icons-svg", "icons-js"));

// Pug templates
gulp.task("pug", function() {
  return gulp
    .src("src/pug/pages/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./"))
    .pipe(wait(500))
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
  gulp.watch(["src/pug/**/*.pug", "*.md"], gulp.parallel("pug"));
});
