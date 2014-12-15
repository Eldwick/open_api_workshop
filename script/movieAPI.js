function searchMovie() {
  var movie = $("#movie-search").val()
  $.getJSON("http://www.omdbapi.com/?s="+movie, function(data){
    var resultsDiv = $("#movie-results"),
        results = data.Search;

    for (var i = 0; i < results.length; i++){
      var result = $("<div class='title'>"+ results[i].Title + "</div>")
      console.log(results[i].Title)
      resultsDiv.append(result)
    }

  })
}