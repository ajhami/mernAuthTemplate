const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
    let errors = {};

    // Checking for empty field entries
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.verifyPassword = !isEmpty(data.verifyPassword) ? data.verifyPassword : "";

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
    if(Validator.isEmpty(data.verifyPassword)) {
        errors.verifyPassword = "Please verify your password entry.";
    }
    if(!Validator.isLength(data.password, { min: 8, max: 25 })) {
        errors.password = " Password must be between 8 and 25 characters.";
    }
    if(!Validator.equals(data.password, data.verifyPassword)) {
        errors.verifyPassword = "Passwords don't match."
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};

module.exports = validateRegisterInput;