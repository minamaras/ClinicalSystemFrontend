import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/Registration.css';

const PatientRegisteredAlert = withReactContent(Swal)

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);



      this.handleChange = this.handleChange.bind(this);
      this.SendRegisterRequest = this.SendRegisterRequest.bind(this);

    this.state={
      name:'',
      lastname:'',
      email:'',
      password:'',
      repeatedPassword:'',
      adress :'',
      city:'',
      country:'',
      phone:'',
      socialSecurityNumber:''

    }
  }




SendRegisterRequest = event => {
   event.preventDefault();

    axios.post("http://localhost:8081/auth/register",this.state).then(
      (resp) => this.onSuccessHandler(resp),
      (resp) => this.onErrorHandler(resp)
    );

}

onErrorHandler(resp) {
  PatientRegisteredAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true
    });

}

onSuccessHandler(resp) {

  PatientRegisteredAlert.fire({
      title: "Patient registered successfully",
      text: "",
      type: "success",
    });

  this.setState({ redirect: this.state.redirect === false });
  window.location.href = "http://localhost:3000/login";


}


handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value});
  }


  onErrorHandler(resp) {
        alert("Error!")

     }


  render() {
    return (

      <Form className="formReg" onSubmit={this.SendRegisterRequest}>
          <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control type="password" placeholder="Repeatedpassword" id="repeatedPassword"/>
          </Form.Group>

          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="Enter your firstname" id="name"/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="text" placeholder="Enter your lastname" id="lastname" />
          </Form.Group>
          </Form.Row>


          <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Enter your adress" id="adress" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" id="country" />
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" id="city"/>
          </Form.Group>


          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Social security number</Form.Label>
          <Form.Control type="text" id="socialSecurityNumber" />
          </Form.Group>
          </Form.Row>



          <Button variant="primary" type="submit">
          Register
          </Button>
</Form>



    );
  }
}

export default withRouter(RegistrationForm);
