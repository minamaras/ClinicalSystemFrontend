import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/ScheduleAppointment.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestSent = withReactContent(Swal)

class ScheduleAppointment extends React.Component{
    constructor(props){
        super(props);

        this.sendRequest = this.sendRequest.bind(this);

        this.state = {

          date:'',
          time:'',
          doctorid:'',
          exam:''
        }

    }

    componentDidMount(){


      this.setState({

        date: this.props.match.params.date,
        time : this.props.match.params.term,
        doctorid : this.props.match.params.id,
        exam : this.props.match.params.exam,
      });


    }

    sendRequest = event => {
       event.preventDefault();

       console.log(this.state);

       let token = localStorage.getItem('token');
       const options = {
           headers: { 'Authorization': 'Bearer ' + token}
       };


         if(this.props.match.params.date == '' || this.props.match.params.term == undefined || this.props.match.params.id == undefined
       || this.props.match.params.exam == undefined){



           RequestSent.fire({
               title: "error",
               text: '',
               type: "error",
               button: true
             });

          return;

         }

       var obj ={

          date: this.props.match.params.date,
          examTypeName : this.props.match.params.exam,
          startTime : this.props.match.params.term,
          doctorid: this.props.match.params.id,


       }

        axios.post('http://localhost:8081/api/appointmentrequest/saveappointmentrequest',obj,options).then(
          (resp) => {

            RequestSent.fire({
                title: "Request for appointment sent successfully",
                text: "You will get an email by the end of the day about acceptance/denial of your request.",
                type: 'success',
                icon: 'success'
              });

              document.getElementById("requestbutton").style.visibility = "hidden";
              document.getElementById("time").remove();
              document.getElementById("date").remove();
              document.getElementById("price").remove();
              document.getElementById("labelftersending").style.visibility = "visible";
              document.getElementById("labelftersending").style.margin = "-150px 0px 0px 0px";

        },
          (resp) =>{

            RequestSent.fire({
                title: "Request for appointment failed to send ",
                text: "Please try again",
                type: 'error',
                icon: 'error'
              });

          }
        );



    }


    render() {
      console.log(this.props.user);

        return(

              <div className="behind"style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
              <Card className="pregledCardContainer" style={{width:'370px',height:'330px',left:'100px',top:'50px',backgroundcolor: 'rgba(245, 245, 245, 0.4)!important'}}>
              <Card.Title className="pregledcardTitle"></Card.Title>


                  <Card.Body className = "pregledcardBody">
                  <Card.Text className='pregledcardText'>
                      <label className="appointmentdate" id="date"><b>Appointment date </b> {this.props.match.params.date}</label>
                      <br/>
                      <label className="appointmenttime" id="time"><b>Appointment time </b> {this.props.match.params.term}</label>
                      <br/>
                      <label className="appointmentprice" id="price"><b>Appointment price </b>{this.props.match.params.examprice}</label>
                      <br/>
                      <Button className="sendrequestbutton" variant="secondary" id="requestbutton" onClick={this.sendRequest}>Make a request for this appointment</Button>
                      <label id="labelftersending" style={{visibility:'hidden'}}>
                      Great! Your request for this appointment is sent to admin of the clinic. Soon you will get an email regarding your request.
                      </label>
                      </Card.Text>
                      <div className="pregledCardAdd">
                      </div>


                  </Card.Body>
              </Card>
              </div>


        )
    }
}

export default withRouter(ScheduleAppointment);
