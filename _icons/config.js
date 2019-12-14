// Adapted from https://raw.githubusercontent.com/filamentgroup/gulpicon/master/example/config.js

var path = require( "path" );

module.exports = {
  dest: "./_site/gfx/icons",

  // CSS filenames
  datasvgcss: "icons.data.svg.css",
  datapngcss: "icons.data.png.css",
  urlpngcss: "icons.fallback.css",

  // preview HTML filename
  previewhtml: "preview.html",

  // grunticon loader code snippet filename
  loadersnippet: "grunticon.loader.js",

  // Include loader code for SVG markup embedding
  enhanceSVG: true,

  // Make markup embedding work across domains (if CSS hosted externally)
  corsEmbed: false,

  // folder name (within dest) for png output
  pngfolder: "png",

  // There's something about compressing PNGs that causes an error, see filamentgroup/gulpicon#11
  compressPNG: false,

  // prefix for CSS classnames
  cssprefix: ".icon-",

  defaultWidth: "100px",
  defaultHeight: "100px",

  // define vars that can be used in filenames if desirable,
  // like foo.colors-primary-secondary.svg
  colors: {
    main: "#999999",
    blue: "#3347af",
    light: "#CCCCCC",
    white: "#FFFFFF"
  },

  dynamicColorOnly: true,

  // css file path prefix
  // this defaults to "/" and will be placed before the "dest" path
  // when stylesheets are loaded. It allows root-relative referencing
  // of the CSS. If you don't want a prefix path, set to to ""
  cssbasepath: "/gfx/icons",
  customselectors: {
    "drupal-main": [".drupal"],
    "drupal-blue": [".drupal:hover, .home .drupal:hover"],
    "drupal-white": [".home .drupal"],
    "facebook-main": [".facebook"],
    "facebook-blue": [".facebook:hover, .home .facebook:hover"],
    "facebook-white": [".home .facebook"],
    "github-main": [".github"],
    "github-blue": [".github:hover, .home .github:hover"],
    "github-white": [".home .github"],
    "linkedin-main": [".linkedin"],
    "linkedin-blue": [".linkedin:hover, .home .linkedin:hover"],
    "linkedin-white": [".home .linkedin"],
    "twitter-main": [".twitter"],
    "twitter-blue": [".twitter:hover, .home .twitter:hover"],
    "twitter-white": [".home .twitter"],
    "instagram-main": [".instagram"],
    "instagram-blue": [".instagram:hover, .home .instagram:hover"],
    "instagram-white": [".home .instagram"],
    "rss-main": [".rss"],
    "rss-blue": [".rss:hover, .home .rss:hover"],
    "rss-white": [".home .rss"],
  }
};
