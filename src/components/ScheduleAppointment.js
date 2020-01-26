import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/ScheduleAppointment.css';


class ScheduleAppointment extends React.Component{
    constructor(props){
        super(props);

    }




    render() {
      console.log(this.props.user);
        return(


              <Card className="pregledCardContainer" style={{width:'700px',height:'300px',left:'200px',top:'100px'}}>
              <Card.Title className="pregledcardTitle"></Card.Title>


                  <Card.Body className = "pregledcardBody">
                  <Card.Text className='pregledcardText'>
                      <label><b>Appointment date </b> {this.props.match.params.date}</label>
                      <br/>
                      <label><b>Appointment time </b> {this.props.match.params.term}</label>
                      <br/>
                      <label><b>Appointment price </b></label>
                      <br/>
                      <button className="sendrequestbutton">Send request</button>
                      </Card.Text>
                      <div className="pregledCardAdd">
                      </div>


                  </Card.Body>
              </Card>


        )
    }
}

export default withRouter(ScheduleAppointment);
