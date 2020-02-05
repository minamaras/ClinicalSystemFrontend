import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/ScheduleAppointment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestSent = withReactContent(Swal)

class SendEmailToPatinet extends React.Component{
    constructor(props){
        super(props);


        this.state = {

          date:'',
          starttime:'',
          endtime: '',
          doctorEmail:'',
          patient: ''
        }

    }


    render() {
      console.log(this.props.user);

        return(

              <div className="behind"style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
              <Card className="pregledCardContainer" style={{width:'250px',height:'150px',left:'100px',top:'50px',backgroundcolor: 'rgba(245, 245, 245, 0.4)!important'}}>
              <Card.Title className="pregledcardTitle"></Card.Title>


                  <Card.Body className = "pregledcardBody">
                  <Card.Text className='pregledcardText'>
                      <label style={{margin:'0px 0px 0px 0px'}}>
                      Great!You've sent the appointment request to the patient.</label>
                      </Card.Text>
                      <div className="pregledCardAdd">
                      </div>


                  </Card.Body>
              </Card>
              </div>


        )
    }
}

export default withRouter(SendEmailToPatinet);
