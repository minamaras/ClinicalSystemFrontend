import React from 'react';
import { withRouter,Link } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/Exams.css';
import kalendar from '../icons/kalendar.svg';
import old from '../icons/old.svg';
import StarRatings from 'react-star-ratings';
import RateClinic from './RateClinic';

const PatientAlert = withReactContent(Swal)


class Exams extends React.Component{

  constructor(props) {
      super(props);

      this.renderUpcoming = this.renderUpcoming.bind(this);
      this.renderOld = this.renderOld.bind(this);
      this.checkRating = this.checkRating.bind(this);



      this.state={
        upcoming:[],
        old: []
      }

      }



componentDidMount () {

            let token = localStorage.getItem('token');
            const options = {
              headers: { 'Authorization': 'Bearer ' + token}
                  };

            axios.get('http://localhost:8081/api/appointments/all',options).then(
                      (resp) => {
                          this.setState({
                            upcoming:resp.data,
                          });},
                      (resp) => alert('greska'),);


            axios.get('http://localhost:8081/api/appointments/allold',options).then(
                    (resp) => {
                      this.setState({
                        old : resp.data,
                      })
                  },
                  (resp) => alert('greska'),
                  );
        }


renderUpcoming(){

  return this.state.upcoming.map((ap,index) => {
    console.log(ap);
    return (

      <Card className="cardContainerPregled" >


          <Card.Body className = "cardBodyPregled">

              <Card.Text className='cardTextPregled'>
                    <label><b>Appointment type:</b></label> &nbsp;
                    <label style={{'text-transform':'capitalize'}} >{ap.type.name}</label>
                    <br/>
                    <label><b> Appointment date : </b></label>&nbsp;
                    <label>{ap.date.toString()}</label>
                    <br/>
                    <label><b> Appointment time : </b></label>&nbsp;
                    <label>{ap.startTime}</label>
                    <br/>
                    <label><b> Appointment end time : </b></label>&nbsp;
                    <label>{ap.endTime}</label>
                    <br/>
                    <label><b> Appointment room : </b></label>&nbsp;
                    <label>{ap.roomNumber}</label>
                    <br/>

              </Card.Text>
              <div className="addKlinikaPregled">
              </div>


          </Card.Body>
      </Card>
    );

  });
}

renderOld(){
  console.log(this.state.old);
  var self = this;

  return self.state.old.map((ap,index) => {


    return (
      <Card className="cardContainerPregled" >
      <Card.Title className="cardTitlePregled"><b>{ap.name}</b></Card.Title>


          <Card.Body className = "cardBodyPregled">

              <Card.Text className='cardTextPregled'>
                    <label><b>Appointment type:</b></label> &nbsp;
                    <label style={{'text-transform':'capitalize'}} >{ap.type.name}</label>
                    <br/>
                    <label><b> Appointment date : </b></label>&nbsp;
                    <label>{ap.date}</label>
                    <br/>
                    <label><b> Appointment time : </b></label>&nbsp;
                    <label>{ap.startTime}</label>
                    <br/>
                    <label><b> Appointment end time : </b></label>&nbsp;
                    <label>{ap.endTime}</label>
                    <br/>

                    <label><b> Clinic : </b></label>&nbsp;
                    {ap.clinic.name}
                    {this.checkRatingClinic(ap.clinic)}
                    <br/>
                    <label><b> Appointment room : </b></label>&nbsp;
                    <label>{ap.roomNumber}</label>
                    <br/>

                    <label><b> Doctor that did appointment : </b></label>&nbsp;
                    <label>{ap.doctor.name} {ap.doctor.lastname}</label>
                    <br/>

                    {this.checkRating(ap)}
              </Card.Text>
              <div className="addKlinikaPregled">
              </div>


          </Card.Body>
      </Card>
    );

  });
}


checkRatingClinic(clinic){

  if(clinic.rating !== undefined){
if(clinic.patients != undefined && this.props.user.ratedClinics != undefined)
{
  if(clinic.patients.some(x => x == this.props.user.email) == true &&
  (this.props.user.ratedClinics.find(x => x.name === clinic.name) == undefined)){

  return (<RateClinic clinic={clinic}/>);
}else{
  return (<div>
    Thank you for rating this clinic!
    </div>);
}


}
}
}




checkRating(ap){

  console.log(ap.doctor);

  var doctor='';

  let token = localStorage.getItem('token');
  const options = {
      headers: { 'Authorization': 'Bearer ' + token}
  };

        if(ap.doctor.rating !== undefined){
      if(ap.doctor.patients != undefined && this.props.user.ratedDoctors != undefined)
      {
        if(ap.doctor.patients.some(x => x == this.props.user.email) == true &&
        (this.props.user.ratedDoctors.find(x => x.email === ap.doctor.email) == undefined)){

        return (
          <div>
          Rate this doctor
          <br/>
          <StarRatings
            rating={ap.doctor.rating}
            starRatedColor="blue"
            numberOfStars={5}
            name='rating'
            svgIconPath="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"
            svgIconViewBox="0 0 20 20"
            changeRating={entry => {

              axios.get(`http://localhost:8081/api/doctors/updaterating/${ap.doctor.email}/${entry}`,options).then(
                  (resp) => {

                    this.setState({ redirect: this.state.redirect === false });
                    window.location.reload();

                   },
                  (resp) => alert('greska'),
                );

            }
            }
            starHoverColor ='rgb(52, 174, 235)'
            isAggregateRating= 'true'
            starRatedColor= 'rgb(55, 146, 191)'
            starDimension='30px'
          />
          </div>
        );
      } else {


        return (
          <div>
          Thank you for rating this doctor! <br/>
          This is doctor's current rating
          <StarRatings
            rating={ap.doctor.rating}
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
        );
      }

  }
}
}



render() {
  console.log(this.state.old);

    return (



        <Card className="velikakarticapozadina" >
        <Card className="upcomingexams" style={{margin:'20px 0px 0px 0px',width:'100%',height:'auto'}}>
        <Card.Header style={{ textAlign: 'center' }}>
        <Card.Title>Upcoming exams</Card.Title>
        <Card.Img src = {kalendar} style={{width:'70px',height:'70px'}}></Card.Img>
        </Card.Header>
        {this.renderUpcoming()}
        </Card>

        <Card className="oldexams" style={{margin:'20px 0px 0px 150px',width:'100%',height:'auto'}}>
        <Card.Header style={{ textAlign: 'center' }}>
        <Card.Title>Previous exams</Card.Title>
        <Card.Img src = {old} style={{width:'50px',height:'50px'}}></Card.Img>
        </Card.Header>
        {this.renderOld()}
        </Card>

        </Card>



    );


}





}


export default withRouter(Exams);
