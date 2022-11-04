import PhotoSwipeLightbox from 'vendor/photoswipe/dist/photoswipe-lightbox.esm.js';
const lightbox = new PhotoSwipeLightbox({
  gallery: '.pswp-container',
  children: 'a',
  pswpModule: () => import('vendor/photoswipe/dist/photoswipe.esm.js'),
  padding: { top: 30, bottom: 30, left: 30, right: 30 }
});
lightbox.init();
