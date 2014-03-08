ngdeps.push (App) ->
  App.factory "strdist", ->
    (a, b) ->
      i = undefined
      j = undefined
      cost = undefined
      d = new Array()
      return b.length  if a.length is 0
      return a.length  if b.length is 0
      i = 0
      while i <= a.length
        d[i] = new Array()
        d[i][0] = i
        i++
      j = 0
      while j <= b.length
        d[0][j] = j
        j++
      i = 1
      while i <= a.length
        j = 1
        while j <= b.length
          if a.charAt(i - 1) is b.charAt(j - 1)
            cost = 0
          else
            cost = 1
          d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost)  if i > 1 and j > 1 and a.charAt(i - 1) is b.charAt(j - 2) and a.charAt(i - 2) is b.charAt(j - 1)
          j++
        i++
      d[a.length][b.length]