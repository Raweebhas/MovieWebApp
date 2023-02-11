let obj =  sessionStorage.getItem("user_data");
obj =JSON.parse(obj);
console.log(obj);


async function callViewUserWS(userID){
    let url = "http://localhost:3030/search-user/";
    let data;
    url+=userID;
    console.log(url);
    let response = await fetch(url);
    data  = await response.json();
    // data = JSON.stringify(data);
    // data = JSON.parse(data);
    //console.log(data);
    return data;
}

async function clickViewUser(userID){
    let data = await callViewUserWS(userID);
    console.log(data.data);
    sessionStorage.setItem("ViewUser",JSON.stringify(data.data));
    document.location.href = "/user-detail";
    
}



async function main(){
    for(let i=0;i<obj.length;i++){
        let myUserDatatb = document.createElement("tr");
        myUserDatatb.className="result_black_border";

        let myUserID = document.createElement("td");
        myUserID.className = "result_black_border";

        let myUserName = document.createElement("td");
        myUserName.className = "result_black_border";

        let myEmail = document.createElement("td");
        myEmail.className = "result_black_border";


        myUserID.innerHTML = obj[i].userID;
        var str = `<text name = 'userLink' id='${obj[i].userID}'>${obj[i].username}</text>`
        myUserName.innerHTML = str;
        myEmail.innerHTML = obj[i].email;

        myUserDatatb.append(myUserID);
        myUserDatatb.append(myUserName);
        myUserDatatb.append(myEmail);

        document.getElementById("tbResult2").append(myUserDatatb);
    }
    let elementsArray = document.querySelectorAll("text[name = 'userLink']");
    if(elementsArray){

        elementsArray.forEach(function(elem){
            elem.addEventListener("click",function(){
                //console.log("clicked "+this.getAttribute("id"));
                clickViewUser(this.getAttribute("id"));
            })
        })
    }
}

main();