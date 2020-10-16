const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Require in the router setup for users api
const users = require("./routes/api/users");

const PORT = process.env.PORT || 5000;
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

else {
    app.use(express.static("public"));
};


const URI = process.env.MONGODB_URI || "mongodb://localhost/mernauthdemo";


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

// Passport Setup
app.use(passport.initialize());
require("./config/passport")(passport);


// Setup Routes
app.use("/api/users", users);


app.listen(PORT, () => {
    console.log("\nWELCOME TO EXPRESS SERVER!\nApp = Mern Auth Template\nrunning on port ", PORT);
});