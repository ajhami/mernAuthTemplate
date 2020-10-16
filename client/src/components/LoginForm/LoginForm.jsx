import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
// import Login from "../../pages/Login";

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    };

    componentDidMount() {
        // If user is already logged in, redirect to homepage
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/Home");
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/Home");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(newUser);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <h1>Create Account</h1>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <label htmlFor="email"
                            className="row mt-4"
                        >
                            Email
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            className={classnames("row", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                            type="email"
                        />
                        <span className="row errorMessage mt-2">
                            {errors.email}
                            {errors.emailNotFound}
                        </span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password"
                            className="row mt-4"
                        >
                            Password
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            className={classnames("row", {
                                invalid: errors.password || errors.passwordincorrect
                            })}
                            type="password"
                        />
                        <span className="row errorMessage mt-2">
                            {errors.passwordIncorrect}
                        </span>
                    </div>

                    <div className="row mt-4">
                        <button type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        )
    }

};

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(LoginForm));