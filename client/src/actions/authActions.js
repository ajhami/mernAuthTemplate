import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Login user, retrieve token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // saving token to localStorage
            const { token } = res.data;
            localStorage.setItem("userToken", token); // GIVE UNIQUE NAME TO VARIABLE

            // Set token to the auth header
            setAuthToken(token);

            // Decode token for auth usage
            const decoded = jwt_decode(token);

            // Set the current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

// Setting current user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Set user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Process logout request
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("userToken");

    // Removing token from auth header
    setAuthToken(false);

    // Empty user object to reset authentication
    dispatch(setCurrentUser({}));
}

