import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";
import usericon from '../icons/man.png'
import '../css/PatientProfile.css';


class PatientProfile extends React.Component{

  constructor(props) {
      super(props);
}

render() {
    return (

      <Card className="text-center" id="kartica">
  <Form className="profileForm">
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
          <Form.Control type="text" placeholder="Enter your firstname" id="name" name="name" value={this.props.user.name}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="text" placeholder="Enter your lastname" id="lastname" name="lastname" value={this.props.user.lastname} />
          </Form.Group>
          </Form.Row>


          <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Enter your adress" id="adress" name="adress" value={this.props.user.adress} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
          <Form.Label>Country</Form.Label>
          <Form.Control placeholder="Enter country name" id="country" name="country" value={this.props.user.country} />
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" id="city" placeholder="Enter your city." name="city" value={this.props.user.city}  />
          </Form.Group>


          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Social security number</Form.Label>
          <Form.Control type="text" id="socialSecurityNumber" placeholder="Enter your social security number." name="socialSecurityNumber" value={this.props.user.socialSecurityNumber}/>
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="text" id="phone" placeholder="Enter your phone number." name="phone" value={this.props.user.phone} />
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
