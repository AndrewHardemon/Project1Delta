//Variables for the QueryURL's
var qURL = "https://api.themoviedb.org/3"
var type = "movie" //or tv
var genre= "genre"//name or id of genre
var runtime=""; //15 minute increments
var sources=""; //netflix or similar. uses other api
var apiKey = "92f5c8ff853ffea4d1fed070c2f2d729"
var guidebox = "58812660af2896e3f7dea2cddda186e473191fba"
var tries = 0;
var finalResult = "";

//Click Event
$(".form-check-input").on("click", function(event){
  type = $(this).val();
  console.log(type);
  $(".form-check-input").attr("disabled", "disabled");
});

//Submitting the data
$("#submit").on("click", function(event){
  event.preventDefault();
  console.log("this works");
  //Gets genre variable
  genre = $("#genre").val().trim();
  console.log(genre);
  //Gets runtime variable
  runtime = $("#runtime").val().trim();
  console.log(runtime);
  //Splits runtime into first num and second num
  var r1 = runtime.indexOf("-");
  var r2 = runtime.indexOf(" ");
  //first num
  var r3 = runtime.substring(0,r1);
  //second num
  var r4 = runtime.substring(r1+1,r2);
  console.log(r3);
  console.log(r4);

  sources = $("#sources").val().trim();
  // var page; var randomPage;
  var queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&api_key=${apiKey}&language=en-US&page=1`
  console.log(queryURL);

  function totalAjax(){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    var res = response;

    //Gets total number of pages
    var page = res.total_pages;
    console.log(page)

    //Randomizes Page Number
    var randomPage = Math.floor((Math.random() * page)+1);
    console.log(randomPage);

    //Updates QueryURL
    queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&api_key=${apiKey}&language=en-US&page=${randomPage}`
    

    //Second Ajax
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      var res = response;
      console.log(res);
      console.log(res.total_results);

      //Gets Random Number
      var total = Math.floor((Math.random() * 20));
      console.log(total);

      //Gets the total results
      var outputArray = res.results;
      console.log(outputArray);

      //Get title/name if its tv or movie
      var outputName;
      if(type == "movie"){
        console.log("movie = title")
        outputName = outputArray[total].title;
        console.log(outputName);
      } else {
        console.log("tv = name")
        outputName = outputArray[total].name;
        console.log(outputName);
      }
        console.log(outputName);

      //Replace spaces with -
      outputName = outputName.replace(/\ /g, '-')
      console.log(outputName)

      //Gets QueryURL for Guidebox for movie or tv
      var queryURL2;
      if(type == "movie"){
        //If Movie
        console.log("this is a movie")
        queryURL2 = `http://api-public.guidebox.com/v2/search?api_key=${guidebox}&type=movie&field=title&query=${outputName}` 
      } else { 
        //If Show
        console.log("this is a show")
        queryURL2 = `http://api-public.guidebox.com/v2/search?api_key=${guidebox}&type=show&field=title&query=${outputName}`
      }
      console.log(queryURL2)

      //Guidebox Ajax
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response){
        var res = response;
        //var totalRes = res.total_results;
        console.log("works")
        //if nothing
        if(res.total_results == 0){
          //adds tries and resets the totalAjax function
          tries++
          console.log(`Its been ${tries} tries`)
          totalAjax();
        } else if (res.total_results > 1){
          var total2 = Math.floor((Math.random() * res.total_results));
          console.log(total2);

          //Get random title out of the list
          finalResult = res.results[total2].title;
          console.log(finalResult)
          //$("#outputs").html(finalResult)
        } else {
          finalResult = res.results[0].title;
          console.log(finalResult)
          //$("#outputs").html(finalResult)
        }
        $("#outputs").text(finalResult)
      });
    });
  });
  } //end of function
  totalAjax();
})

//random number between 1 and total results
// var total2 = Math.floor((Math.random() * res.total_results)+1);
// console.log(total2);

// //get random title
// var newName = res.results[total2].title;
// //Replace spaces with -
// newName = newName.replace(/\ /g, '-');
// console.log(newName);
// queryURL2 = `http://api-public.guidebox.com/v2/search?api_key=${guidebox}&type=show&field=title&query=${newName}`

// //last Ajax