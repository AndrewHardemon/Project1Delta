//API key
//<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
var qURL = "https://api.themoviedb.org/3"
var type = "movie" //or tv
var genre= "genre"//name or id of genre
var runtime=""; //15 minute increments
var sources=""; //netflix or similar. uses other api
var apiKey = "?api_key=92f5c8ff853ffea4d1fed070c2f2d729"

var queryURL = `${qURL}/${type}/${genre}/list${apiKey}`
console.log(queryURL)
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


//Ajax
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response){



})

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