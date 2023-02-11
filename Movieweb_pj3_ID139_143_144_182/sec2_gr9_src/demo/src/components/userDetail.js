import {Component} from "react";
import {Helmet} from "react-helmet";

class userDetail extends Component{
    render(){
        return(
            <>
            <h1 id="movName">User Detail</h1>
            <table className="result_black_border">
                <tbody id="user_detail" className="result_black_border">

                </tbody>
            </table>
            <Helmet>
                <script src="userDetailJS.js"></script>
            </Helmet>
            </>
        );
    }
}

export default userDetail;