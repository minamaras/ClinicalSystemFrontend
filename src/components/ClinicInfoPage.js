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
import StarRatings from 'react-star-ratings';


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
        <Card className="ManageClinicProfileCard" id="karticaKlinika" style={{padding:'15px'}}>
        <div style={{margin:'0px 0px 0px 41%'}}>
        <StarRatings
          rating={this.props.user.adminsCliniRating}
          starRatedColor="blue"
          numberOfStars={5}
          name='rating'
          starHoverColor ='rgb(52, 174, 235)'
          isAggregateRating= 'true'
          starRatedColor= 'rgb(55, 146, 191)'
          starDimension='25px'
          svgIconPath="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"
          svgIconViewBox="0 0 20 20"
        />
        </div>
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
              <Button className="btnEditClinic" variant="outline-primary" type="submit" style={{margin:'10px 0px 10px 45%'}}>
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
