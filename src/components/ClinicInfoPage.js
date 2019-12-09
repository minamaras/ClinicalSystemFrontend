import React from 'react';
import axios from 'axios';
import { Modal, Button, Card, Form,Col  } from "react-bootstrap";
import { withRouter } from "react-router-dom";


class ClinicPage extends React.Component {

    constructor(props) {
        super(props);

      this.handleChange = this.handleChange.bind(this);
      this.SendUpdateRequest = this.SendUpdateRequest.bind(this);
  
       this.state = {
           name: '',
           description: '',
           adress: ''
       }

  
  }

  SendUpdateRequest = event => {
    event.preventDefault();
 
    let token = localStorage.getItem('token');
    const options = {
        headers: { 'Authorization': 'Bearer ' + token}
    };
 
    this.state.name = this.props.user.name;
    //this.state.socialSecurityNumber = this.props.user.socialSecurityNumber;
 
    console.log(this.state);
 
     axios.post("http://localhost:8081/api/clinic/update",this.state,options).then(
       (resp) => this.onSuccessHandler(resp),
       (resp) => this.onErrorHandler(resp)
     );
 
 
 }

  onErrorHandler(resp) {
    alert("Something is wrong");
  
  }
  
  onSuccessHandler(resp) {
    this.changeState(resp)
    window.location.reload();
  
  }

  handleChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value});
 }

  changeState = (resp) => {

    this.setState({
        name: resp.data.name,
        description: resp.data.description,
        adress: resp.data.adress

   });

 }

 render() {
    return (

  <Card className="text-center" id="karta">
  <Form className="clinicInfo" onSubmit={this.SendUpdateRequest}>
  <Card.Header>Clinic's info</Card.Header>
  <Card.Body>
    <Card.Title>{this.props.user.clinic.name}</Card.Title>

       <Form.Row>

          </Form.Row>

          <Form.Row>
          <Form.Group as={Col}>
          <b>Description: </b>
          <input value={+ " " + this.props.user.clinic.description}/>
          </Form.Group>

          <Form.Group as={Col}>
          <b>Adress: </b>
          <input value={+ " " + this.props.user.clinic.adress}/>
          </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
          Update
          </Button>


    </Card.Body>
    </Form>
    </Card>


    )


}
}

export default withRouter(ClinicPage);