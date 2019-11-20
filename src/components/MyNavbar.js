import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";
import '../css/MyNavbar.css';

class MyNavbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {


        if(!this.props.isLoggedIn) {
            return (
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
                </div>

            );
        } else {
            if(this.props.role === 'patient') {
                return (

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
                    </div>


                );

            } else if(this.props.role === 'doctor') {
                return (
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
                    </div>

                );
            } else if(this.props.role === 'clinicadmin') {
                return (
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
                    </div>

                );
            } else if(this.props.role === 'nurse') {
                return (
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
                    </div>

                );
            } else if(this.props.role === 'clinicalcentreadmin') {
                return (
                    <div className = "Mynavbar container">
                        <Navbar bg="light" variant="light" expand="lg">
                            <Navbar.Brand>Clinical System</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <RoutedLinkContainer link="/" displayText="Home" />
                            <RoutedLinkContainer link="/requests" displayText="Requests" />
                            <RoutedLinkContainer link="/clinics" displayText="Clinics" />
                            <RoutedLinkContainer link="/codebook" displayText="Code Book" />
                        </Nav>

             <Nav className="ml-auto">
                            <RoutedLinkContainer link="/ccadminpage" displayText="My Profile" />
                            <RoutedLinkContainer link="/signout" displayText="Sign Out" />
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    </div>

                );
            }
        }
    }

}

export default MyNavbar;
