import React from "react";
import "./style.css";
import NavBar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
    return (
        <div>
            <NavBar />
            <LoginForm />
        </div>
    );
};

export default Login;