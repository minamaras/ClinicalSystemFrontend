import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card,Form,Col } from "react-bootstrap";
import axios from 'axios';

class NurseProfile extends React.Component {
    
    constructor(props) {
        super(props);

      this.handleChange = this.handleChange.bind(this);
      this.SendUpdateRequest = this.SendUpdateRequest.bind(this);

      this.state={
        name:'',
        lastname:'',
        email:'',
        password:''
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
     
         axios.post("http://localhost:8081/api/nurses/updateprofile",this.state,options).then(
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
                   role: resp.data.role
     
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
    
    <Card className="text-center" id="karticaClinicAdmin">
      <Form className="adminProfileForm" onSubmit={this.SendUpdateRequest}>
      <Card.Header>My Info</Card.Header>
      <Card.Body>
        <Card.Title>About me</Card.Title>
    
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
export default withRouter(NurseProfile);