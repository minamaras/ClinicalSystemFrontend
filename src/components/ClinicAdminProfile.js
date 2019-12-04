import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";

class ClinicAdminProfile extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
    
          <Card className="text-center">
      <Form>
      <Card.Header>Clinic Admin info</Card.Header>
      <Card.Body>
        <Card.Title>About me</Card.Title>
    
           <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"  id="email" name="email" value={this.props.user.email}/>
              </Form.Group>
    
              <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" id="password" name="password" value={this.props.user.password} />
              </Form.Group>
    
              </Form.Row>
    
              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Enter your firstname" id="name" name="name" value={this.props.user.name} />
              </Form.Group>
    
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter your lastname" id="lastname" name="lastname" value={this.props.user.lastname} />
              </Form.Group>
              </Form.Row>
    
    
              <Form.Group controlId="formGridAddress1">
              <Form.Label>Clinic</Form.Label>
              <Form.Control placeholder="My Clinic" id="adminclinic" name="clinic"  />
              </Form.Group>
    
    
              <Button variant="primary" type="submit">
              Update Info
              </Button>
    
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
      </Form>
    </Card>
    
    
        )
    
    
    }
} 
export default withRouter(ClinicAdminProfile);