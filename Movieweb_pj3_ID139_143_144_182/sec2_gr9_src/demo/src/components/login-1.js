import React, {Component} from "react";
import styled from "styled-components";
import './css/login.css'

const H2 = styled.h2`
    text-align: center;  
    color: #000000; 
    padding: 20px;  
`;


class Login extends Component{
    render(){
        return(
            <>
            <H2>Login Page</H2>
            <div className="login" id="login">
            <form action="/homepage" method="GET"></form>

            <label className="myLabel"><b>Username</b></label>
            <input type="text" name="Uname" id="Uname" placeholder="Username" /><br /><br />
            <label className="myLabel"><b>Password</b></label>
            <input type="Password" name="Pass" id="Pass" placeholder="Password" /><br /><br />
            <br></br>
            
            </div>
            </>
            
        );
    }
}

export default Login;