import React, { Component } from "react";
import "./style.css";

class LandingBody extends Component {
    render() {
        return(
            <div className="container">
                <h1>Welcome!</h1>
                <p>You have successfully logged into this application.</p>
            </div>
        );
    };
};

export default LandingBody;