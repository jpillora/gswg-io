

linkId = window.location.hash.substr(1)

$ = (id) -> document.getElementById id

load = (link) ->

  $('link-title').innerHTML = link.title
  $('link-url').innerHTML = link.url
  $('popup').className = 'active'
  setTimeout ->
    window.location.href = link.url
  , 2000

if linkId
  for link in LINKS
    if link.id is linkId
      load link
      break
