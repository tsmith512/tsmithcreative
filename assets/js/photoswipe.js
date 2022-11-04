import PhotoSwipeLightbox from 'vendor/photoswipe/dist/photoswipe-lightbox.esm.js';
const lightbox = new PhotoSwipeLightbox({
  gallery: '.pswp-container',
  children: 'a',
  pswpModule: () => import('vendor/photoswipe/dist/photoswipe.esm.js'),
});
lightbox.init();
