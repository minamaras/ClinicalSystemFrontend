import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import 'react-table-6/react-table.css';
import '../css/AppointmentRequestTable.css'
import AssignRoom from './AssignRoom';
const moment = require('moment');
//var ReactTable = require('react-table-6').default;

class AppointmentReqTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }

        this.renderTableData = this.renderTableData.bind(this);
        this.checkAvailableRooms = this.checkAvailableRooms.bind(this);



    }

    checkAvailableRooms(appointment) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        var date = appointment.start.toString().substring(0,10);

        var dateandtimeS = new Date(parseInt(appointment.date.substring(0,4)),parseInt(appointment.date.substring(6,8))-1,parseInt(appointment.date.substring(9,11)),parseInt(appointment.startTime.substring(0,2)),parseInt(appointment.startTime.substring(3,5)),0);
        var dateandtimeE = new Date(parseInt(appointment.date.substring(0,4)),parseInt(appointment.date.substring(6,8))-1,parseInt(appointment.date.substring(9,11)),parseInt(appointment.endTime.substring(0,2)),parseInt(appointment.endTime.substring(3,5)),0);


        var objekat = {startTime:dateandtimeS.getTime(),endTime:dateandtimeE.getTime(),id:appointment.id,date: appointment.date,
        examTypeName: appointment.examTypeName,name:appointment.name,doctorid:appointment.doctorid,
        doctorEmail:appointment.doctorEmail,start:appointment.start};

        console.log(appointment);
        axios.post("http://localhost:8081/api/appointmentrequest/check",objekat, options).then(
            (resp) => this.onSuccessHandlerRoom(resp),
            (resp) => this.onErrorHandler(resp)
        );
    }

    onSuccessHandlerRoom(resp) {

        var temprooms = [];

        console.log(resp.data);

        for (var i = 0; i < resp.data.length; i++) {
            temprooms.push(resp.data[i]);
        }

        this.setState({
            rooms : temprooms,
        });

        console.log(this.state.rooms);

    }



    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }







    renderTableData() {
        console.log(this.props.content);

      return this.props.content.map((r, index) => {
          console.log(r);

          return (
              <Card key={r.doctorEmail} className="cardAppReq" >
              <Card.Title className="cardTitleKlinikaSve"></Card.Title>


                  <Card.Body className = "cardBodyKlinikaSve">

                      <Card.Text className='cardTextKlinikaSve'>
                            <label><b>Exam type: </b></label> &nbsp;
                            <label style={{'text-transform':'capitalize'}} >{r.examTypeName}</label>
                            <br/>
                            <label><b> Date: </b></label>&nbsp;
                            <label>{r.date}</label>
                            <br/>
                            <label><b> Doctor: </b></label>&nbsp;
                            <label>{r.doctorEmail}</label>
                            <br/>
                            <label><b> Duration: </b></label> &nbsp;
                            <label>{r.startTime + "-" + r.endTime}</label>
                            <br/>


                      </Card.Text>
                      <AssignRoom app = {r}/>
                     <Button id="checkbtn" style={{top:'30px'}} onClick={ () => this.checkAvailableRooms(r) }>Check for available rooms</Button>
                     <br/>


                  </Card.Body>
              </Card>
              )
          })
      }

    render() {
        return (
            <div className="containerRenderCards">
                {this.renderTableData()}
            </div>
        )
    }
} export default AppointmentReqTable;
