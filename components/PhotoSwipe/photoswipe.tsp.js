/**
 * @file photoswipe.js
 * Include this site's setup and init for Photoswipe. We get the
 * library's primary and skin JS/CSS through the node module package.
 * Adampted somewhat hapazardly from tsmithphotos
 */
(function () {
  'use strict';

  /**
   * This is a consolidated PhotoSwipe-generating click handler. Because this
   * code serves single-gallery-pages, multiple-gallery-pages, and individual
   * images, it does a lot of checks here instead of building out a bunch of
   * stuff on DOMContentLoaded to keep code DRY and easy to follow.
   */
  function launchLightbox(e) {
    e.preventDefault();

    var pswpElement = document.querySelectorAll('.pswp')[0];
    var index = false;
    var items = [];

    // Get the <li> of the link (Element)
    var parent = this.parentNode;

    // If the parent element is a list item, then we're in a gallery, we should
    // build out the inventory and determine the current index.
    if (parent.nodeName == "LI") {
      // Get the <ul> of the link (Element)
      var list = parent.parentNode;

      // How many images are in this gallery? (int)
      var total = list.querySelectorAll('a').length;

      // Need to get the index of this LI within the UL (int)
      var index = Array.prototype.indexOf.call(list.children, parent);

      // Build out the list of what else is in this specific gallery
      for (var i = 0; i < total; i++) {
        var photoLink = list.children[i].querySelector('a');

        // Include only elements
        if (photoLink.nodeType !== 1) { continue; }

        var size = photoLink.getAttribute('data-size') ? photoLink.getAttribute('data-size').split('x') : [0,0];

        var item = {
          src: photoLink.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10),
          title: photoLink.getAttribute('title')
        };

        items.push(item);
      }
    }
    // The parent element wasn't a list item, so we're opening a single image.
    // We don't need to gather a gallery inventory, but we do need to set some
    // defaults to pass along.
    else {
      var size = this.getAttribute('data-size') ? this.getAttribute('data-size').split('x') : [0,0];
      var items = [{
        src: this.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      }];
    }

    // define options
    var options = {
      index: index || 0,
      shareButtons: []
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

    /**
     * Jekyll Picture Tag doesn't include on the link what the dimensions are of
     * the original image, which makes Photoswipe unhappy. Here we load the
     * image, get the dimensions, and update the slide object. Adapted from
     * https://github.com/dimsemenov/PhotoSwipe/issues/796
     * @TODO: Technically this loads the image twice; would this result in a
     * parallel download? Or displaying the image load it from the cache?
     */
    gallery.listen('gettingData', function(index, item) {
      if (item.w < 2 || item.h < 2) {
        var img = new Image();
        img.onload = function() { // will get size after load
          item.w = this.width; // set image width
          item.h = this.height; // set image height
          // @TODO: If we're applying this to a gallery need to save out those sizes for re-use if an image is re-opened.
          gallery.invalidateCurrItems(); // reinit Items
          gallery.updateSize(true); // reinit Items
        }
        img.src = item.src; // let's download image
      }
    });

    gallery.init();
  }

  // Loop through photos in the album and attach the above initializer
  // @TODO: NEED TO ADD GALLERY LINKS AS WELL AS PICTURE TAG MEDIA LINKS.
  var photos = document.querySelectorAll('.gallery a, .media-link');
  for (var i = 0; i < photos.length; i++) {
    photos[i].addEventListener('click', launchLightbox, false);
  }
})();
