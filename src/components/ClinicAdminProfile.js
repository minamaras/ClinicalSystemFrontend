import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card,Form,Col } from "react-bootstrap";
import axios from 'axios';
import '../css/ClinicAdminProfile.css'
import usericon from '../icons/user.svg'

class ClinicAdminProfile extends React.Component {
    
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
     
         axios.post("http://localhost:8081/api/clinicadmin/updateprofile",this.state,options).then(
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
    
    <Card className="karticaClinicAdmin">
      <Form className="adminProfileForm" onSubmit={this.SendUpdateRequest}>
      <Card.Body>
      <Card.Img style={{height:'80px', width: 'auto'}} className="cadmIcon" variant="top" src={usericon} alt='Unavailable icon' />

        <Card.Title className="admTitle">My info</Card.Title>
    
           <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="admLabel">Email: {this.props.user.email}</Form.Label>
              </Form.Group>    
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="admLabel">Clinic: {this.props.user.clinic}</Form.Label>
              </Form.Group>
            </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="admLabel">First name</Form.Label>
              <Form.Control type="text" name="name" defaultValue={this.props.user.name} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="admLabel">Lastname</Form.Label>
              <Form.Control type="text" name="lastname" defaultValue={this.props.user.lastname} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>
    


              <Button variant="outline-primary" className="admBtn" type="submit">
              Update Info
              </Button>
    
      </Card.Body>
      </Form>
    </Card>
    
    
        )
    
    
    }
} 
export default withRouter(ClinicAdminProfile);