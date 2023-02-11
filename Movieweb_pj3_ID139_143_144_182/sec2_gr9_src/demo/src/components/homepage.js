import React, {Component} from "react";
import styled from "styled-components";
import './css/home.css'



const H1 = styled.h1`
    color: black;
`;

class HomePage extends Component{
    render(){
        return(
            <>
            <div>
                <header>
                    <H1>IMDb Database</H1>
                </header>
                <h2 className="Mainweb">
                    Visit Main Website<br />
                    <a href="https://www.imdb.com/">
                    <img src="/media/home/Main.jpg" alt="homeImage" style={{width:"100%", height: "200"}}></img>
                    </a>
                </h2>
                <br></br>
                <h2 className="News">
                    IMDb News
                    <br />
                    <a href = "https://www.imdb.com/news/movie"><img src = "/media/home/Movie.png" alt = "mov" /></a>
		            <a href = "https://www.imdb.com/news/tv"><img src = "/media/home/TV.png" alt = "tv" /></a>
		            <a href = "https://www.imdb.com/news/celebrity"><img src = "media/home/Celebrity.png" alt = "celeb" /></a>
		            <a href = "https://www.imdb.com/news/indie"><img src = "media/home/Indie.png" alt = "indie" /></a>
                </h2>
                
            </div>
            </>
        );
    }
}

export default HomePage;