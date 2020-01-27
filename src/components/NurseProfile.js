import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card,Form,Col } from "react-bootstrap";
import axios from 'axios';
import usericon from '../icons/nursehat.svg'
import '../css/NurseProfile.css'

class NurseProfile extends React.Component {
    
    constructor(props) {
        super(props);

      this.handleChange = this.handleChange.bind(this);
      this.SendUpdateRequest = this.SendUpdateRequest.bind(this);

      this.state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        clinicid: '',
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
                   role: resp.data.role,

     
       });
     }
     
     
     onSuccessHandler(resp) {
     
       this.changeState(resp)
       window.location.reload();
     
     }
     
     
     handleChange(e) {
           this.setState({...this.state, [e.target.name]: e.target.value});
       }
     

    render() {
        return (
    
    <Card className="nurseCard">
      <Form className="nurseProfileForm" onSubmit={this.SendUpdateRequest}>
      <Card.Body>
      <Card.Img style={{height:'100px', width: 'auto'}} className="nrsIcon" variant="top" src={usericon} alt='Unavailable icon' />

        <Card.Title className="nurseTitle">My info</Card.Title>
    
           <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labelNurse">Email:  {this.props.user.email}</Form.Label>          
              </Form.Group>
            </Form.Row>
    
            <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labelNurse">Clinic:  {this.props.user.clinicid}</Form.Label>          
              </Form.Group>

            </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labelNurse">First name</Form.Label>
              <Form.Control type="text" placeholder="Enter your firstname" name="name" defaultValue={this.props.user.name} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>
    
              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labelNurse">Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter your lastname" name="lastname" defaultValue={this.props.user.lastname} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>
    
              <Button variant="outline-primary" type="submit" className="nurseBtn">
              Update Info
              </Button>
    
      </Card.Body>
      </Form>
    </Card>
    
    
        )
    
    
    }
} 
export default withRouter(NurseProfile);