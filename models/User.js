const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

// Set up bcrypt here

// Configure model to database
const Users = mongoose.model("Users", userSchema);

// Export the Users model
module.exports = Users;