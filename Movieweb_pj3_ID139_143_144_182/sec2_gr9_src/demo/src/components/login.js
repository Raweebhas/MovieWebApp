import React from 'react'
import styled from "styled-components";
import './css/login.css'

const H2 = styled.h2`
    text-align: center;  
    color: #000000; 
    padding: 20px;  
`;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Uname: "",
            Pass: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const elementname = target.name;
        this.setState({
            [elementname]: value,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        CheckUser()
    }
    render() {
    return (
        <>
        <H2>Login Page</H2>
        <div className="login" id="login">
            <form onSubmit={this.handleSubmit}>
                <label className="myLabel"><b>Username</b></label> 
                <input type="text" name="Uname" id="Uname" placeholder="Username"  value={this.state.Uname} onChange={this.handleChange}/><br/><br/>
                <label className="myLabel"><b>Password</b></label> 
                <input type="Password" name="Pass" id="Pass" placeholder="Password"  value={this.state.Pass} onChange={this.handleChange}/><br/><br/><br/>
                <input type="button" onClick={(e)=>this.handleSubmit(e)} value="Log In"/><br/><br/>
            </form>
        </div>
        </>
    );
    }
}

function CheckUser() {
    //console.log("log in")
    let username = document.getElementById("Uname").value;
    let password = document.getElementById("Pass").value;
    let rooturl = "http://localhost:3030/login/"+username+"/"+password;
    
    var log = document.getElementById("login");
    var error_log = document.createElement("div");
    error_log.setAttribute("id", "err_log");
    
    if (username === "" || password === "") {
        error_log.innerText = "Please insert username and password";
        error_log.style.color = "red";
        try {
            var first_search = document.getElementById("err_log");
            log.removeChild(first_search); 
            log.appendChild(error_log);
        }
        catch(error) {
            log.appendChild(error_log);
        }
    }
    else {
        fetch(rooturl).then((res) => res.json()).then((data) => {
        try {
            alert("Welcome " + data.result.username);
            window.location.replace("http://localhost:3000"); 
        }
        catch(error) {
            error_log.innerText = "Your username or password maybe incorrect";
            error_log.style.color = "red"; 
            log.appendChild(error_log);
            try {
                var first_search = document.getElementById("err_log");
                log.removeChild(first_search); 
                log.appendChild(error_log);
            }
            catch(error) { 
                log.appendChild(error_log);
            }
        }
        })
    }
}  

export default Login;

// "dark1x","passw12123322"