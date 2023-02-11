import React, {Component} from "react";
import {Helmet} from "react-helmet";
// import './css/result.css';


class userResult extends Component{
    render(){
        return(
            <>
            <h1>result</h1>
            <table id="tbResult2" className="result_black_border">
                <tbody>
                <tr className="result_black_border">
                    <th className="result_black_border">userID</th>
                    <th className="result_black_border">username</th>
                    <th className="result_black_border">email</th>
                </tr>
                </tbody>
            </table>
            <Helmet>
                <script src="userResultJS.js"></script>
            </Helmet>
            </>
            
        );
    }
}

export default userResult;