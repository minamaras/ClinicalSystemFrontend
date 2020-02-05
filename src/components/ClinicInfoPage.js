import React from 'react';
import axios from 'axios';
import { Modal, Button, Card, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import '../css/ClinicInfoPage.css'
import Pricelist from './Pricelist';
import DoctorList from './DoctorList'
import slika from '../icons/money.svg';
import icon from '../icons/srce.svg';
import price from '../icons/money1.svg';
import doctor from '../icons/doctor.svg';




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
      headers: { 'Authorization': 'Bearer ' + token }
    };

    this.state.name = this.props.clinicname;

    axios.post("http://localhost:8081/api/clinics/update", this.state, options).then(
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
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  showPriceHideDoctors(){

    document.getElementById("profile").style.margin= "0px 0px 0px 0px";
    document.getElementById("docs").style.display = "none";
    document.getElementById("prices").style.display = "block";

  }

  showDoctorsHidePrices(){

    document.getElementById("profile").style.margin= "0px 0px 0px -110px";
    document.getElementById("prices").style.display = "none";
    document.getElementById("docs").style.display = "block";
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
      <div>

      <div className="backgroundManageClinicProfile" id="profile" style={{margin:'0px 0px 0px 0%'}}>
        <Card className="ManageClinicProfileCard" id="karticaKlinika">
          <Form className="clinicInfo" onSubmit={this.SendUpdateRequest}>
            <Card.Body>
              <h1 className="clinicHeader">Clinic's info</h1>
              <br />
              <h3 className="clinicTitle">{this.props.clinicname}</h3>
              <br />
              <Form.Row>
              </Form.Row>
              <div className="clinicCol" style={{margin:'0px 0px 0px 23%'}} >
                <Form.Group className="firstColClinic"  >
                  <p className="valueNameClinic">Description: </p>
                  <p className="valueNameClinic">Adress: </p>
                </Form.Group>
                <Form.Group className="secondColClinic">
                  <Form.Control className="inputDes" id="description" style={{width:'250px'}} name="description" defaultValue={this.props.clinicdes} onChange={this.handleChange} />
                  <Form.Control className="inputDes2" id="adress" style={{width:'250px'}} name="adress" defaultValue={this.props.clinicadress} onChange={this.handleChange} />
                </Form.Group>
              </div>
              <Button className="btnEditClinic" variant="outline-primary" type="submit" style={{margin:'10px 0px 0px 45%'}}>
                Update
              </Button>
            </Card.Body>
          </Form>
        </Card>
        </div>


        <div className="doctorListDiv" id="docs" style={{display:'block',margin:'550px 0px 0px -50px'}}>
        <Card id="doctorlist">
          <h3 id="doctorheader">Doctors</h3>
          <Card.Img src={doctor} style={{height:'80px',width:'80px',padding:'20px'}}></Card.Img>
          <DoctorList/>
        </Card>
        </div>


        <div className="priceListDiv" id="prices" style={{display:'block',margin:'0px 0px 0px 250px'}}>
        <Card id="pricelist">
          <img src = {price} style={{width:'70px',height:'70px',margin:'0px 0px 0px 45%'}} id="slikamoney"></img>
          <h3 id="header">Pricelist</h3>
          <Pricelist/>
        </Card>
        </div>

      </div>
    )
  }
}

export default withRouter(ClinicPage);
