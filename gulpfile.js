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
const awspublish = require('gulp-awspublish');
const awspublishRouter = require("gulp-awspublish-router");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const del = require('del');
const eslint = require('gulp-eslint');
const fs = require('fs');
const glob = require('glob');
const gulpicon = require('gulpicon/tasks/gulpicon');
const gulpiconConfig = require('./_icons/config.js');
const gulpiconFiles = glob.sync('./_icons/*.svg');
const imagemin = require('gulp-imagemin');
const resize = require('gulp-image-resize');
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

// CSS
gulp.task('sass', 'Compile Sass to CSS', () => {
  return gulp.src('./_sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
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


// IMAGES
gulp.task('icons', false, gulpicon(gulpiconFiles, gulpiconConfig));

gulp.task('favicons', 'Copy favicons into position', () => {
  return gulp.src(['./_favicon/*.*'])
  .pipe(gulp.dest('./_site/'));
});

gulp.task('graphics-project-thumbnails', 'Rebuild gallery thumbnails for project images', () => {
  return gulp.src('_assets/projects/**/*.*')
    .pipe(resize({width: 200, height: 200, crop: true, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/thumbs/projects/'))
});

gulp.task('graphics-home-page', 'Derivatives of that home page background', () => {
  return gulp.src('./_gfx/home-background.jpg')
    .pipe(resize({width: 2400, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/home/2400'))
    .pipe(resize({width: 1800, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/home/1800'))
    .pipe(resize({width: 1600, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/home/1600'))
    .pipe(resize({width: 1200, crop: false, upscale: false})) // is 899px
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/home/1200'))
});

gulp.task('graphics-mastheads', 'Derivatives of masthead banner backgrounds', () => {
  return gulp.src('./_gfx/masthead/*.jpg')
    .pipe(resize({width: 1920, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/masthead/1920'))
    .pipe(resize({width: 1600, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/masthead/1600'))
    .pipe(resize({width: 1280, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/masthead/1280'))
    .pipe(resize({width: 960, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/masthead/960'))
    .pipe(resize({width: 720, crop: false, upscale: false}))
    .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
    .pipe(gulp.dest('_site/gfx/masthead/720'))
});

gulp.task('graphics', 'Compress site graphics and aggregate icons', ['icons', 'graphics-project-thumbnails', 'graphics-home-page', 'graphics-mastheads', 'favicons'], () => {
  return gulp.src(['./_gfx/**/*.*', '!./_gfx/home-background.jpg'])
  .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
  .pipe(gulp.dest('./_site/gfx/'));
});


// JS
gulp.task('js-photoswipe', false, () => {
  return gulp.src(['./node_modules/photoswipe/dist/*.js', '_js/photoswipe.tsp.js'])
    .pipe(concat('photoswipe.all.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./_site/js'));
});

gulp.task('js-photoswipe-assets', false, () => {
  return gulp.src(['./node_modules/photoswipe/dist/default-skin/*.png', './node_modules/photoswipe/dist/default-skin/*.svg', './node_modules/photoswipe/dist/default-skin/*.gif'])
    .pipe(gulp.dest('./_site/css'));
});

gulp.task('js-all', false, () => {
  return gulp.src([
    './node_modules/fg-loadcss/src/loadCSS.js',
    './node_modules/fg-loadcss/src/cssrelpreload.js',
    './_js/contact.js',
    './_js/collapsed-content.js'
  ])
    .pipe(concat('all.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./_site/js'));
});

gulp.task('js', 'JS/Photoswipe aggregation/minify, custom JS linting', ['js-photoswipe', 'js-photoswipe-assets', 'js-all']);

/*
     _ _         _           _ _     _
 ___(_) |_ ___  | |__  _   _(_) | __| |
/ __| | __/ _ \ | '_ \| | | | | |/ _` |
\__ \ | ||  __/ | |_) | |_| | | | (_| |
|___/_|\__\___| |_.__/ \__,_|_|_|\__,_|

*/

gulp.task('assets', 'Copy and compress if possible all project/post assets', () => {
  return gulp.src(['./_assets/**/*.*'])
  .pipe(imagemin([imagemin.mozjpeg({progressive: true})]))
  .pipe(gulp.dest('./_site/assets/'));
});

gulp.task('jekyll', 'Run jekyll build', (cb) => {
  const spawn = require('child_process').spawn;
  const jekyll = spawn('bundle', ['exec', 'jekyll', 'build', '--trace'], {stdio: 'inherit'});
  jekyll.on('exit', (code) => {
    cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('clean', 'Wipe the site root directory', () => {
  return del([
    '_site/**/*'
  ]);
})

gulp.task('build', 'Run all site-generating tasks: assets, [sass, js, graphics, icons], then jekyll', (cb) => {
  runSequence('assets', ['sass', 'graphics', 'icons', 'js'], 'jekyll', cb);
});

gulp.task('build-clean', 'Wipe the site root and rebuild', (cb) => {
  runSequence('clean', 'build', cb);
});

gulp.task('connect', () => {
  connect.server({ root: '_site' });
});

gulp.task('publish-s3', 'Sync the site to S3', (cb) => {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create({
    region: 'us-west-1',
    params: {
      Bucket: 'tsmith.com'
    },
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=86400, no-transform, public'
  };

  return gulp.src('./_site/**/*.*')
    .pipe(awspublishRouter({
      cache: {
          // cache for 1 week by default
          cacheTime: 604800
      },

      routes: {
        // Cache site components for a month
        "^(css|js|gfx)/.+": {
          cacheTime: 2592000
        },

        // Cache static project assets for a month
        "^assets/.+": {
          cacheTime: 2592000
        },

        // 1 week for HTML files
        "\\.html$": {
          cacheTime: 604800
        },

        // Project writeups can last 6 months
        "^project/.+\\.html": {
          cacheTime: 15552000
        },

        // 3 hours for the blog home page
        "^blog/index\\.html$": {
          cacheTime: 10800
        },

        // 3 hours for the RSS feed
        "^feed\\.xml$": {
          cacheTime: 10800
        },

        // 6 months for blog posts, I can invalidate manually
        "^blog/\\d{4}/\\.+/index\\.html$": {
          cacheTime: 15552000
        },

        // 6 months for the error pages
        "^(403|404).+": {
          cacheTime: 15552000
        },

        // Favicon for a year
        "^favicon.+": {
          cacheTime: 31536000
        },

        // pass-through for anything that wasn't matched by routes above, to
        // be uploaded with default options
        "^.+$": "$&"
      }
    }))

    .pipe(publisher.publish())

    .pipe(publisher.sync())

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());
});

gulp.task('publish-staging-s3', 'Sync the site to S3 staging bucket', (cb) => {
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create({
    region: 'us-west-1',
    params: {
      Bucket: 'tsmithcreative-staging'
    },
  });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=86400, no-transform, public'
  };

  return gulp.src('./_site/**/*.*')
    .pipe(awspublishRouter({
      cache: {
          // cache for 1 week by default
          cacheTime: 86400
      },

      routes: {
        // pass-through for anything that wasn't matched by routes above, to
        // be uploaded with default options
        "^.+$": "$&"
      }
    }))

    .pipe(publisher.publish())
    .pipe(publisher.sync())

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());
});

gulp.task('publish', 'Build the site and publish to S3', (cb) => {
  runSequence('build', 'publish-s3', cb);
});

gulp.task('publish-staging', 'Build the site and publish to S3', (cb) => {
  runSequence('build', 'publish-staging-s3', cb);
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
  gulp.watch(['./*.*', './assets/**/*.*', './**/*.html', './**/*.yml', './**/*.markdown', './**/*.md', './**/*.rb', '!./node_modules/**', '!./_site/**'], ['jekyll']);
  gulp.watch(['./**/*.js', '!./_site/**', '!./node_modules/**'], ['js']);
  gulp.watch(['./_gfx/**/*.*', './_assets/**/*.*'], ['graphics']);
  gulp.watch(['./_icons/**/*.*'], ['icons']);
  gulp.watch(['./_assets/**/*.*'], ['assets']);
  connect.server({ root: '_site', debug: true });
});
