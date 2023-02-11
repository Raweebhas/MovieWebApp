function CheckUser() {
    let username = document.getElementById("Uname").value;
    let password = document.getElementById("Pass").value;
    let rooturl = "http://localhost:3030/login/"+username+"/"+password;
    //console.log(username, password);

    fetch(rooturl).then((res) => res.json()).then((data) => {
        //console.log(data);
        try {
            alert("Welcome " + data.result.username);
            document.location.href = "search.html";
            
        }
        catch(error) {
            var log = document.getElementById("login");
            var error_log = document.createElement("div");
            error_log.innerText = "Your username or password maybe incorrect";
            error_log.style.color = "red"; 
            log.appendChild(error_log);
        }
        })
}