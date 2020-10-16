import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./style.css";

class CreateAccountForm extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            verifyPassword: "",
            errors: {}
        };
    };

    componentDidMount() {
        // If user is already logged in, redirect to homepage
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/Home");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        };
    };

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            verifyPassword: this.state.verifyPassword
        };

        this.props.registerUser(newUser, this.props.history);
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
                                invalid: errors.email
                            })}
                            type="email"
                        />
                        <span className="row mt-2 errorMessage">{errors.email}</span>
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
                                invalid: errors.password
                            })}
                            type="password"
                        />
                        <span className="row mt-2 errorMessage">{errors.password}</span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="verfiyPassword"
                            className="row mt-4"
                        >
                            Confirm Password
                        </label>
                        <input
                            onChange={this.onChange}
                            value={this.state.verifyPassword}
                            error={errors.verifyPpassword}
                            id="verifyPassword"
                            className={classnames("row", {
                                invalid: errors.verifyPassword
                            })}
                            type="password"
                        />
                        <span className="row mt-2 errorMessage">{errors.verifyPassword}</span>
                    </div>
                    <div className="row mt-4">
                        <button type="submit">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        )
    }

};

CreateAccountForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// export default CreateAccountForm;
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(CreateAccountForm));