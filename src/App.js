import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import Routes from './components/Router'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {

      this.state = {
        role: '',
        isLoggedIn: false,
        name: '',
        lastname: '',
        email: '',
        password: '',
        id: ''
      }
    } else {

      let token = localStorage.getItem('token');
      let self = this;

      this.state = {
        isLoggedIn: false
      }
     
      const options = {
        headers: {'token' : token}
      }

      axios.get('http://localhost:8081/api/user', options).then(
                (response) => { self.changeState(response) },
                (response) => { console.log(response)}
            );

    }


  }

  changeState = (resp) => {
    this.setState({
        isLoggedIn: true,
        name: resp.data.name,
        lastname: resp.data.lastname,
        email: resp.data.email,
        id: resp.data.id,
        password: resp.data.password,
        role: resp.data.role
    });

    localStorage.setItem('token', this.state.password);
} 

  render() {

    let role = this.state.role;
    let isLoggedIn = this.state.isLoggedIn;
    return (
      <Router>

        <div className="App container">
          <MyNavbar
            role={role = "clinicadmin"}
            isLoggedIn={isLoggedIn=true}
          />
          <Routes/>

        </div>

      </Router>
    );
  }

}
