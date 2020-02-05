import React from "react";
import {Route, withRouter, Switch, Link } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/ScheduleAppointment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sad from '../icons/sad.svg'
import question from '../icons/upitnik.svg'


const RequestSent = withReactContent(Swal)

class DeclinedAppointmetRequest extends React.Component{
    constructor(props){
        super(props);



    }

    render() {
      console.log(this.props.user);

        return(

              <div style={{margin:'200px 0px 0px 0px',padding:'2px'}}>
              <Card style={{width:'auto',height:'300px',textAlign:'center',padding:'10px'}}>
              <Card.Title><h1 style={{color:'LightSteelBlue',marginTop:'10px'}}>You declined this appointment request.</h1></Card.Title>
                  <Card.Body>
                  <Card.Img src={sad} style={{width:'110px',height:'110px',marginTop:'30px'}}></Card.Img>
                  </Card.Body>
              </Card>
              <br/>
              <Card style={{margin:'20px 0px 0px 0px',height:'100px'}}>
              <Card.Body>
              <Card.Img src={question} style={{width:'70px',height:'70px',opacity:'0.8'}}></Card.Img>
              <label style={{margin:'0px 0px 0px 20px'}}>This appointment won't be scheduled because you choose to declined request our admin has sent.</label>
              </Card.Body>
              </Card>
              </div>


        )
    }
}

export default (DeclinedAppointmetRequest);
