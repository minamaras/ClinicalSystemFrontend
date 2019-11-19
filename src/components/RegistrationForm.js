import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Routes from './Router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";
import LoginForm from './LoginForm'



class RegistrationForm extends React.Component {
  constructor(props){
    super(props);



      this.handleChange = this.handleChange.bind(this);
      this.SendRegisterRequest = this.SendRegisterRequest.bind(this);

    this.state={
      name:'',
      lastname:'',
      email:'',
      password:''
    }
  }




SendRegisterRequest(event){
   event.preventDefault();

    axios.post("http://localhost:8081/api/patients/register",this.state).then(
        (response) => {
            alert("Registerd!");
        },
        (response) => {
            this.handleError(response);
        }
    );

}

handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value});
  }



  render() {
    return (

      <Form onSubmit={this.SendRegisterRequest}>
          <Form.Group controlId="name">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter your first name"
            onChange={this.handleChange}
            required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter your last name"
            onChange={this.handleChange}
            required
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <FormGroup controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
            onChange={this.handleChange}
            required
             />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

          </FormGroup>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required
            onChange={this.handleChange}
             />
          </Form.Group>


          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>




    );
  }
}
export default RegistrationForm;
