import axios from "axios";

const setAuthToken = token => {
    if(token) {
        // Setting token upon login request
        axios.defaults.headers.common["Authorization"] = token;
    }
    else {
        // Deleteing the auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;