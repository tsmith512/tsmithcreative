(function(){
  'use strict';

  var collapsed = document.querySelectorAll(".collapsed-toggle");
  if (collapsed.length) {
    Array.prototype.forEach.call(collapsed, function(el, i){
      el.addEventListener("click", collapsedContentToggle, false);
    });
  }

  function collapsedContentToggle(e) {
    e.preventDefault();
    var container = e.target.parentNode.parentNode;
    console.log(container);
    container.classList.toggle('open');
  }
})();
