(function() {
  var $, checkLoop, doRedirect, hashCheck, linkCheck, loadApp, ngdeps;

  ngdeps = [];

  ga('create', 'UA-38709761-11', window.location.hostname);

  ga('send', 'pageview');

  $ = function(id) {
    return document.getElementById(id);
  };

  doRedirect = function(link, query) {
    var re;
    doRedirect.loading = true;
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

  linkCheck = function(query) {
    var link, _i, _len;
    if (doRedirect.loading) {
      return;
    }
    if (query) {
      for (_i = 0, _len = LINKS.length; _i < _len; _i++) {
        link = LINKS[_i];
        if (link.id === query || link.pattern && new RegExp(link.pattern).test(query)) {
          doRedirect(link, query);
          return true;
        }
      }
      ga('send', 'event', 'Link Missing', query);
    }
    return false;
  };

  hashCheck = function() {
    var query;
    query = window.location.hash.substr(1);
    if (query === hashCheck.last) {
      return;
    }
    hashCheck.last = query;
    if (!linkCheck(query)) {
      loadApp();
    }
  };

  loadApp = function() {
    if (loadApp.ed || !window.yepnope) {
      setTimeout(loadApp, 100);
      return;
    }
    yepnope({
      load: ['//ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.min.js', '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.12.0/css/semantic.min.css'],
      callback: function() {
        var App;
        App = angular.module('gswg', []);
        return ngdeps.forEach(function(dep) {
          return dep(App);
        });
      }
    });
    loadApp.ed = true;
  };

  checkLoop = function() {
    hashCheck();
    return setTimeout(checkLoop, 100);
  };

  checkLoop();

  ngdeps.push(function(App) {
    return App.controller("SearchController", function($scope) {
      var queries;
      $scope.limit = 5;
      $scope.query = '';
      $scope.links = LINKS;
      queries = null;
      $scope.gotoLink = function(l) {
        return doRedirect(l);
      };
      $scope.filterChange = function() {
        queries = $scope.query.split(/\s+/).map(function(q) {
          return new RegExp(q, "i");
        });
      };
      $scope.filterLink = function(l) {
        var k, match, q, v, _i, _len;
        if (l.pattern) {
          return false;
        }
        if (!queries || queries.length === 0) {
          return true;
        }
        match;
        for (_i = 0, _len = queries.length; _i < _len; _i++) {
          q = queries[_i];
          match = false;
          for (k in l) {
            v = l[k];
            if (typeof v !== "string") {
              continue;
            }
            if (q.test(v)) {
              match = true;
              break;
            }
          }
          if (!match) {
            break;
          }
        }
        return match;
      };
    });
  });

  ngdeps.push(function(App) {
    return App.controller("SidebarController", function($scope, $timeout) {});
  });

  ngdeps.push(function(App) {
    return App.directive('ngHref', function() {
      return function($scope, elem, attrs) {
        elem.attr("target", "_blank");
      };
    });
  });

  ngdeps.push(function(App) {
    return App.factory('$exceptionHandler', function() {
      return function(exception, cause) {
        return console.error("ERROR", exception.message, cause);
      };
    });
  });

  ngdeps.push(function(App) {
    return App.factory("strdist", function() {
      return function(a, b) {
        var cost, d, i, j;
        i = void 0;
        j = void 0;
        cost = void 0;
        d = new Array();
        if (a.length === 0) {
          return b.length;
        }
        if (b.length === 0) {
          return a.length;
        }
        i = 0;
        while (i <= a.length) {
          d[i] = new Array();
          d[i][0] = i;
          i++;
        }
        j = 0;
        while (j <= b.length) {
          d[0][j] = j;
          j++;
        }
        i = 1;
        while (i <= a.length) {
          j = 1;
          while (j <= b.length) {
            if (a.charAt(i - 1) === b.charAt(j - 1)) {
              cost = 0;
            } else {
              cost = 1;
            }
            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
            if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
              d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
            j++;
          }
          i++;
        }
        return d[a.length][b.length];
      };
    });
  });

  ngdeps.push(function(App) {
    return App.run(function($rootScope, $timeout) {
      $timeout((function() {
        return $rootScope.loaded = true;
      }), 1000);
      $rootScope.stores = [
        {
          id: "amazon-com",
          url: "http://www.amazon.com/dp/1783980621",
          name: "Amazon.com"
        }, {
          id: "amazon-co-uk",
          url: "http://www.amazon.co.uk/dp/1783980621",
          name: "Amazon UK"
        }, {
          id: "barnes-noble",
          url: "http://www.barnesandnoble.com/s/?keyword=Getting+Started+with+Grunt%3A+The+JavaScript+Task+Runner",
          name: "Barnes and Noble"
        }, {
          id: "safari",
          url: "http://my.safaribooksonline.com/9781783980628?cid=packt-cat-readnow-9781783980628",
          name: "Safari Books Online"
        }, {
          id: "oreilly",
          url: "http://shop.oreilly.com/product/9781783980628.do",
          name: "O'Reilly"
        }, {
          id: "packt",
          url: "http://www.packtpub.com/getting-started-with-grunt-the-javascript-task-runner/book",
          name: "Packt Publishing"
        }
      ];
      $rootScope.email = 'gswg@jpillora.com';
      $rootScope.ghprofile = 'https://github.com/jpillora';
      $rootScope.gswgIoRepo = $rootScope.ghprofile + '/gswg-io';
      $rootScope.gswgEgRepo = $rootScope.ghprofile + '/gswg-examples';
      $rootScope.gswgEgIssues = $rootScope.gswgEgRepo + '/issues';
      $rootScope.gswgEgZip = $rootScope.gswgEgRepo + '/archive/master.zip';
      $rootScope.gsrcRepo = $rootScope.ghprofile + '/grunt-source';
      $rootScope.gsrcWebRepo = $rootScope.gsrcRepo + '-web';
      $rootScope.sampleCh = window.location.origin + '/files/9781783980628_Chapter_01.pdf';
      $rootScope.amazonReviews = 'http://www.amazon.com/dp/1783980621#cm_cr_dpwidget';
      $rootScope.visit = function(url) {
        return window.open(url, "_blank");
      };
    });
  });

}).call(this);
