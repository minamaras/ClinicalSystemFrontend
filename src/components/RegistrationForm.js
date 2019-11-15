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
      role:'patient'
    }
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
