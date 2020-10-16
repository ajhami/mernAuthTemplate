import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Start from "./pages/Start";
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";

// Checking for jwt
if (localStorage.userToken) {

  // Set auth header token
  const token = localStorage.userToken;
  setAuthToken(token);

  // Decode token for use
  const decoded = jwt_decode(token);

  // Setting current user
  store.dispatch(setCurrentUser(decoded));

  // Verifying token expiration
  if(decoded.exp < Date.now()) {
    // If expired, we want to reset the auth
    store.dispatch(logoutUser());
    window.location.href = "./Login";
  }

}

function App() {
  return (
    <Provider store={store}>
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Start} />
          <PrivateRoute exact path="/Home" component={Home} />
          <Route exact path="/CreateAccount" component={CreateAccount} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Logout" component={Logout} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
