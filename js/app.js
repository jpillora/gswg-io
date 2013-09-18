(function() {
  var $, link, linkId, load, _i, _len;

  linkId = window.location.hash.substr(1);

  $ = function(id) {
    return document.getElementById(id);
  };

  load = function(link) {
    $('link-title').innerHTML = link.title;
    $('link-url').innerHTML = link.url;
    $('popup').className = 'active';
    return setTimeout(function() {
      return window.location.href = link.url;
    }, 2000);
  };

  if (linkId) {
    for (_i = 0, _len = LINKS.length; _i < _len; _i++) {
      link = LINKS[_i];
      if (link.id === linkId) {
        load(link);
        break;
      }
    }
  }

}).call(this);
