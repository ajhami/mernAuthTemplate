import React, { Component } from "react";
import "./style.css";
import NavBar from "../../components/Navbar";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Logout extends Component {
    async componentDidMount() {
        try {
            await this.props.logoutUser();
            await this.props.history.push("/");
        }
        catch(err) {
            console.log(err);
        };
    };

    render() {
        return (
            <div>
                <NavBar />
                LOGOUT
            </div>
        );
    };
};


export default connect(
    null,
    { logoutUser }
)(withRouter(Logout));