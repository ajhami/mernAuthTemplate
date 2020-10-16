const Validator = require("validator");
const isEmpty = require("is-empty");

function validateLoginInput(data) {
    let errors = {};

    // Checking for empty field entries
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Validating the email entry
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email address is required.";
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid email address.";
    }

    // Validating password entries
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password entry required.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};

module.exports = validateLoginInput;