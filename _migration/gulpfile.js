/**
 * @file gulpfile.js
 *
 * FOR MIGRATION: THIS FILE HAS BEEN REWRITTEN AS AN INDEX OF ITS OLD TASKS.
 */

/*
                    _
  __ _ ___ ___  ___| |_ ___
 / _` / __/ __|/ _ \ __/ __|
| (_| \__ \__ \  __/ |_\__ \
 \__,_|___/___/\___|\__|___/

*/

// CSS
// `sass` --> take _sass and compile to _site/css with minor optimizations.

// IMAGES
// `favicons` --> copy _favicon into _site
// `graphics-project-thumbnails` --> _assets/projects/*, resize 200x200 and copy to _site/gfx/thumbs/projects/
// `graphics-home-page` --> _gfx/home-background.jpg, resize to widths [2400, 1800, 1600, 1200] and copy to _site/gfx/home/[size]
// `graphics-mastheads` --> _gfx/masthead/*.jpg, resize to widths [1820, 1600, 1280, 960, 720] and copy to _site/gfx/masthead/[size]
// `graphics` --> all the above plus anything else in _gfx --> _site/gfx with imagemin

// JS
// `js-photoswipe` --> grab legacy photoswipe's JS and _js/photoswipe.tsp.js --> _site/js/photoswipe.all.js and uglify
// `js-photoswipe-assets` --> pull png/svg/gif from photoswipe/dist -> _site/css
// `js-all` --> grab loadCSS.js, cssrelpreload.js, _js/* --> _site/js/all.js and uglify
// `js` --> all the above

/*
     _ _         _           _ _     _
 ___(_) |_ ___  | |__  _   _(_) | __| |
/ __| | __/ _ \ | '_ \| | | | | |/ _` |
\__ \ | ||  __/ | |_) | |_| | | | (_| |
|___/_|\__\___| |_.__/ \__,_|_|_|\__,_|

*/

// `assets` --> copy _assets/* --> _site/assets with imagemin
// `jekyll` --> bundle exec jekyll build
// `clean` --> wipe _site
// `build` --> run [assets, sass, graphics, js, jekyll]
// `build-clean` --> run [clean, build]
// `connect` --> run a web server for _site ... but I don't know if this worked


/*
             _             _          __  __
  __ _ _   _| |_ __    ___| |_ _   _ / _|/ _|
 / _` | | | | | '_ \  / __| __| | | | |_| |_
| (_| | |_| | | |_) | \__ \ |_| |_| |  _|  _|
 \__, |\__,_|_| .__/  |___/\__|\__,_|_| |_|
 |___/        |_|
*/

// `watch` --> watch for changes and run the appropriate task above; serve on HTTP
