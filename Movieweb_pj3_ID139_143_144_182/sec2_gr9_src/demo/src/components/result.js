import {Component} from "react";
import {Helmet} from "react-helmet";
// import {useEffect} from "react";
import './css/result.css'




class result extends Component{
    render(){
        return(
            <>
            <h1>result</h1>
            <table id="tbResult" className="result_black_border">
                <tbody>
                <tr className="result_black_border">
                    <th className="result_black_border">Movie image</th>
                    <th className="result_black_border">Movie name</th>
                    <th className="result_black_border">Detail</th>
                </tr>
                </tbody>
            </table>
            <Helmet>
                <script src="result.js"></script>
            </Helmet>
            {/* <AfterRen /> */}
            </>
            
        );
    }
}


    

//console.log(sessionStorage.getItem("data"));

export default result;