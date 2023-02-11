

// import{callSearchWS } from "./search.js";

//import { response } from "express";

function getFetch(data){
    console.log(data);
}
let obj = sessionStorage.getItem("data");
obj =JSON.parse(obj);
console.log(obj);
//console.log(obj.length);

let poster;
var myapi = "80283b91";
//var movieID = "2625030";

// async function getCover(movieID){
//     movieID = "tt"+movieID;
//     //"https://www.omdbapi.com/?i=tt2625030&apikey=80283b91"
//     let rooturl = "http://www.omdbapi.com/?i="+movieID+"&r=json&apikey="+myapi;
    
//     //const result="";
//     await fetch(rooturl)
//     .then(function(response){
//         //console.log(response.json());
//         let promise = response.json();
//         let data = promise.then(value =>{
//              //console.log(JSON.stringify(value));
//              let tmp = JSON.stringify(value);
//              //tmp = JSON.parse(value);
//              return tmp;
//             //console.log(tmp);
//         })
//     })
//     //console.log(poster);
//     //return poster;
//     return data;
    
// }


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

async function callViewWS(movieID){
    let url = "http://localhost:3030/title/";
    let data;
    //console.log(movieID)
        url+=movieID
        console.log(url)
        let response = await fetch(url);
        data = await response.json();
        //sessionStorage.setItem("item",JSON.stringify(data.data));
        data = JSON.stringify(data);
        data = JSON.parse(data);
        //console.log(data);
        return data;
        
}

async function clickView(movieID){
    let data = await callViewWS(movieID);
    console.log(data);
    sessionStorage.setItem("viewMovie",JSON.stringify(data.data));
    document.location.href = "item.html";
}
let postertmp;
let movieButton;
async function main(){
    for(let i = 0;i<obj.length;i++){
        let mydatatb = document.createElement("tr");
        //mydatatb.setAttribute("id","clickResult");
        let movieName = document.createElement("td");
        let movieDetail = document.createElement("td");
        let movieRating = document.createElement("td");
        let moviePoster = document.createElement("td");
        let movieLink = document.createElement("td");
        movieDetail.innerHTML = obj[i].movieDescripiton;
        // movieName.innerHTML = "<a href='http://localhost:3030/title/" + obj[i].movieID +"'>"+obj[i].movieName+"</a>";

        var str = "<text onclick='clickView("+obj[i].movieID.toString()+")'>" +obj[i].movieName+"<text>".toString();
        //console.log("<text onclick='callViewWS("+obj[i].movieID.toString()+")'>" +obj[i].movieName+"<text>");
        movieName.innerHTML =str;
        movieRating.innerHTML = obj[i].IMDB_rating;
        //console.log(obj[i].movieID);
        if(sessionStorage.getItem("P"+obj[i].movieID) === null){
            console.log("i ="+i+" there is no item");
            postertmp = await getCover(obj[i].movieID)
            postertmp = postertmp.Poster;
            sessionStorage.setItem("P"+obj[i].movieID,JSON.stringify(postertmp));
        }
        else{
            console.log("i ="+i+ "there is item now");
            //console.log(sessionStorage.getItem("P"+obj[i].movieID));
            postertmp = sessionStorage.getItem("P"+obj[i].movieID);
            console.log(postertmp);
        }
        //console.log(sessionStorage.getItem("P"+obj[i].movieID));
        //console.log(postertmp.Poster);
        if(postertmp){
            moviePoster.innerHTML = "<image src="+postertmp+"width='150' height='213'>"; 
        }
        //moviePoster.innerHTML = "<image src="+postertmp.Poster+"width='150' height='213'>";
        
        //let tmp1 = obj[i].movieID.toString();
        //tmpButton.setAttribute("onclick","callViewWS("+tmp1+")")
        //movieLink.append(tmpButton);

        mydatatb.append(moviePoster);
        mydatatb.append(movieName);
        mydatatb.append(movieDetail);
        mydatatb.append(movieLink);
        
        //mydatatb.append(movieRating);
    
        document.getElementById("tbResult").append(mydatatb);
        movieButton = document.getElementsByClassName("button");
        //console.log(movieButton);
        
    }
    //*****callViewWS("2625030");
    //let test = document.createElement("section");
    //poster = await getCover("2625030");
    //console.log(poster.Poster);
    //test.innerHTML = "<img src = "+poster.Poster+">";
    //document.getElementById("test").append(test);
    //console.log(poster.Poster);
}

// if(movieButton){
//     movieButton.addEventListener("click",function(e){
//         console.log(this.id);
//         e.preventDefault();
//         callViewWS(this.id);
//     });
// }


main();
// export{getFetch};


//console.log(poster);