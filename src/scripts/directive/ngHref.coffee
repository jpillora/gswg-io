ngdeps.push (App) ->
  App.directive 'ngHref', ->
    ($scope, elem, attrs) ->
      elem.attr "target","_blank"
      elem.on "click", ->
        ga 'send', 'event', 'Href', attrs.ngHref
      window.elem = elem
      return