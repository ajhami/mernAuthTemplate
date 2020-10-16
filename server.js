const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Comment out on deployment, OR NOT?
// const keys = require("./config/keys");

// Require in the router setup for users api
const users = require("./routes/api/users");

const PORT = process.env.PORT || 5000;
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(routes);

// Passport Setup
app.use(passport.initialize());
require("./services/passport")(passport);

// Setup Routes
app.use("/api/users", users);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

else {
    app.use(express.static("public"));
};


// URI - 1st is localhost connection, 2nd is mongodb atlas connection
// const URI = "mongodb://localhost/mernauthdemo";
const URI = process.env.MONGODB_URI || require("./config/keys").URI;


mongoose
    .connect(
        URI,
        {
            useNewUrlParser: true,
            useFindAndModify: false
        }
    )
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log("Failed to connect to MongoDB.\n", err));

app.listen(PORT, () => {
    console.log("\nWELCOME TO EXPRESS SERVER!\nApp = Mern Auth Template\nrunning on port ", PORT);
});