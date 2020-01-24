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

   if(this.state.password != this.state.repeatedPassword){

     PatientRegisteredAlert.fire({
         title: "Passwords don't match!Please try again.",
         text: '',
         type: "error",
         button: true
       });

       return;

   }else {



    axios.post("http://localhost:8081/auth/register",this.state).then(
      (resp) => this.onSuccessHandler(resp),
      (resp) => this.onErrorHandler(resp)
    );

  }
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
      title: "You will recieve email with activation link soon.",
      text: "",
      type: "success",
    });

  this.setState({ redirect: this.state.redirect === false });
  window.location.href = "http://localhost:3000/";


}


handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value});
  }


  onErrorHandler(resp) {
        alert("Error!")

     }


  render() {
    return (
      <div>
        <div className="registerCard">
      <Form className="formReg" onSubmit={this.SendRegisterRequest}>
          <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" name="email" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" name="password" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Repeat password</Form.Label>
          <Form.Control type="password" placeholder="Repeat your password" id="repeatedPassword" name="repeatedPassword" onChange={this.handleChange} />
          </Form.Group>

          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="Enter your firstname" id="name" name="name" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="text" placeholder="Enter your lastname" id="lastname" name="lastname" onChange={this.handleChange}  />
          </Form.Group>
          </Form.Row>


          <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Enter your adress" id="adress" name="adress" onChange={this.handleChange}  />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder="Enter country name" id="country" name="country" onChange={this.handleChange}  />
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" id="city" placeholder="Enter your city." name="city" onChange={this.handleChange} />
          </Form.Group>


          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Social security number</Form.Label>
          <Form.Control type="text" id="socialSecurityNumber" placeholder="Enter your social security number." name="socialSecurityNumber" onChange={this.handleChange}/>
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="text" id="phone" placeholder="Enter your phone number." name="phone" onChange={this.handleChange}/>
          </Form.Group>
          </Form.Row>


          <Button variant="outline-primary" type="submit">
          Register
          </Button>
</Form>
</div>
</div>



    );
  }
}

export default withRouter(RegistrationForm);
