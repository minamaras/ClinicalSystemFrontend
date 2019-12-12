import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card,Form,Col } from "react-bootstrap";
import axios from 'axios';
import '../css/DoctorProfile.css'

class DoctroProfile extends React.Component {
    
    constructor(props) {
        super(props);

      this.handleChange = this.handleChange.bind(this);
      this.SendUpdateRequest = this.SendUpdateRequest.bind(this);

      this.state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        specialization: '',
        rating: '',
        clinic: ''
      }
    }

    SendUpdateRequest = event => {
        event.preventDefault();
     
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
     
        this.state.email = this.props.user.email;
        console.log(this.state);
     
         axios.post("http://localhost:8081/api/doctors/updateprofile",this.state,options).then(
           (resp) => this.onSuccessHandler(resp),
           (resp) => this.onErrorHandler(resp)
         );
     
     
     }
     
     
     onErrorHandler(resp) {
       
        alert("error");
     
     }
     
     
     changeState = (resp) => {
     
               this.setState({
                   isLoggedIn: true,
                   name: resp.data.name,
                   lastname: resp.data.lastname,
                   email: resp.data.email,
                   id: resp.data.id,
                   password: resp.data.password,
                   role: resp.data.role,
                   specialization: resp.data.specialization,
                   rating: resp.data.rating,
                   clinic: resp.data.clinic
     
       });
     }
     
     
     onSuccessHandler(resp) {
     
       alert("Success");
       this.changeState(resp)
       window.location.reload();
     
     }
     
     
     handleChange(e) {
           this.setState({...this.state, [e.target.name]: e.target.value});
       }
     

    render() {
        return (
    
    <Card className="text-center" id="karticaDoktor">
      <Form className="doctorProfileForm" onSubmit={this.SendUpdateRequest}>
      
      <Card.Body>
        <Card.Title>My Info</Card.Title>
    
           <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label><b>Email:</b> {this.props.user.email}</Form.Label>
            <Form.Label>  </Form.Label>
              </Form.Group>
    
            </Form.Row>
    
              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Enter your firstname" id="name" name="name" defaultValue={this.props.user.name} onChange={this.handleChange} />
              </Form.Group>
    
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter your lastname" id="lastname" name="lastname" defaultValue={this.props.user.lastname} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Specialization</Form.Label>
              <Form.Control type="text" placeholder="Enter your specialization" id="specialization" name="specialization" defaultValue={this.props.user.specialization} onChange={this.handleChange} />
              </Form.Group>
    
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="text" placeholder="Enter your rating" id="rating" name="rating" defaultValue={this.props.user.rating} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>
    
    
              
    
    
              <Button variant="primary" type="submit">
              Update Info
              </Button>
    
      </Card.Body>
      
      </Form>
    </Card>
    
    
        )
    
    
    }
} 
export default withRouter(DoctroProfile);