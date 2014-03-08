
ga 'create', 'UA-38709761-11', window.location.hostname

$ = (id) ->
  document.getElementById id

doRedirect = (link, query) ->
  doRedirect.loading = true
  if link.pattern
    re = new RegExp(link.pattern)
    link.url = query.replace re, link.url
    link.title = query.replace re, link.title
  #track
  ga 'send', 'event', 'Redirect', link.id, link.title
  #display popup
  $('link-title').innerHTML = link.title
  $('link-url').innerHTML = link.url
  $('popup').className = 'active'
  #show for 2seconds
  setTimeout ->
    window.location.href = link.url
  , 2000
  return

linkCheck = (query) ->
  return if doRedirect.loading
  #check links
  if query
    for link in LINKS
      if link.id is query or
         link.pattern and new RegExp(link.pattern).test query
        doRedirect link, query
        return true
    #no hit
    ga 'send', 'event', 'Redirect Missing', query
  return false

hashCheck = ->
  query = window.location.hash.substr(1)
  return if query is hashCheck.last
  hashCheck.last = query
  #load app if no hit
  unless linkCheck query
    loadApp()
  return

loadApp = ->
  if loadApp.ed
    return
  if not window.yepnope
    setTimeout loadApp, 100
    return
  yepnope
    load: [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.min.js'
      '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.12.0/css/semantic.min.css'
    ]
    callback: ->
      ga 'send', 'pageview'
      App = angular.module 'gswg', []
      ngdeps.forEach (dep) -> dep App
  #
  loadApp.ed = true
  return

checkLoop = ->
  hashCheck()
  setTimeout checkLoop, 100
checkLoop()
