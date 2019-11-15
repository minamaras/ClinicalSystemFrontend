import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, BrowserRouter as Router } from "react-router-dom";
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";

class MyNavbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        
        if(!this.props.isLoggedIn) {
            return (
                <Router>
                    <div className = "Mynavbar container">
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Clinical System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Sign Up</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>   
                </div>
                </Router>
                
    
            );
        } else if(this.props.role === 'patient' && this.props.isLoggedIn) {
            return (
                <Router>
                    <div className = "Mynavbar container">
                    <Navbar bg="light" variant="light" expand="lg">
                        <Navbar.Brand>Clinical System</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/exams">Exams</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>   
                </div>
                </Router>

            );
            
        }
       
    }

}

export default MyNavbar;