//API key
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
var qURL = "https://api.themoviedb.org/3"
var type = "movie" //or tv
var genre= "genre"//name or id of genre
var runtime=""; //15 minute increments
var sources=""; //netflix or similar. uses other api
var apiKey = "92f5c8ff853ffea4d1fed070c2f2d729"
var guidebox = "58812660af2896e3f7dea2cddda186e473191fba"

// var queryURL = `${qURL}/${type}/${genre}/list?api_key=${apiKey}`
// console.log(queryURL);
//https://api.themoviedb.org/3/movie/550?api_key=92f5c8ff853ffea4d1fed070c2f2d729
//var findGenre = "https://api.themoviedb.org/3/genre/movie/list"
//https://api.themoviedb.org/3/genre/movie/list?api_key=92f5c8ff853ffea4d1fed070c2f2d729&language=en-US

//get input from type first to chose if they url will have movie or tv in it
//get genre and either use name or its id (whichever works)
//go through each option and check the runtime and see if its >min or <=max ex: 15-30 is actually 16-30
//either randomize the ones that fit the criteria or randomize the list and pick the first

//get the movie name
//put into the other api

//sources will have to do with output and will check if available

//if not available do it again and find a new option
$(".form-check-input").on("click", function(event){
  type = $(this).val();
  console.log(type);
  $(".form-check-input").attr("disabled", "disabled");

  // if(type == "movie")


});

$("#submit").on("click", function(event){
  event.preventDefault();
  console.log("this works")
  genre = $("#genre").val().trim();
  console.log(genre);
  // runtime = $("#runtime").val().trim()
  // console.log(runtime)
  sources = $("#sources").val().trim();
  var queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&api_key=${apiKey}&language=en-US&page=1`
 
  console.log(queryURL);
  //Ajax
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){



  });
});

// TV
//https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1
// Movies
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
//https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1

//unless other options become known this is the current plan
// {
//   "genres": [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 12,
//       "name": "Adventure"
//     },
//     {
//       "id": 16,
//       "name": "Animation"
//     },
//     {
//       "id": 35,
//       "name": "Comedy"
//     },
//     {
//       "id": 80,
//       "name": "Crime"
//     },
//     {
//       "id": 99,
//       "name": "Documentary"
//     },
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 10751,
//       "name": "Family"
//     },
//     {
//       "id": 14,
//       "name": "Fantasy"
//     },
//     {
//       "id": 36,
//       "name": "History"
//     },
//     {
//       "id": 27,
//       "name": "Horror"
//     },
//     {
//       "id": 10402,
//       "name": "Music"
//     },
//     {
//       "id": 9648,
//       "name": "Mystery"
//     },
//     {
//       "id": 10749,
//       "name": "Romance"
//     },
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     },
//     {
//       "id": 10770,
//       "name": "TV Movie"
//     },
//     {
//       "id": 53,
//       "name": "Thriller"
//     },
//     {
//       "id": 10752,
//       "name": "War"
//     },
//     {
//       "id": 37,
//       "name": "Western"
//     }
//   ]
// }