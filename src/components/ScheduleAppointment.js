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
              <Card className="pregledCardContainer" style={{width:'370px',height:'330px',left:'100px',top:'50px'}}>
              <Card.Title className="pregledcardTitle"></Card.Title>


                  <Card.Body className = "pregledcardBody">
                  <Card.Text className='pregledcardText'>
                      <label className="appointmentdate"><b>Appointment date </b> {this.props.match.params.date}</label>
                      <br/>
                      <label className="appointmenttime"><b>Appointment time </b> {this.props.match.params.term}</label>
                      <br/>
                      <label className="appointmentprice"><b>Appointment price </b>{this.props.match.params.examprice}</label>
                      <br/>
                      <Button className="sendrequestbutton" variant="secondary" onClick={this.sendRequest}>Make a request for this appointment</Button>
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
