ngdeps.push (App) ->
  App.controller "SearchController", ($scope) ->

    $scope.limit = 5
    $scope.query = ''
    $scope.links = LINKS

    queries = null

    $scope.gotoLink = (l) ->
      doRedirect l

    $scope.filterChange = ->
      queries = $scope.query.split(/\s+/).map (q) -> new RegExp q, "i"
      return

    $scope.filterLink = (l) ->
      if l.pattern
        return false
      if not queries or queries.length is 0
        return true

      match
      for q in queries
        match = false
        for k,v of l
          continue if typeof v isnt "string"
          if q.test v
            match = true
            break
        break unless match
      return match

    return
  