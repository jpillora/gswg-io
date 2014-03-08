ngdeps.push (App) ->
  App.factory '$exceptionHandler', ->
    (exception, cause) ->
      console.error "ERROR", exception.message, cause