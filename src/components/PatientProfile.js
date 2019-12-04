import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";
import usericon from '../icons/man.png'
import '../css/PatientProfile.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const PatientAlert = withReactContent(Swal)

class PatientProfile extends React.Component{

  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.SendUpdateRequest = this.SendUpdateRequest.bind(this);

      this.state = {
        role: '',
        isLoggedIn: true,
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
      }

}



SendUpdateRequest = event => {
   event.preventDefault();

   let token = localStorage.getItem('token');
   const options = {
       headers: { 'Authorization': 'Bearer ' + token}
   };

   console.log(this.state);
   //this.props.changeState(this.state);


    axios.post("http://localhost:8081/api/patients/updateprofile",this.state,options).then(
      (resp) => this.onSuccessHandler(resp),
      (resp) => this.onErrorHandler(resp)
    );


}


changeState = (user) => {

        this.setState({
              isLoggedIn: true,
              name: user.name,
              lastname: user.lastname,
              email: user.email,
              id: user.id,
              password: user.password,
              role: user.role,
              adress : user.adress,
              city: user.city,
              country: user.country,
              phone: user.phone,
              socialSecurityNumber: user.socialSecurityNumber

  });
}


onErrorHandler(resp) {
  PatientAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true
    });

}

onSuccessHandler(resp) {

  PatientAlert.fire({
      title: "You updated your info successfully",
      text: "",
      type: "success",
    });

  window.location.reload();

}


handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value});
  }

render() {
    return (

      <Card className="text-center" id="kartica">
  <Form className="profileForm" onSubmit={this.SendUpdateRequest}>
  <Card.Header>Patients info</Card.Header>
  <Card.Body>
    <Card.Title>About me</Card.Title>

       <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email"  id="email" name="email" value={this.props.user.email}/>
          </Form.Group>

          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="Enter your firstname" id="name" name="name" value={name} onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="text" placeholder="Enter your lastname" id="lastname" name="lastname" defaultValue={this.props.user.lastname} onChange={this.handleChange}/>
          </Form.Group>
          </Form.Row>


          <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Enter your adress" id="adress" name="adress" defaultValue={this.props.user.adress}onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder="Enter country name" id="country" name="country" defaultValue={this.props.user.country} onChange={this.handleChange} />
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" id="city" placeholder="Enter your city." name="city" defaultValue={this.props.user.city}onChange={this.handleChange}  />
          </Form.Group>


          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Social security number</Form.Label>
          <Form.Control type="text" id="socialSecurityNumber" placeholder="Enter your social security number." name="socialSecurityNumber" value={this.props.user.socialSecurityNumber} />
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="text" id="phone" placeholder="Enter your phone number." name="phone" defaultValue={this.props.user.phone} onChange={this.handleChange} />
          </Form.Group>
          </Form.Row>


          <Button variant="primary" type="submit">
          Register
          </Button>

  </Card.Body>
  <Card.Footer className="text-muted">Patients info</Card.Footer>
  </Form>
</Card>


    )


}




}

export default withRouter(PatientProfile);
