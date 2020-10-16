import React from "react";
import "./style.css";
import NavBar from "../../components/Navbar";
import CreateAccountForm from "../../components/CreateAccountForm";

function CreateAccount() {
    return (
        <div>
            <NavBar />
            <CreateAccountForm />
        </div>
    );
};

export default CreateAccount;