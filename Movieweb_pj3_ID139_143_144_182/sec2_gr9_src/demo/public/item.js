


var myapi = "80283b91";
async function getCover(movieID){
    movieID = "tt"+movieID;
    //"https://www.omdbapi.com/?i=tt2625030&apikey=80283b91"
    let rooturl = "http://www.omdbapi.com/?i="+movieID+"&r=json&apikey="+myapi;
    let response = await fetch(rooturl);
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

let movieData = sessionStorage.getItem("viewMovie");
movieData = JSON.parse(movieData);
let moviePoster = sessionStorage.getItem("P"+movieData[0].movieID);
console.log(moviePoster);
console.log(movieData[0]);

async function main(movieID){

    //document.getElementById("movName").value = movieData[0].movieName
    let myMovieName = document.createElement("tr");
    myMovieName.className="result_black_border";

    let myMoviePoster = document.createElement("tr");
    myMoviePoster.className="result_black_border";

    let myMovieRating = document.createElement("tr");
    myMovieRating.className="result_black_border";

    let myMovieDescription = document.createElement("tr");
    myMovieDescription.className="result_black_border";

    let myMovieType = document.createElement("tr");
    myMovieType.className="result_black_border";
    
    
    
    // myMovieName.innerHTML = "<td> Movie Name</td>"+"<td>" + movieData[0].movieName; + "</td>";
    // myMoviePoster.innerHTML = "<td> Movie Poster</td>"+"<image src="+moviePoster+"width='300' height='426'>";
    // myMovieRating.innerHTML = "<td> Movie Rating</td>"+"<td>" + movieData[0].IMDB_rating; + "</td>";
    // myMovieDescription.innerHTML = "<td> Movie Description</td>"+"<td>" + movieData[0].movieDescripiton; + "</td>";
    // myMovieType.innerHTML = "<td> Movie Name</td>"+"<td>" + movieData[0].movieType; + "</td>";



    myMovieName.innerHTML = "<td class='result_black_border'> Movie Name</td>"+"<td class='result_black_border'>" + movieData[0].movieName; + "</td>";
    myMoviePoster.innerHTML = "<td class='result_black_border'> Movie Poster</td>"+"<image src="+moviePoster+"width='300' height='426'>";
    myMovieRating.innerHTML = "<td class='result_black_border'> Movie Rating</td>"+"<td class='result_black_border'>" + movieData[0].IMDB_rating; + "</td>";
    myMovieDescription.innerHTML = "<td class='result_black_border'> Movie Description</td>"+"<td class='result_black_border'>" + movieData[0].movieDescripiton; + "</td>";
    myMovieType.innerHTML = "<td class='result_black_border'> Type</td>"+"<td class='result_black_border'>" + movieData[0].movieType; + "</td>";

    document.getElementById("item").append(myMovieName);
    document.getElementById("item").append(myMoviePoster);
    document.getElementById("item").append(myMovieRating);
    document.getElementById("item").append(myMovieDescription);
    document.getElementById("item").append(myMovieType);

}

main();

// let myMovieName = document.createElement("tr");
// let myMoviePoster = document.createElement("tr");

//myMovieName.innerHTML = "<td> Movie Name</td>"+"<td>" + obj[0].movieName; + "</td>";


//document.getElementById("item").append(myMovieName);
