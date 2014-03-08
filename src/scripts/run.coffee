ngdeps.push (App) ->
  App.run ($rootScope, $timeout) ->
    $timeout (-> $rootScope.loaded = true), 1000

    $rootScope.stores = [
      { id: "amazon-com", url:"http://www.amazon.com/dp/1783980621", name:"Amazon.com" }
      { id: "amazon-co-uk", url:"http://www.amazon.co.uk/dp/1783980621", name:"Amazon UK" }
      { id: "barnes-noble", url:"http://www.barnesandnoble.com/s/?keyword=Getting+Started+with+Grunt%3A+The+JavaScript+Task+Runner", name:"Barnes and Noble" }
      { id: "safari", url:"http://my.safaribooksonline.com/9781783980628?cid=packt-cat-readnow-9781783980628", name:"Safari Books Online" }
      { id: "oreilly", url:"http://shop.oreilly.com/product/9781783980628.do", name:"O'Reilly" }
      { id: "packt", url:"http://www.packtpub.com/getting-started-with-grunt-the-javascript-task-runner/book", name:"Packt Publishing" }
    ]

    $rootScope.email = 'gswg@jpillora.com'
    $rootScope.ghprofile = 'https://github.com/jpillora'
    $rootScope.examplesRepo = $rootScope.ghprofile+'/gswg-examples'
    $rootScope.examplesIssues = $rootScope.examplesRepo+'/issues'
    $rootScope.examplesZip = $rootScope.examplesRepo+'/archive/master.zip'
    $rootScope.gswgRepo = $rootScope.ghprofile+'/gswg-examples'
    $rootScope.gsrcRepo = $rootScope.ghprofile+'/grunt-source'
    $rootScope.gsrcWebRepo = $rootScope.gsrcRepo+'-web'

    $rootScope.amazonReviews = 'http://www.amazon.com/dp/1783980621#cm_cr_dpwidget'

    $rootScope.visit = (url) ->
      window.open url, "_blank"

    return
