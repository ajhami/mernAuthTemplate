import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/CreateAccount" component={CreateAccount} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
