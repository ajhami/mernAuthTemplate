import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "reactstrap";
import "./style.css";

function NavBar() {
    return (
        <Navbar className="navbar navbar-expand navbar-light bg-light">
            <NavLink
                className="nav-link"
                to="/CreateAccount"
                exact
            >
                Create Account
            </NavLink>
            <NavLink
                className="nav-link"
                to="/Login"
                exact
            >
                Login
            </NavLink>
            <NavLink
                className="nav-link"
                to="/Logout"
                exact
            >
                Logout
            </NavLink>
        </Navbar>
    )
}

export default NavBar;