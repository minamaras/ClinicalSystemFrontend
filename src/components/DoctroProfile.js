import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card,Form,Col } from "react-bootstrap";
import axios from 'axios';
import '../css/DoctorProfile.css'
import usericon from '../icons/doctor.svg'

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
        clinicname: ''
      }
      console.log(this.props.user)
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

    <Card id="karticaDoktor">
      <Form className="doctorProfileForm" onSubmit={this.SendUpdateRequest}>

      <Card.Body>
      <Card.Img  style={{height:'73px', width: 'auto'}} className="dctIcon" variant="top" src={usericon} alt='Unavailable icon' />

        <Card.Title className="dctrTitle">My Info</Card.Title>

           <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labeldctr">Email: {this.props.user.email}</Form.Label>
            <Form.Label>  </Form.Label>
              </Form.Group>
           </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labeldctr">Rating: {this.props.user.rating}</Form.Label>
              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labeldctr">Clinic: {this.props.user.clinicname}</Form.Label>
              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labeldctr">First name</Form.Label>
              <Form.Control type="text" placeholder="Enter your firstname" name="name" defaultValue={this.props.user.name} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labeldctr">Lastname</Form.Label>
              <Form.Control type="text" placeholder="Enter your lastname" name="lastname" defaultValue={this.props.user.lastname} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="labeldctr">Specialization</Form.Label>
              <Form.Control type="text" placeholder="Enter your specialization" name="specialization" defaultValue={this.props.user.specialization} onChange={this.handleChange} />
              </Form.Group>
              </Form.Row>

              <Button variant="outline-primary" className="dctrBtn" type="submit">
              Update Info
              </Button>

      </Card.Body>

      </Form>
    </Card>


        )


    }
}
export default withRouter(DoctroProfile);
