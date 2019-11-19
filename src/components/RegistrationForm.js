import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Routes from './Router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";



class RegistrationForm extends React.Component {
  constructor(props){
    super(props);

    this.state={
      name:'',
      lastname:'',
      email:'',
      password:'',
      repeatedPassword:'',
      role:'patient'
    }
  }


handelNameChange(event){

  this.setState({name: event.target.value});

}

handelLastnameChange(event){

  this.setState({lastname: event.target.value});

}


handelEmailChange(event){

  this.setState({email: event.target.value});

}

handelPasswordChange(event){

  this.setState({password: event.target.value});

}

handelRepeatedpasswordChange(event){

  this.setState({repeatedPassword: event.target.value});

}

SendRegisterRequest(){
    let firstame         = this.state.firstame;
    let lastname            = this.state.lastname;
    let email               = this.state.email;
    let password            = this.state.password;
    let repeatedPassword    = this.state.repeatedPassword;


    axios.post("http://localhost:8081/api/patients/register", { firstName: firstName, lastName: lastName, email: email, password: password, repeatedPassword: repeatedPassword, phoneNumber: phoneNumber }).then(
        (response) => {
            alert("You must confirm your mail. The confirmation link is in inbox.");
            self.props.history.push("/login");
        },
        (response) => {
            self.handleError(response);
        }
    );

}




  render() {
    return (

      <Form>
          <Form.Group controlId="name">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter your first name" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter your last name" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <FormGroup controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

          </FormGroup>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>


          <Form.Group controlId="repeatedPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>




    );
  }
}
export default RegistrationForm;
