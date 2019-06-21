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
    "drupal-blue": [".drupal:hover"],
    "drupal-white": [".home .drupal:hover"],
    "facebook-main": [".facebook"],
    "facebook-blue": [".facebook:hover"],
    "facebook-white": [".home .facebook:hover"],
    "github-main": [".github"],
    "github-blue": [".github:hover"],
    "github-white": [".home .github:hover"],
    "linkedin-main": [".linkedin"],
    "linkedin-blue": [".linkedin:hover"],
    "linkedin-white": [".home .linkedin:hover"],
    "twitter-main": [".twitter"],
    "twitter-blue": [".twitter:hover"],
    "twitter-white": [".home .twitter:hover"],
    "instagram-main": [".instagram"],
    "instagram-blue": [".instagram:hover"],
    "instagram-white": [".home .instagram:hover"],
    "rss-main": [".rss"],
    "rss-blue": [".rss:hover"],
    "rss-white": [".home .rss:hover"],
  }
};
