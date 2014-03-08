ngdeps.push (App) ->
  App.directive 'ngHref', ->
    ($scope, elem, attrs) ->
      elem.attr("target","_blank")
      return