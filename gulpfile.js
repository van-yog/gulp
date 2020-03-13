"use strict";

let gulp = require("gulp");
let sass = require("gulp-sass");
let gutil = require("gulp-util");
let clean = require("gulp-clean");
let concat = require("gulp-concat");
let rename = require("gulp-rename");
let uglify = require("gulp-uglify");
let filesize = require("gulp-filesize");

gulp.task("js", function() {
  return gulp
    .src("srs/js/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js/"))
    .pipe(filesize())
    .on("error", gutil.log);
});

gulp.task("clean", function() {
  return gulp.src("build", { read: false }).pipe(clean());
});

gulp.task("css", function() {
  return gulp
    .src("srs/sass/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("build/css"));
});

gulp.task("start", function() {
  gulp.watch("srs/sass/**", gulp.series("css"));
  gulp.watch("srs/js/**", gulp.series("js"));
});
