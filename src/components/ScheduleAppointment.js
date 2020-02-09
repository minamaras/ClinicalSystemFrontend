import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown,Card ,ListGroup} from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/ScheduleAppointment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import idea from '../icons/idea.svg';
import office from '../icons/doctoroffice.gif';



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

              document.getElementById("requestbutton").style.display="none";
              //document.getElementById("time").remove();
              //document.getElementById("date").remove();
              //document.getElementById("price").remove();
              document.getElementById("list").style.display = "none"
              document.getElementById("labelftersending").style.display = "block";
              document.getElementById("labelftersending").style.margin = "0px 0px 0px 0px";

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

              <div>
              <Card style={{width:'55%',marginLeft:'0%'}}>
              <Card.Img src={office} style={{height:'330px',width:'auto'}}></Card.Img>
              </Card>
              <Card style={{width:'93%',height:'230px',marginLeft:'0%',marginTop:'3%',outline:'none',
                border:'none',backgroundColor:'aliceblue'}}>
              <Card.Body>
              <Card.Img src={idea} style={{height:'40px',width:'40px'}}></Card.Img>
              <br/>
              <label style={{marginTop:'20px'}}>
              You found a term that works for you and works for our clinic staff. Great!
              Now all that it's left to do is to send a request for this appointment. By clicking
              on the button "Make a request for this appointment" your request will be sent to admin of this clinic.
              After admin has reviewed your request, you will get an email.
              </label>
              </Card.Body>
              </Card>
              <Card  style={{width:'400px',textAling:'center',height:'330px',margin:'-595px 0px 0px 57%',textAling:'center'}}>
                  <Card.Body  style={{marginTop:'30px'}}>

                  <ListGroup variant="flush" style={{display:'block'}} id="list">

                      <ListGroup.Item id="date">Appointment date {this.props.match.params.date}</ListGroup.Item>

                      <ListGroup.Item id="time">Appointment time {this.props.match.params.term}</ListGroup.Item>

                      <ListGroup.Item id="price">Appointment price {this.props.match.params.examprice}</ListGroup.Item>


                      <Button style={{marginTop:'30px',width:'350px'}} variant="outline-primary" id="requestbutton" onClick={this.sendRequest}>Make a request for this appointment</Button>

                      <label id="labelftersending" style={{display:'none'}}>
                      Great! Your request has been sent.
                      </label>

                  </ListGroup>

                </Card.Body>
              </Card>

              </div>


        )
    }
}

export default withRouter(ScheduleAppointment);
