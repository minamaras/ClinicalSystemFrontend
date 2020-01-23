import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router,Link } from "react-router-dom";
import axios from 'axios';
import Routes from './components/Router'
import { Nav, Navbar, NavItem, Button, Carousel} from 'react-bootstrap';
import RoutedLinkContainer from './components/RoutedLinkContainer'
import PhotoSlider from './components/PhotoSlider'
import icon from './icons/myprofile.svg'


export default class App extends React.Component {

  constructor(props) {
    super(props);

      this.SignOut = this.SignOut.bind(this);

    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {

      this.state = {
        role: '',
        isLoggedIn: false,
        name: '',
        lastname: '',
        email: '',
        password: '',
        id: '',
        adress :'',
        city:'',
        country:'',
        phone:'',
        socialSecurityNumber:'',
        specialization: '',
        rating: '',
        clinic: ''

      }
    } else {

      let token = localStorage.getItem('token');
      let self = this;

      this.state = {
        isLoggedIn: false
      }

      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get('http://localhost:8081/auth/user', options).then(
                (response) => { self.changeState(response) },
                (response) => { console.log(response)}
            );

    }


  }

  changeState = (resp) => {

    console.log(resp);

    if(resp.data.role ===  'PATIENT'){
            this.setState({
                isLoggedIn: true,
                name: resp.data.name,
                lastname: resp.data.lastname,
                email: resp.data.email,
                id: resp.data.id,
                password: resp.data.password,
                role: resp.data.role,
                adress :resp.data.adress,
                city: resp.data.city,
                country:resp.data.country,
                phone:resp.data.phone,
                socialSecurityNumber: resp.data.socialSecurityNumber,
                role:resp.data.role


    });
  }else if (resp.data.role ===  'CLINICALCENTREADMIN'){

              this.setState({
                  isLoggedIn: true,
                  name: resp.data.name,
                  lastname: resp.data.lastname,
                  email: resp.data.email,
                  id: resp.data.id,
                  password: resp.data.password,
                  role: resp.data.role

});

}else if (resp.data.role ===  'DOCTOR'){

              this.setState({
                  isLoggedIn: true,
                  name: resp.data.name,
                  lastname: resp.data.lastname,
                  email: resp.data.email,
                  id: resp.data.id,
                  password: resp.data.password,
                  role: resp.data.role,
                  specialization: resp.data.specialization,
                  rating: resp.data.rating,
                  clinicname: resp.data.clinicname,
                  start: resp.data.start,
                  end: resp.data.end


                });
            }

            else if (resp.data.role ===  'CLINICADMIN'){

                          this.setState({
                              isLoggedIn: true,
                              name: resp.data.name,
                              lastname: resp.data.lastname,
                              email: resp.data.email,
                              id: resp.data.id,
                              password: resp.data.password,
                              role: resp.data.role,
                              clinic: resp.data.clinic.name,
                              clinicdes: resp.data.clinic.description,
                              clinicadress: resp.data.clinic.adress

                            });
                        }

            else if (resp.data.role ===  'NURSE'){

                                      this.setState({
                                          isLoggedIn: true,
                                          name: resp.data.name,
                                          lastname: resp.data.lastname,
                                          email: resp.data.email,
                                          id: resp.data.id,
                                          password: resp.data.password,
                                          role: resp.data.role,

                                        });
                                    }


}

    SignOut() {

      this.setState({
          isLoggedIn:false
      });

      localStorage.clear();
      window.location.href =  "http://localhost:3000/";

    }


  render() {

    let role = this.state.role;
    let isLoggedIn = this.state.isLoggedIn;

      if(!this.state.isLoggedIn) {
        return (
          <Router>
             <div id="mynav">
                <Navbar bg="light" variant="light">
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
                  <Navbar bg="light" variant="light" style={{left:'0', right:'0',top:'0',position: 'absolute',width:'100%'}} >
                      <Navbar.Brand>Clinical System</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <RoutedLinkContainer link="/" displayText="Home" />
                      <RoutedLinkContainer link="/exams" displayText="Exams" />

                      <RoutedLinkContainer link="/allclinics" displayText="Clinics" />
                      <RoutedLinkContainer link="/medicalrecord" displayText="My medical record" />

                  </Nav>
            <Nav className="ml-auto">

                      <Link to="/patientprofile"><img className="profileButton" src={icon} style={{height:'30px',width:'auto', margin: "3px 9px 0 0"}}/></Link>
                      <Button className="signoutBtn" variant="outline-dark" size="sm"  onClick={this.SignOut}>Sign Out</Button>

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
                  <Navbar bg="light" variant="light" expand="lg" style={{width:'auto'}}>
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


                      <Link to="/doctorprofile"><img className="profileButton" src={icon} style={{height:'30px',width:'auto', margin: "3px 9px 0 0"}}/></Link>

                      <Button className="signoutBtn" variant="outline-dark" size="sm" onClick={this.SignOut}>Sign Out</Button>
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
                  <Navbar bg="light" variant="light" expand="lg" style={{width:'auto'}}>
                      <Navbar.Brand>Clinical System</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <RoutedLinkContainer link="/" displayText="Home" />
                      <RoutedLinkContainer link="/doctors" displayText="Doctors" />
                      <RoutedLinkContainer link="/nurses" displayText="Nurses" />
                      <RoutedLinkContainer link="/rooms" displayText="ORs" />
                      <RoutedLinkContainer link="/manageclinic" displayText="Clinic Info" />
                      <RoutedLinkContainer link="/businessreport" displayText="Business Reports" />
                      <RoutedLinkContainer link="/holiday" displayText="Holiday" />
                      <RoutedLinkContainer link="/examtypes" displayText="Exam Types" />

                  </Nav>
                  <Nav className="ml-auto">


                      <Link to="/profilepage"><img className="profileButton" src={icon} style={{height:'30px',width:'auto', margin: "3px 9px 0 0"}}/></Link>

                      <Button className="signoutBtn" variant="outline-dark" size="sm"  onClick={this.SignOut}>Sign Out</Button>
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
                  <Navbar bg="light" variant="light" expand="lg" style={{width:'auto'}}>
                      <Navbar.Brand>Clinical System</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <RoutedLinkContainer link="/" displayText="Home" />
                      <RoutedLinkContainer link="/prescription" displayText="Prescriptions" />
                      <RoutedLinkContainer link="/calendar" displayText="Calendar" />
                      <RoutedLinkContainer link="/patients" displayText="Patients" />
                      <RoutedLinkContainer link="/holiday" displayText="Holiday" />
                  </Nav>
                  <Nav className="ml-auto">


                      <Link to="/nurseprofile"><img className="profileButton"src={icon} style={{height:'30px',width:'auto', margin: "3px 9px 0 0"}}/></Link>

                      <Button className="signoutBtn" variant="outline-dark" size="sm" onClick={this.SignOut}>Sign Out</Button>
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
                <Navbar bg="light" variant="light" expand="lg" style={{width:'auto'}} >
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


                    <Link to="/ccadminpage"><img className="profileButton"src={icon} style={{height:'30px',width:'auto', margin: "3px 9px 0 0"}} /></Link>

                    <Button className="signoutBtn" variant="outline-dark" size="sm" onClick={this.SignOut}>Sign Out</Button>
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
