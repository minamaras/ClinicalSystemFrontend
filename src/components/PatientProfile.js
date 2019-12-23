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

      this.state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        adress :'',
        city:'',
        country:'',
        phone:'',
        socialSecurityNumber:''

      }

}



SendUpdateRequest = event => {
   event.preventDefault();

   let token = localStorage.getItem('token');
   const options = {
       headers: { 'Authorization': 'Bearer ' + token}
   };

   this.state.email = this.props.user.email;
   this.state.socialSecurityNumber = this.props.user.socialSecurityNumber;

   console.log(this.state);

    axios.post("http://localhost:8081/api/patients/updateprofile",this.state,options).then(
      (resp) => this.onSuccessHandler(resp),
      (resp) => this.onErrorHandler(resp)
    );


}


onErrorHandler(resp) {
  PatientAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true
    });

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
              adress :resp.data.adress,
              city: resp.data.city,
              country:resp.data.country,
              phone:resp.data.phone,
              socialSecurityNumber: resp.data.socialSecurityNumber

  });
}


onSuccessHandler(resp) {

  PatientAlert.fire({
      title: "You updated your info successfully",
      text: "",
      type: "success",
    });

  this.changeState(resp)
  window.location.reload();

}


handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value});
  }



render() {
    return (

      <Card className="text-center" id="kartica">
  <Form className="profileForm" onSubmit={this.SendUpdateRequest}>

  <Card.Body >

      <Form.Row className="headerPatient">
      <Form.Group as={Col} controlId="formGridEmail">
      <b className="username">{this.props.user.name}'s info</b>
      </Form.Group>
      </Form.Row>

       <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="fontPtnt"><b>Email:</b> {this.props.user.email}</Form.Label>
            <Form.Label>  </Form.Label>
            </Form.Group>


            <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Label className="fontPtnt"><b>Social security number:</b>  {this.props.user.socialSecurityNumber}</Form.Label>
            </Form.Group>


        </Form.Row>





          <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="fontPtnt">First name</Form.Label>
          <Form.Control type="text"  id="name" name="name" defaultValue={this.props.user.name} onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label className="fontPtnt">Lastname</Form.Label>
          <Form.Control type="text"  id="lastname" name="lastname" defaultValue={this.props.user.lastname} onChange={this.handleChange}/>
          </Form.Group>
          </Form.Row>


          <Form.Group controlId="formGridAddress1">
          <Form.Label className="fontPtnt">Address</Form.Label>
          <Form.Control id="adress" name="adress" defaultValue={this.props.user.adress} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
          <Form.Label className="fontPtnt">Country</Form.Label>
          <Form.Control placeholder="Enter country name" id="country" name="country" defaultValue={this.props.user.country} onChange={this.handleChange}/>
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
          <Form.Label className="fontPtnt">City</Form.Label>
          <Form.Control type="text" id="city"  name="city" defaultValue={this.props.user.city} onChange={this.handleChange} />
          </Form.Group>


          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label className="fontPtnt">Social security number</Form.Label>
          <Form.Control type="text" id="socialSecurityNumber"  name="socialSecurityNumber" defaultValue={this.props.user.socialSecurityNumber} readonly/>
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridZip">
          <Form.Label className="fontPtnt">Phone number</Form.Label>
          <Form.Control type="text" id="phone"  name="phone" defaultValue={this.props.user.phone} onChange={this.handleChange} />
          </Form.Group>
          </Form.Row>


          <Button variant="outline-primary" type="submit">
          Update info
          </Button>

  </Card.Body>
  </Form>
</Card>


    )


}




}

export default withRouter(PatientProfile);
