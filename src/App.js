import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MyNavbar from './components/MyNavbar';
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Switch } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Router1 from "./components/Router";
import Home from "./components/Home";
import ClinicalCentreAdminPage from "./components/ClinicalCentreAdminPage";


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      role: "",
      isLoggedIn: false
    }

  }

  render() { 

    let role = this.state.role;
    let isLoggedIn = this.state.isLoggedIn;
    //this.setState((state) => ({ role: "patient", isLoggedIn: true}));
    return (
      <Router>

      <div className="App container">
        <MyNavbar
          role = {role = "clinicalcentreadmin"}
          isLoggedIn = {isLoggedIn = true}
        />

        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegistrationForm} />
            <Route exact path="/ccadminpage" component={ClinicalCentreAdminPage} />
        </Switch>
      </div>

      </Router>
    );
  }

}  