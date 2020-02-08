import React from 'react';
import { Modal, Button, Card, InputGroup, FormControl } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import { Route, withRouter, Switch, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ShowRoomCalendar from './ShowRoomCalendar';
import RenderRooms from './RenderRooms';
import '../css/AssignRoom.css';
import tipicon from '../icons/lamp.svg'
const moment = require('moment');



const Alert = withReactContent(Swal)
const ErrorSearch = withReactContent(Swal)

class AssignRoom extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.FindRoom = this.FindRoom.bind(this);




        this.state = {
                apRequest:'',
                inputparam:'',
                inputdate :  new Date(),
                dateString: '',
                rooms:[],
                currentRooms:[],

        }

        var normaldate = this.state.inputdate.toISOString().substring(0,10);

        this.setState({
            dateString : normaldate,
        });

    }

    componentDidMount(){

        let token = localStorage.getItem('token');
        const options = {
             headers: { 'Authorization': 'Bearer ' + token}
        };




      axios.get(`http://localhost:8081/api/appointmentrequest/getone/${this.props.match.params.id}`,options).then(
          (resp) => {
            console.log(resp.data);

              this.setState({
                  apRequest : resp.data,
              });
          },
          (resp) =>{alert('greska')},
        );


        axios.get(`http://localhost:8081/api/rooms/clinicsrooms/${this.props.user.clinic}`,options).then(
            (resp) => {
                this.someFunction(resp);
            },
            (resp) =>{alert('greska sobe')},
          );


    }

    someFunction(resp){
        console.log(this.state.rooms);


        var self =this;

       var returnRooms = [];

       resp.data.forEach(function (room) {

               const hours = [];
               const events =[];


               var duration=0;
               var dur = parseInt(room.examType.duration);


               for(let hour = 8; hour <= 20; hour++) {

                 if(hour == 20 && duration == 0){

                   hours.push(
                       moment({
                           hour,
                           minute: duration
                       }).format('HH:mm:ss')
                   );
                   break;
                 }

                 hours.push(
                     moment({
                         hour,
                         minute: duration
                     }).format('HH:mm:ss')
                 );

                   duration = duration+dur;

                   if(duration >= 60){
                     duration = duration%60;
                   }else {
                     hour=hour-1;
                   }


               }



               returnRooms.push({appointmentRequests:room.appointmentRequests,id:room.id,appointments:room.appointments,events:events,hours:hours,name:room.name,number:room.number,type:room.examType});

         });


         this.setState({
           rooms : returnRooms,
       })

    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});


    }

    FindRoom(){

        console.log(this.state);


        var self = this;
        var returnrooms = [];

        if( self.state.dateString !== '' && self.state.inputparam !== '')

       {
           this.state.rooms.forEach(function (room) {
               console.log(room);


            var roomevents = [];

           if(room.name == self.state.inputparam || room.number == self.state.inputparam){

            {
                console.log("same number or name");

                if(room.type.name == self.state.apRequest.examTypeName)

            {
                console.log("same exam");
                if(room.appointments !==  undefined){
                  room.appointments.forEach(function (appointment) {
                    console.log("has appointments");


                  if(appointment.date == self.state.dateString){

                    console.log("has appointments that day");

                    roomevents.push(appointment.startTime);

                  }


              });
            }

            var appointmentRequests = [];

            if(room.appointmentRequests !==  undefined){
              room.appointmentRequests.forEach(function (appointmentR) {

              if(appointmentR.date == self.state.dateString){

                appointmentRequests.push({startTime:appointmentR.startTime,endTime:appointmentR.endTime});

              }

          });
        }

              returnrooms.push({appointmentRequests:appointmentRequests,id: room.id, events:roomevents,hours:room.hours,name:room.name,number:room.number,type:room.type});

             }
           }
        }
      });


    }

    this.setState({

        rooms: returnrooms,
    });
}

    handleChangeDate = date => {


        var dateString =date.toISOString().substring(0,10);
        console.log(dateString);

         this.setState({
            inputdate: date,
           dateString:dateString,

         });


     }




    render() {

        var self = this;

          return (
            <div className="pozadinica" >
              <div className="assignInfo">
            <img style={{height:'55px', width: 'auto'}} src={tipicon} className="tipIcon" />
          <p>Enter room name or number, select the wanted date and click on the find button to view all avaliable rooms for the provided date.</p>
          </div>
                <div className="containerForFilters">
               <input placeholder="Enter room name or number" onChange={this.handleChange} name="inputparam" className="inputfiled"></input>

               <DatePicker
                 selected={ this.state.inputdate}
                 onChange={this.handleChangeDate}
                 value= {this.state.inputValue}
                 name="datepicker"
                 className="datepicker"
                 minDate={moment().toDate()}
                style={{margin:'20px 0px 0px -10px'}}

               />

               <Button variant="light" onClick={this.FindRoom} className="findroombutton">Find room</Button>

                </div>

            <div className="sobice" style={{width:'auto',height:'auto'}}>
                <RenderRooms rooms={self.state.rooms} date={self.state.dateString} request={self.state.apRequest}/>
                </div>

            </div>

        )

    }



} export default withRouter(AssignRoom);
