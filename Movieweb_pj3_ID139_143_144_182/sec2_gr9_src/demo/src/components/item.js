import React, {Component} from "react";
import {Helmet} from "react-helmet";
import './css/result.css';

class item extends Component{
    render(){
        return(
            <>
            <h1 id="movName">Movie Detail</h1>
            <table className="result_black_border">
                <tbody id="item" className="result_black_border">

                </tbody>
            </table>
            <Helmet>
                <script src="item.js"></script>
            </Helmet>
            </>
        );
    }
}

export default item;