


// function getFetch(data){
//     console.log(data);
// }


let obj = sessionStorage.getItem("data");
obj =JSON.parse(obj);
console.log(obj);
//console.log(obj.length);

let poster;
var myapi = "80283b91";



async function getCover(movieID){
        //movieID = "tt"+movieID;
        //"https://www.omdbapi.com/?i=tt2625030&apikey=80283b91"
        let rooturl = "http://www.omdbapi.com/?i="+movieID+"&r=json&apikey="+myapi;
        let response = await fetch(rooturl);
        let data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);
		//console.log(data);
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
    document.location.href = "/item";
}
let postertmp;
// let movieButton;
async function main(){
    for(let i = 0;i<obj.length;i++){
        let mydatatb = document.createElement("tr");
        mydatatb.className="result_black_border";

        let movieName = document.createElement("td");
        movieName.className="result_black_border";

        let movieDetail = document.createElement("td");
        movieDetail.className="result_black_border";

        let movieRating = document.createElement("td");
        movieRating.className="result_black_border";

        let moviePoster = document.createElement("td");
        moviePoster.className="result_black_border";
        
        movieDetail.innerHTML = obj[i].movieDescripiton;
        // movieName.innerHTML = "<a href='http://localhost:3030/title/" + obj[i].movieID +"'>"+obj[i].movieName+"</a>";

        //var str = "<text onclick='clickView("+obj[i].movieID.toString()+")'>" +obj[i].movieName+"<text>".toString();
        var str = "<text class='movieLink' name='"+obj[i].movieID+"'>"+obj[i].movieName+"</text>"
        //console.log("<text onclick='callViewWS("+obj[i].movieID.toString()+")'>" +obj[i].movieName+"<text>");
        movieName.innerHTML =str;
        movieRating.innerHTML = obj[i].IMDB_rating;
        //console.log(obj[i].movieID);
        if(sessionStorage.getItem("P"+obj[i].movieID) === null){
            //console.log("i ="+i+" there is no item");
            postertmp = await getCover(obj[i].movieID)
            postertmp = postertmp.Poster;
            sessionStorage.setItem("P"+obj[i].movieID,JSON.stringify(postertmp));
        }
        else{
            //console.log("i ="+i+ "there is item now");
            //console.log(sessionStorage.getItem("P"+obj[i].movieID));
            postertmp = sessionStorage.getItem("P"+obj[i].movieID);
            //console.log(postertmp);
        }
        //console.log(sessionStorage.getItem("P"+obj[i].movieID));
        //console.log(postertmp.Poster);
        if(postertmp){
            moviePoster.innerHTML = "<image src="+postertmp+"width='150' height='213'>"; 
        }

        mydatatb.append(moviePoster);
        mydatatb.append(movieName);
        mydatatb.append(movieDetail);
 
        
        //mydatatb.append(movieRating);
    
        document.getElementById("tbResult").append(mydatatb);
        //console.log(movieButton);
        
    }

    let elementsArray = document.querySelectorAll('.movieLink');
    if(elementsArray){
        
        elementsArray.forEach(function(elem){
            elem.addEventListener("click",function(){
                //console.log(this.getAttribute("name"));
                clickView(this.getAttribute("name"));
            })
        })
    }
    console.log(elementsArray);
    
}

main();

