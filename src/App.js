import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import Routes from './components/Router'
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import RoutedLinkContainer from './components/RoutedLinkContainer'

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
        id: '',

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

      axios.get('http://localhost:8081/auth/user', options).then(
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

      if(!this.state.isLoggedIn) {
        return (
          <Router>
             <div id="mynav">
                <Navbar bg="light" variant="light" expand="lg" >
                    <Navbar.Brand>Clinical System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <RoutedLinkContainer link="/" displayText="Home" />
                </Nav>
                <Nav className="ml-auto">

                        <RoutedLinkContainer link="/login" displayText="Log in" />
                        <RoutedLinkContainer link="/register" displayText="Sign Up" />
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes user = {this.state} changeState = {this.changeState}/>
            </div>
          </Router>


        );
    } else {
      if(this.state.role === 'PATIENT') {
          return (
            <Router>
              <div className = "Mynavbar container">
                  <Navbar bg="light" variant="light" expand="lg">
                      <Navbar.Brand>Clinical System</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <RoutedLinkContainer link="/" displayText="Home" />
                      <RoutedLinkContainer link="/exams" displayText="Exams" />
                      <RoutedLinkContainer link="/profilepage" displayText="My Profile" />

                  </Nav>
            <Nav className="ml-auto">

                      <RoutedLinkContainer link="/signout" displayText="Sign Out" />
                  </Nav>
                  </Navbar.Collapse>
              </Navbar>
              <Routes user = {this.state} changeState = {this.changeState}/>
              </div>
            </Router>



          );

      } else if(this.state.role === 'DOCTOR') {
          return (
            <Router>
               <div className = "Mynavbar container">
                  <Navbar bg="light" variant="light" expand="lg">
                      <Navbar.Brand>Clinical System</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <RoutedLinkContainer link="/" displayText="Home" />
                      <RoutedLinkContainer link="/exams" displayText="Exams" />
                      <RoutedLinkContainer link="/calendar" displayText="Calendar" />
                      <RoutedLinkContainer link="/patients" displayText="My Patients" />
                      <RoutedLinkContainer link="/holiday" displayText="Holiday" />
                  </Nav>
                  <Nav className="ml-auto">
                      <RoutedLinkContainer link="/profilepage" displayText="My Profile" />
                      <RoutedLinkContainer link="/signout" displayText="Sign Out" />
                  </Nav>
                  </Navbar.Collapse>
              </Navbar>
              <Routes user = {this.state} changeState = {this.changeState}/>
              </div>
            </Router>


          );
      } else if(this.state.role === 'CLINICADMIN') {
          return (
            <Router>
              <div className = "Mynavbar container">
                  <Navbar bg="light" variant="light" expand="lg">
                      <Navbar.Brand>Clinical System</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <RoutedLinkContainer link="/" displayText="Home" />
                      <RoutedLinkContainer link="/doctors" displayText="Doctors" />
                      <RoutedLinkContainer link="/manageclinic" displayText="Clinic Info" />
                      <RoutedLinkContainer link="/businessreport" displayText="Business Reports" />
                      <RoutedLinkContainer link="/holiday" displayText="Holiday" />
                  </Nav>
                  <Nav className="ml-auto">
                      <RoutedLinkContainer link="/profilepage" displayText="My Profile" />
                      <RoutedLinkContainer link="/signout" displayText="Sign Out" />
                  </Nav>
                  </Navbar.Collapse>
              </Navbar>
              <Routes user = {this.state} changeState = {this.changeState}/>
              </div>
            </Router>



          );
      } else if(this.state.role === 'NURSE') {
          return (
            <Router>
              <div className = "Mynavbar container">
                  <Navbar bg="light" variant="light" expand="lg">
                      <Navbar.Brand>Clinical System</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <RoutedLinkContainer link="/" displayText="Home" />
                      <RoutedLinkContainer link="/perceptions" displayText="Perceptions" />
                      <RoutedLinkContainer link="/calendar" displayText=" My Calendar" />
                      <RoutedLinkContainer link="/patients" displayText="Patients" />
                      <RoutedLinkContainer link="/holiday" displayText="Holiday" />
                  </Nav>
                  <Nav className="ml-auto">
                      <RoutedLinkContainer link="/profilepage" displayText="My Profile" />
                      <RoutedLinkContainer link="/signout" displayText="Sign Out" />
                  </Nav>
                  </Navbar.Collapse>
              </Navbar>
              <Routes user = {this.state} changeState = {this.changeState}/>
              </div>
            </Router>


          );
      } else if(this.state.role === 'CLINICALCENTREADMIN') {

        return (
          <Router>
            <div className = "Mynavbar container">
                <Navbar bg="light" variant="light" expand="lg">
                    <Navbar.Brand>Clinical System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <RoutedLinkContainer link="/" displayText="Home" />
                    <RoutedLinkContainer link="/clinics" displayText="Clinics" />
                    <RoutedLinkContainer link="/requests" displayText=" Request" />
                    <RoutedLinkContainer link="/codebook" displayText="Codebook" />
                </Nav>
                <Nav className="ml-auto">
                    <RoutedLinkContainer link="/ccadminpage" displayText="My Profile" />
                    <RoutedLinkContainer link="/signout" displayText="Sign Out" />
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes user = {this.state} changeState = {this.changeState}/>
            </div>
          </Router>


        );

      }

  }

}
}
