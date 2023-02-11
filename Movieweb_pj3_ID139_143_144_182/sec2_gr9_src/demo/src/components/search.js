import {Component} from "react";
import styled from "styled-components";
// import ReactDOM from 'react-dom';
// import { Navigate, Route } from "react-router-dom";
// import {Link} from "react-router-dom";
import './css/search.css';
// import {Helmet} from "react-helmet";

const MyDiv = styled.div`
    text-align: center;
    align-items: center;
    font-family: 'arial', san-serif;
	font-size: 17px;
	margin:5px;
`

const Mysection = styled.section`
    margin-bottom: 1em;
`
const ImdbLogo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px;
    padding-bottom:5px;
`

const MyDiv2 = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: "10px"
`

const submitHandler = (e) => {
    e.preventDefault();
    console.log("search submitting");
    callSearchWS("http://localhost:3030/search-movie/","submit")
    .then((data) =>{
        //console.log(data);
        sessionStorage.setItem("data", JSON.stringify(data.data));
        console.log(sessionStorage.getItem("data"));
        console.log("finished fetching");
        window.location = "http://localhost:3000/result";
    }).catch(function(error){
        console.error(error);
    });
    
};


// const submitHandler = (e) => {
//     e.preventDefault();
//     window.location = "https://www.bbc.co.uk";
// };

async function callSearchWS(url, method){
    let data;
    let tmp2 = [];
    let tmp = document.getElementsByName("crit");
    //console.log(tmp);
    for (let i =0;i<tmp.length;i++){
        if(tmp[i].checked){
                tmp2.push(tmp[i].value);
        }
    }
    console.log("tmp2 :" + tmp2);
    const formData = {
        que: document.getElementById("url2").value,
        crit: tmp2
    }
    
    console.log(formData);
    if(method==="submit"){
        let response = await fetch(url, {
            mode: 'cors',
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        data = await response.json();
    }
    return data;
}

async function callInsertWS(data){
    let url = "http://localhost:3030/ins-mov"
    let response = await fetch(url,{
        mode: 'cors',
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
    let messege = await response.json();
    return messege;
}

async function callUpdateWS(data){
    let url = "http://localhost:3030/upd-movie"
    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
    let message = await response.json();
    return message;
}

async function callDeleteWS(data){
    console.log("data is");
    console.log(data);
    let url= "http://localhost:3030/del-movie"
    let response = await fetch(url,{
        method: 'DELETE',
        body: data,
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
            // 'Content-Type': 'application/json'
        }
    });
    let message = await response.json();
    return message;
}


export class InsertForm extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            movieID: '',
            IMDB_rating: 0,
            movieName : '',
            countryID : 101256,
            movieDescripiton : '',
            movieType: "movie"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {

        if(event.target.name === "IMDB_rating"){
            this.setState({[event.target.name]: parseFloat(event.target.value)});
        }
        else if(event.target.name === "countryID"){
            this.setState({[event.target.name]: parseInt(event.target.value)});
        }
        else{
            this.setState({[event.target.name]: event.target.value});
        }
        
    }
    handleSubmit(event) {    
        event.preventDefault();
        //console.log(this.state);
        let movie = this.state;
        console.log(movie);
        let data =
        {
            movie
        }
        data = JSON.stringify(data)
        console.log(data);
        
        callInsertWS(data)
        .then((messege) =>{
            console.log("finished fetching");
            console.log(messege);
        })
        .catch(function(error){
            console.error(error);
        })

    }
    render(){
        return(
            <><form onSubmit={this.handleSubmit}>
                <label>Enter movieID:&nbsp;&nbsp;</label>
                <br /><input id="inst1" name="movieID" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }}></input>
                <br></br><br /> <label>Enter IMdb rating: &nbsp;&nbsp;</label>
                <br /><input id="inst2" name="IMDB_rating" type="number" step=".1" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter movie name: &nbsp;&nbsp;</label>
                <br /><input id="inst3" name="movieName" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter CountryID: &nbsp;&nbsp;</label>
                <br /><input id="inst4" name="countryID" type="number" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter movieDescripiton: &nbsp;&nbsp;</label>
                <br /><input id="inst5" name="movieDescripiton" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter movieType: &nbsp;&nbsp;</label>
                <br /><input id="inst6" name="movieType" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /><button type = "submit" value="Submit" className="primary">submit</button>
            </form></>
        );
    }
}

export class UpdateForm extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            movieID: '',
            IMDB_rating: '',
            movieName : '',
            countryID : '',
            movieDescripiton : '',
            movieType: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {

        if(event.target.name === "IMDB_rating"){
            if(event.target.value !==''){
                this.setState({[event.target.name]: parseFloat(event.target.value)});
            }
        }
        else if(event.target.name === "countryID"){
            this.setState({[event.target.name]: parseInt(event.target.value)});
        }
        else{
            this.setState({[event.target.name]: event.target.value});
        }
        
    }
    handleSubmit(event){
        event.preventDefault();
        let array = this.state
        console.log(array);
        let movie={};
        Object.entries(array).forEach(element => {
            if(String(element[1]).length> 0){
                movie[element[0]] = element[1]
            }
        });
        //console.log("movie");
        let data={
            movie
        };
        console.log(JSON.stringify(data));
        callUpdateWS(JSON.stringify(data))
        .then((message) =>{
            console.log("finished fetching");
            console.log(message);
        })
        .catch(function(error){
            console.error(error);
        })

    }

    render(){
        return(
            <><form onSubmit={this.handleSubmit}>
                <label>Enter movieID:&nbsp;&nbsp;</label>
                <br /><input id="upd1" name="movieID" type="text" title="Search box" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }}></input>
                <br></br><br /> <label>Enter IMdb rating: &nbsp;&nbsp;</label>
                <br /><input id="upd2" name="IMDB_rating" type="number" title="Search box" step=".1" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter movie name: &nbsp;&nbsp;</label>
                <br /><input id="upd3" name="movieName" type="text" title="Search box" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter CountryID: &nbsp;&nbsp;</label>
                <br /><input id="upd4" name="countryID" type="number" title="Search box" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter movieDescripiton: &nbsp;&nbsp;</label>
                <br /><input id="upd5" name="movieDescripiton" type="text" title="Search box" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter movieType: &nbsp;&nbsp;</label>
                <br /><input id="upd6" name="movieType" type="text" title="Search box" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /><button type = "submit" value="Submit" className="primary">submit</button>
            </form></>
        );
    }
}

export class DeleteForm extends Component{
    constructor(prop){
        super(prop);
        this.state={
            movieID: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        let movie=this.state;
        // console.log(JSON.stringify(movie));
        movie = JSON.stringify(movie);
        console.log(movie)
        callDeleteWS(movie)
        .then((message) =>{
            console.log("finished fetching");
            console.log(message)
        })
        .catch(error =>{
            console.error(error);
        });
    }
    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                <label>Enter movieID:&nbsp;&nbsp;</label>
                <br /><input id="upd1" name="movieID" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }}></input>
                <br /><br />
                <button type = "submit" className="primary">Submit</button>
            </form>
            </>
        );
    }
}
  
class Search extends Component{
    render(){
        return(
            <>
            <MyDiv>
                <Mysection >
                    <Mysection style={{border: "0"}}>
                        <ImdbLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/IMDb_Logo_Square.svg/2048px-IMDb_Logo_Square.svg.png" alt="IMDb logo" width="350" height="350" ></ImdbLogo>
                    </Mysection>
                    <Mysection>
                        <strong>IMDb Movies Search</strong>
				        &nbsp;&nbsp;|&nbsp;&nbsp;
				        <a href="#home" title="Browse movie">Browse movie</a>
				        &nbsp;&nbsp;|&nbsp;&nbsp;
				        <a href="#home" title="Recent movie">Recent movie</a>
                    </Mysection>
                </Mysection>

                <Mysection>
                    <form  id="form1" name= "query" onSubmit={submitHandler}>
                        <div>
                            <input id="url2" name="que" type= "search" title="Search box" placeholder="Search your Titles..." autoFocus style={{width: "22em", padding: "5px"}} />
			            </div>
                        <div className="criteria">
                        <input className = "checkbox1" type = "checkbox" name = "crit" value="all" defaultChecked />All<br/>
					    <input className ="checkbox1" type = "checkbox" name = "crit" value="movie" />Movie<br></br>
					    <input className ="checkbox1" type = "checkbox" name = "crit" value="short" />Short movie<br></br>
					    <input className ="checkbox1" type = "checkbox" name = "crit" value="TVSeries"/>TV series<br></br>
					    <input className ="checkbox1" type = "checkbox" name = "crit" value="documentary" />Documentary<br></br>
                        </div>
                        <div>
                        <button type = "submit" className="primary">Search</button>
                        </div>
                    </form>
                </Mysection>
                {/* <Helmet>
                    <script src = "./script/search.js"></script>
                </Helmet> */}
                
            </MyDiv>
            <MyDiv2>
            <div style={{margin:"20px"}}>
                <h1>Insert new movie</h1>
                <InsertForm />
            </div>
            <div style={{margin:"20px"}}>
                <h1>Update movie</h1>
                <UpdateForm />
            </div>
            <div style={{margin:"20px"}}>
                <h1>Delete movie</h1>
                <DeleteForm />
            </div>
            </MyDiv2>
            </>
        );
    }
}


export default Search;