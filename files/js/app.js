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
var descArray = [];

//Click Event
$(".form-check-input").on("click", function(event){
  type = $(this).val();
  console.log(type);
  $(".form-check-input").attr("disabled", "true");
});

//Submitting the data
$("#submit").on("click", function(event){
  event.preventDefault();
  console.log("this works");

  //Undo Disable and Checked for type
  $(".form-check-input").prop('disabled', false)
  $(".form-check-input").prop('checked', false)

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

  //Exclude adult content
  var adult = "&include_adult=false";

  sources = $("#sources").val().trim();
  // var page; var randomPage;
  var queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&api_key=${apiKey+adult}&language=en-US&page=1`
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

      //Get rid of special characters
      function cleanUpSpecialChars(str){
        return str
          .replace(/[ÀÁÂÃÄÅÆ]/g,"A")
          .replace(/[àáâãäåæ]/g,"a")
          .replace(/[Ç]/g,"C")
          .replace(/[ç]/g,"c")
          .replace(/[ÈÉÊË]/g,"E")
          .replace(/[èéêë]/g,"e")
          .replace(/[ÌÍÎÏ]/g,"I")
          .replace(/[ìíîï]/g,"i")
          .replace(/[Ñ]/g,"N")
          .replace(/[ñ]/g,"n")
          .replace(/[ÒÓÔÕÖØ]/g,"O")
          .replace(/[òóôõöø]/g,"o")
          .replace(/[Š]/g,"S")
          .replace(/[š]/g,"s")
          .replace(/[ß]/g,"ss")
          .replace(/[ÚÛÜÙ]/g,"U")
          .replace(/[ùúûü]/g,"u")
          .replace(/[ÝŸ]/g,"Y")
          .replace(/[ýÿ]/g,"y")
          .replace(/[Ž]/g,"Z")
          .replace(/[ž]/g,"Z")
          .replace(/[^\x00-\x7F]+/g,'') //non ascii
          //.replace(/[^a-z0-9]/gi,''); // final clean up
      }
      cleanUpSpecialChars(outputName);

      //Replace spaces with -
      outputName = outputName.replace(/\ /g, '-')
      console.log(outputName)
      
      //Get Description for the Movie/Show
      console.log(queryURL);
      console.log(res.results[total].overview)
      var desc = res.results[total].overview
      descArray.push(desc);

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
      console.log(`http://api-public.guidebox.com/v2/sources?api_key=${guidebox}&filter=movie&type=movie&field=title&query=${outputName}`)

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
          descArray = [];
          totalAjax();
        } else if (res.total_results > 1){
          var total2 = Math.floor((Math.random() * res.total_results));
          console.log(total2);

          //Get random title out of the list
          finalResult = res.results[total2].title;
          console.log(finalResult)

          var artworkTV = res.results[total2].poster_240x342
          var artworkMovie = res.results[total2].artwork_304x171
          // var artworkTV = res.results[total2].poster_120x171
          // var artworkMovie = res.results[total2].artwork_208x117
          console.log(artworkTV)
          console.log(artworkMovie)
          //$("#outputs").html(finalResult)
        } else {
          finalResult = res.results[0].title;
          console.log(finalResult)
          var artworkTV = res.results[0].poster_240x342
          var artworkMovie = res.results[0].artwork_304x171
          console.log(artworkTV)
          console.log(artworkMovie)
          //$("#outputs").html(finalResult)
        }

        //Output the Title
        $("#outputs").text(finalResult)
        var artwork; //empty var
        //Check if its movie or tv
        if(artworkTV == undefined){
          artwork = artworkMovie
        } else if (artworkMovie == undefined){
          artwork = artworkTV
        } else {
          console.log("error with poster")
        }
        console.log(artwork)

        //Output the Artwork
        var poster = $("<img>");
        poster.attr("src", artwork);
        $("#outputs").append(poster);

        //Output the Description
        var desc = $("<p>");
        desc.append(descArray[0])
        console.log(descArray[0]);
        $("#outputs").append(desc);

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