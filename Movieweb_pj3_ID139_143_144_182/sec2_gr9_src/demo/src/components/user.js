import React, {Component} from "react";
import styled from "styled-components";
// import './css/login_style.css'

const MyDiv2 = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: "10px"
`


async function callSearchUserWS(Userdata){
    let url = "http://localhost:3030/search-user/"
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:Userdata
    });
    let fetched_data = await response.json();
    return fetched_data;

}

async function callInsertUserWS(Userdata){
    let url = "http://localhost:3030/ins-user"
    let response = await fetch(url,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: Userdata
    });
    let messege = await response.json();
    return messege;
}

async function callUpdateUserWS(userData){
    let url = "http://localhost:3030/upd-user"
    let response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: userData
    });
    let messege = await response.json();
    return messege;
}

async function callDeleteUserWS(userData){
    let url= "http://localhost:3030/del-user"
    let response = await fetch(url,{
        method: 'DELETE',
        body: userData,
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    let message = await response.json();
    return message;
}


let crit_tmp=['userID']

export class SearchForm extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            query : '',
            // crit: ['userID']
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        
        if(event.target.name === 'crit'){
            const {value,checked} = event.target;
            //console.log('value: '+value + ' status: ' + checked);
            if(checked){
                crit_tmp.push(value);
            }
            else{
                const index = crit_tmp.indexOf(value);
                if(index>-1){
                    crit_tmp.splice(index,1);
                }
            }
            // console.log(crit_tmp);
        } 
        else{
            this.setState({[event.target.name]: event.target.value});
        }
    }
    handleSubmit(event){
        event.preventDefault();
        let data = this.state;
        if(crit_tmp.length===0){
            crit_tmp.push('userID')
        }
        data['crit'] = crit_tmp;
        console.log(data);
        data = JSON.stringify(data);
        console.log(data);
        callSearchUserWS(data)
        .then((fetched_data => {
            console.log(fetched_data);
            sessionStorage.setItem("user_data",JSON.stringify(fetched_data.data))
            console.log(sessionStorage.getItem("user_data"));
            window.location = "http://localhost:3000/user-result";
        }))
        .catch(function(error){
            console.error(error);
        })
    }

    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Enter Search query: </label> <br />
                    <input name="query" type="search" title="Search box" onChange={this.handleChange}style={{width: "15em", padding: "5px"}} />
                </div>
                <div>
                    <input className="checkbox1" type="checkbox" name="crit" value="userID" defaultChecked onChange={this.handleChange} /> userID <br />
                    <input className="checkbox1" type="checkbox" name="crit" value="username" onChange={this.handleChange}/> username <br />
                    <input className="checkbox1" type="checkbox" name="crit" value="firstname" onChange={this.handleChange} /> firstname<br />
                </div>
                <button type = "submit" className="primary">submit</button>
            </form>
            </>
        );
    }

}


export class InsertForm extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            userID: '',
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            middlename: '',
            DateOfBirth: '',
            gender: 'M',
            bio: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        let user = this.state;
        let userData = {
            user
        }
        userData = JSON.stringify(userData);
        console.log(userData);

        callInsertUserWS(userData)
        .then((messege) =>{
            console.log("finished fetching");
            console.log(messege);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}>
            <label>Enter UserID:&nbsp;&nbsp;</label>
                <br /><input id="inst_u_1" name="userID" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }}></input>
                <br></br><br /> <label>Enter username: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_2" name="username" type="text" step=".1" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter password: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_3" name="u_password" type="password" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter email: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_4" name="email" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter firstname: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_5" name="firstname" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter lastname: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_6" name="lastname" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter middlename: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_7" name="middlename" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter DateOfBirth: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_8" name="DateOfBirth" type="date" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter gender: &nbsp;&nbsp;</label>
                {/* <br /><input id="inst_u_9" name="gender" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} /> */}
                <br /><select id="inst_u_9" name="gender" onChange={this.handleChange}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                <br /><br /> <label>Enter bio: &nbsp;&nbsp;</label>
                <br /><input id="inst_u_10" name="bio" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /><button type = "submit" value="Submit" className="primary">submit</button>
            </form>
            </>
        );
    }
}


export class UpdateForm extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            userID: '',
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            middlename: '',
            DateOfBirth: '',
            gender: '',
            bio: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        let array = this.state
        //console.log(array);
        let user={};
        Object.entries(array).forEach(element =>{
            if(String(element[1]).length>0){
                user[element[0]] = element[1];
            }
        });
        let userData = {
            user
        }
        userData=JSON.stringify(userData)
        callUpdateUserWS(userData)
        .then((messege) =>{
            console.log("finished fetching");
            console.log(messege);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render(){
        return(
            <>
            <form onSubmit={this.handleSubmit}>
            <label>Enter UserID:&nbsp;&nbsp;</label>
                <br /><input id="upd_u_1" name="userID" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }}></input>
                <br></br><br /> <label>Enter username: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_2" name="username" type="text" step=".1" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter password: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_3" name="u_password" type="password" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter email: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_4" name="email" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter firstname: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_5" name="firstname" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter lastname: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_6" name="lastname" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter middlename: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_7" name="middlename" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter DateOfBirth: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_8" name="DateOfBirth" type="date" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /> <label>Enter gender: &nbsp;&nbsp;</label>
                {/* <br /><input id="inst_u_9" name="gender" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} /> */}
                <br /><select id="upd_u_9" name="gender" onChange={this.handleChange}>
                        <option value=''>&nbsp;&nbsp;</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                <br /><br /> <label>Enter bio: &nbsp;&nbsp;</label>
                <br /><input id="upd_u_10" name="bio" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }} />
                <br /><br /><button type = "submit" value="Submit" className="primary">submit</button>
            </form>
            </>
        );
    }
}


export class DeleteForm extends Component{
    constructor(prop){
        super(prop);
        this.state={
            userID: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault();
        let user = this.state;
        user = JSON.stringify(user);
        console.log(user);
        callDeleteUserWS(user)
        .then((message) => {
            console.log("finished deleting");
            console.log(message);
        })
        .catch(error =>{
            console.error(error);
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Enter UserID:&nbsp;&nbsp;</label>
                <br /><input id="del_u_1" name="userID" type="text" onChange={this.handleChange} style={{ width: "15em", padding: "5px" }}></input>
                <br /><br /><button type = "submit" value="Submit" className="primary">submit</button>
            </form>
        );
    }
}

class User extends Component{
    render(){
        return(
            <>
            <h1>User management</h1>
            <MyDiv2>
                <div style={{margin:"20px"}}>
                    <h1>Search for user</h1>
                    <SearchForm />
                </div>
                <div style={{margin:"20px"}}>
                    <h1>Insert new user</h1>
                    <InsertForm />
                </div>
                <div style={{margin:"20px"}}>
                    <h1>Update user</h1>
                    <UpdateForm />
                </div>
                <div style={{margin:"20px"}}>
                    <h1>Delete user</h1>
                    <DeleteForm />
                </div>
            </MyDiv2>
            
            </>
        );
    }
}

export default User;