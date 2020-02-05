import React from 'react'
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import usericon from '../icons/user.svg';
import '../css/RegistrationTable.css';
import EMailRejection from './EmailRejection';
import DeclineHolidayRequest from './DeclineHolidayRequest';
import sad from '../icons/sad.svg';


import '../css/HolidayRequests.css'
const moment = require('moment');

const Alert = withReactContent(Swal)

class PatientAppointmentRequestsTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);

    }


    renderTableData() {
    return this.props.content.map((request, index) => {
        console.log(request);
        var examStart = request.startTime.substring(0,5);
        var examEnd = request.endTime.substring(0,5);

        let datum = moment(request.start);
        let formatDate =datum.format().toString().substring(0,10);

        const { starttime, endtime, date, id } = request

        return (
            <Card key={id} className="cardContainerHoliday" >

                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >Appointment request</Card.Title>
                    <Card.Text className='cardText'>

                           Date: {formatDate}
                           <br/>
                           Time: {examStart + " - " + examEnd}

                    </Card.Text>
                    <Button id="acceptBtnH" onClick={this.acceptRequest.bind(this, request)}>Accept</Button>
                    <Button id="declineH" onClick={this.declineRequest.bind(this, request)}>Decline</Button>
                    {/*<div className="declineBtn">
                        <DeclineHolidayRequest id={email} />
        </div>*/}

                </Card.Body>
            </Card>
        )

    })
}

declineRequest = (request) => {

  let token = localStorage.getItem('token');
  const options = {
      headers: { 'Authorization': 'Bearer ' + token}
  };


  axios.post("http://localhost:8081/api/appointments/declinerequesttoappointment",request,options).then(
      (resp) =>{

        Alert.fire({
            title: "",
            text: "Request declined!",
            type: "success",
            button: true,
            icon: "success",
          })

          this.setState({ redirect: this.state.redirect === false });
          window.location.reload();

      },
      (resp) => {

        Alert.fire({
            title: "Error",
            text: "",
            type: "success",
            button: true,
            icon: "error",
          })

      }
  );

}


acceptRequest = (request) => {


  let token = localStorage.getItem('token');
  const options = {
      headers: { 'Authorization': 'Bearer ' + token}
  };

  axios.post("http://localhost:8081/api/appointments/saverequesttoappointment",request,options).then(
      (resp) =>{

        Alert.fire({
            title: "",
            text: "Request accepted!",
            type: "success",
            button: true,
            icon: "success",
          })

          window.location.reload();


      },
      (resp) => {

        Alert.fire({
            title: "Error",
            text: "",
            type: "success",
            button: true,
            icon: "error",
          })

      }
  );




}


    render() {

          return (
            <div className="containerRenderCards">
                {this.renderTableData()}
            </div>
        )
      }






}

export default PatientAppointmentRequestsTable
