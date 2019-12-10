import React from 'react';
import axios from 'axios';
import { Modal, Button, Card, Form,Col  } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import '../css/ClinicInfoPage.css'


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

  <Card className="text-center-clinic" id="karta">
  <Form className="clinicInfo" onSubmit={this.SendUpdateRequest}>

  <Card.Body>
    <h1 className="clinicHeader">Clinic's info</h1>
    <br/>

    <h3 className="clinicTitle">{this.props.user.clinic.name}</h3>
      <br/>
       <Form.Row>

          </Form.Row>

          <div className="clinicCol">
          
            <Form.Group className="firstColClinic" >
            <p className="valueNameClinic">Description: </p>
            <p className="valueNameClinic">Adress: </p>
            </Form.Group>
          
            <Form.Group className="secondColClinic" >
            <Form.Control className="inputDes" value={+ " " + this.props.user.clinic.description}/>
            <Form.Control className="inputDes" value={+ " " + this.props.user.clinic.adress}/>
            </Form.Group>
          
          </div>
  

      <Button className="btnEditClinic" variant="outline-primary" type="submit">
          Update
      </Button>
</Card.Body>

          

    
    </Form>
    </Card>


    )


}
}

export default withRouter(ClinicPage);