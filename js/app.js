(function() {
  var $, LINKS, check, load, run, start, xhr;

  ga('create', 'UA-38709761-11', window.location.hostname);

  ga('send', 'pageview');

  LINKS = null;

  $ = function(id) {
    return document.getElementById(id);
  };

  load = function(link, query) {
    var re;
    load.loading = true;
    if (link.pattern) {
      re = new RegExp(link.pattern);
      link.url = query.replace(re, link.url);
      link.title = query.replace(re, link.title);
    }
    ga('send', 'event', 'Link', link.title, link.url);
    $('link-title').innerHTML = link.title;
    $('link-url').innerHTML = link.url;
    $('popup').className = 'active';
    setTimeout(function() {
      return window.location.href = link.url;
    }, 2000);
  };

  run = function(query) {
    var link, _i, _len;
    if (!query || load.loading) {
      return;
    }
    for (_i = 0, _len = LINKS.length; _i < _len; _i++) {
      link = LINKS[_i];
      if (link.id === query || link.pattern && new RegExp(link.pattern).test(query)) {
        load(link, query);
        return;
      }
    }
  };

  check = function() {
    var query;
    query = window.location.hash.substr(1);
    if (query === check.last) {
      return;
    }
    check.last = query;
    return run(query);
  };

  start = function() {
    check();
    return setInterval(check, 100);
  };

  xhr = new XMLHttpRequest;

  xhr.open('GET', 'links.json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      LINKS = JSON.parse(xhr.responseText);
      return start();
    }
  };

  xhr.send();

}).call(this);
