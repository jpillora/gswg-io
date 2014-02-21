
ga 'create', 'UA-38709761-11', window.location.hostname
ga 'send', 'pageview'

LINKS = null

$ = (id) ->
  document.getElementById id

load = (link, query) ->
  load.loading = true
  if link.pattern
    re = new RegExp(link.pattern)
    link.url = query.replace re, link.url
    link.title = query.replace re, link.title
  #track
  ga 'send', 'event', 'Link', link.title, link.url
  #display popup
  $('link-title').innerHTML = link.title
  $('link-url').innerHTML = link.url
  $('popup').className = 'active'
  #show for 2seconds
  setTimeout ->
    window.location.href = link.url
  , 2000
  return

run = (query) ->
  return if not query or load.loading
  for link in LINKS
    if link.id is query or
       link.pattern and new RegExp(link.pattern).test query
      load link, query
      return
  #no hit
  ga 'send', 'event', 'Link Missing', query
  return

check = ->
  query = window.location.hash.substr(1)
  return if query is check.last
  check.last = query
  run query

start = ->
  check()
  setInterval check, 100

xhr = new XMLHttpRequest
xhr.open 'GET', 'links.json'
xhr.onreadystatechange = ->
  if xhr.readyState is 4
    LINKS = JSON.parse xhr.responseText
    start()
xhr.send()

