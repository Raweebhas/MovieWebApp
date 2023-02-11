let userData = sessionStorage.getItem("ViewUser");
userData = JSON.parse(userData);
console.log(userData);

async function main(userID){

        let myusername = document.createElement("tr");
        myusername.className="result_black_border";

        let myemail = document.createElement("tr");
        myemail.className="result_black_border";

        let myfirstname = document.createElement("tr");
        myfirstname.className="result_black_border";

        let mylastname = document.createElement("tr");
        mylastname.className="result_black_border";

        let mymiddlename = document.createElement("tr");
        mymiddlename.className="result_black_border";

        let myDateOfBirth = document.createElement("tr");
        myDateOfBirth.className="result_black_border";

        let mygender = document.createElement("tr");
        mygender.className="result_black_border";

        let mybio = document.createElement("tr");
        mybio.className="result_black_border";

        myusername.innerHTML = "<td class='result_black_border'> username</td>"+"<td class='result_black_border'>" + userData[0].username; + "</td>";
        myemail.innerHTML = "<td class='result_black_border'> email address</td>"+"<td class='result_black_border'>" + userData[0].email; + "</td>";
        myfirstname.innerHTML = "<td class='result_black_border'> first name</td>"+"<td class='result_black_border'>" + userData[0].firstname; + "</td>";
        mylastname.innerHTML = "<td class='result_black_border'> last name</td>"+"<td class='result_black_border'>" + userData[0].lastname; + "</td>";
        mymiddlename.innerHTML = "<td class='result_black_border'> middle name</td>"+"<td class='result_black_border'>" + userData[0].middlename; + "</td>";
        myDateOfBirth.innerHTML = "<td class='result_black_border'> Date of Birth</td>"+"<td class='result_black_border'>" + userData[0].DateOfBirth; + "</td>";
        mygender.innerHTML = "<td class='result_black_border'> gender</td>"+"<td class='result_black_border'>" + userData[0].gender; + "</td>";
        mybio.innerHTML = "<td class='result_black_border'> bio</td>"+"<td class='result_black_border'>" + userData[0].bio; + "</td>";

        document.getElementById("user_detail").append(myusername);
        document.getElementById("user_detail").append(myemail);
        document.getElementById("user_detail").append(myfirstname);
        document.getElementById("user_detail").append(mylastname);
        document.getElementById("user_detail").append(mymiddlename);
        document.getElementById("user_detail").append(myDateOfBirth);
        document.getElementById("user_detail").append(mygender);
        document.getElementById("user_detail").append(mybio);
}
main();