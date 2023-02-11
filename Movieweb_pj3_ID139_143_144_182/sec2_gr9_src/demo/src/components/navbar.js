import React, {Component} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
// import styles from './css/navbar.css'

const MyNav1 = styled.nav `
    display: flex;
    flex-direction: row;
	justify-content: space-evenly;
    background-color: #383838;
	margin-left: 5px;
	margin-right: 5px;
	margin-top: 5px;
	margin-bottom: 15px;

`;

// const MyUl = styled.ul `
//     list-style-type: none;
//     display: flex;
// `;


// const MyLi = styled.li `
//     display:flex;
//     justify-content: center;
// 	flex-grow: 1;
//     padding: 14px 20px;
	
// `;

const MyLink = styled(Link) `
	padding-top: 20px;
	padding-bottom: 20px;
    font-size: 17pt;
    text-decoration: none;
	flex-grow: 1;
	text-align: center;
	color: 	#FFFFFF;
	white-space: nowrap;
	font-family: 'arial', san-serif;

	&:hover {
		background-color: #808080;
		padding: 20px;
	}
	
`;

class MyNav extends Component {
    render(){
        return(
            <MyNav1>
                
                    <MyLink to="/">Home</MyLink>
					<MyLink to="/search">Search</MyLink>
					<MyLink to="/login">Login</MyLink>
					<MyLink to="/user">User</MyLink>
                
            </MyNav1> 
        );
    }
}


export default MyNav;