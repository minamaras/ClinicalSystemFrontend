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
            svgIconPath="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            svgIconViewBox="0 0 32 29.6"
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
            svgIconPath="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            svgIconViewBox="0 0 32 29.6"
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
