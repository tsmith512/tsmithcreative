/**
 * @file gulpfile.js
 *
 * Build tasks and generator tools for www.tsmithcreative.com
 * By Taylor Smith @tsmith512
 *
 * Run `gulp help` to for a list of suggested tasks.
 */

/* eslint strict: ["error", "global"] */
/* global require */
'use strict';

/*
     _
  __| | ___ _ __  ___
 / _` |/ _ \ '_ \/ __|
| (_| |  __/ |_) \__ \
 \__,_|\___| .__/|___/
           |_|
*/

const gulp = require('gulp-help')(require('gulp'), {
  description: false,
  hideDepsMessage: true,
  hideEmpty: true
});
const gutil = require('gulp-util');

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const fs = require('fs');
const glob = require('glob');
const gulpicon = require('gulpicon/tasks/gulpicon');
const gulpiconConfig = require('./_icons/config.js');
const gulpiconFiles = glob.sync('./_icons/*.svg');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

/*
                    _
  __ _ ___ ___  ___| |_ ___
 / _` / __/ __|/ _ \ __/ __|
| (_| \__ \__ \  __/ |_\__ \
 \__,_|___/___/\___|\__|___/

*/

gulp.task('sass', 'Compile Sass to CSS', () => {
  return gulp.src('./_sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // Run CleanCSS, but mostly just for minification. Starting light here.
    .pipe(cleanCSS({
      advanced: false,
      mediaMerging: false,
      rebase: false,
      restructuring: false,
      shorthandCompacting: false
    }))
    .pipe(gulp.dest('./_site/css'));
});

gulp.task('icons', false, gulpicon(gulpiconFiles, gulpiconConfig));

gulp.task('graphics', 'Compress site graphics and aggregate icons', ['icons'], () => {
  return gulp.src('./_gfx/**/*.*')
    // .pipe(imagemin())
    .pipe(gulp.dest('./_site/gfx/'));
});

/*
     _ _         _           _ _     _
 ___(_) |_ ___  | |__  _   _(_) | __| |
/ __| | __/ _ \ | '_ \| | | | | |/ _` |
\__ \ | ||  __/ | |_) | |_| | | | (_| |
|___/_|\__\___| |_.__/ \__,_|_|_|\__,_|

*/

gulp.task('jekyll', 'Run jekyll build', (cb) => {
  const spawn = require('child_process').spawn;
  const jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});
  jekyll.on('exit', (code) => {
    cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('build', 'Run all site-generating tasks: sass, js, graphics, icons, htaccess then jekyll', (cb) => {
  runSequence(['sass', 'graphics', 'icons'], 'jekyll', cb);
});

/*
             _             _          __  __
  __ _ _   _| |_ __    ___| |_ _   _ / _|/ _|
 / _` | | | | | '_ \  / __| __| | | | |_| |_
| (_| | |_| | | |_) | \__ \ |_| |_| |  _|  _|
 \__, |\__,_|_| .__/  |___/\__|\__,_|_| |_|
 |___/        |_|
*/

gulp.task('default', false, ['help']);

gulp.task('watch', 'Watch-run sass, jekyll, js, graphics, and icons tasks', () => {
  gulp.watch(['./_sass/**/*.scss'], ['sass']);
  gulp.watch(['./*.*', './**/*.html', './**/*.yml', './**/*.markdown', './**/.*.md', './**/*.rb', '!./_site/**'], ['jekyll']);
  gulp.watch(['./_gfx/**/*.*'], ['graphics']);
  gulp.watch(['./_icons/**/*.*'], ['icons']);
});
