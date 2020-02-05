import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import '../css/DoctorsTerms.css';
import { BrowserRouter as Router,Route,Link,withRouter} from "react-router-dom";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navigate, Views } from 'react-big-calendar'
import {  momentLocalizer } from 'react-big-calendar'
const localizer = momentLocalizer(moment)

const ErrorSearch = withReactContent(Swal)

class DoctorsTerms extends React.Component {

    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
        this.createEvents = this.createEvents.bind(this);
        this.renderTermsOtherVersion = this.renderTermsOtherVersion.bind(this);
        this.handleSlotSelect =this.handleSlotSelect.bind(this);


        this.state = {
            show: false,
            terms:[],
            doctorsevents:'',
        };


    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    renderTerms(){

      console.log(this.props.doctor);
      return this.props.doctor.hours.map((term, index) => {

        if(this.props.date != '' || this.props.date != undefined){
          if(typeof  this.props.doctor.exam === "object"){
            console.log("think he's an obect");
          return (

            <Link className="singleterm" to ={{pathname:`/appointment/${this.props.doctor.id}/${this.props.doctor.exam.name}/${this.props.doctor.exam.price}/${this.props.date}/${term}/`}}>
            [{term}] &nbsp;
            </Link>

    )

          }
        else{

          console.log("think he's a string");

          return (

            <Link className="singleterm" to ={{pathname:`/appointment/${this.props.doctor.id}/${this.props.doctor.exam}/${this.props.date}/${term}/`}}>
            [{term}] &nbsp;
            </Link>

    )



        }

      }


        });

    }


    handleSlotSelect(slotInfo) {
      var dateString = slotInfo.start.toISOString().substring(0,10);

      var datetext = slotInfo.start.toTimeString().split(' ')[0]
      var h = slotInfo.start.getHours();
      var m = slotInfo.start.getMinutes();
      var time = h + ":" + m;


      window.location.href=`http://localhost:3000/appointment/${this.props.doctor.id}/${this.props.doctor.exam.name}/${this.props.doctor.exam.price}/${dateString}/${datetext}/`;

    }





    renderTermsOtherVersion(){

        var events=this.createEvents(this.props.doctor)

        if(this.props.date != '' || this.props.date != undefined){
          if(typeof  this.props.doctor.exam === "object"){
            console.log("think he's an obect");
            console.log(this.props.doctor.exam.duration);

            var date = new Date(2020, 1, 2, 10, 0,0);
            console.log(date);

            var min= new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)), parseInt(this.props.doctor.start.toString().substring(0,2)),parseInt(this.props.doctor.start.toString().substring(3,5)), 0);
            var max = new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)), parseInt(this.props.doctor.end.toString().substring(0,2)),parseInt(this.props.doctor.end.toString().substring(3,5)), 0);

            console.log(min);
            console.log(max);
            console.log(events);

          return (
            <div>
            <BigCalendar
              localizer={localizer}
              events={events}
              timeslots={1}
              step={this.props.doctor.exam.duration}
              view='day'
              views={['day']}
              defaultView='day'
              defaultDate={new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)), parseInt(this.props.doctor.start.toString().substring(0,2)),parseInt(this.props.doctor.start.toString().substring(3,5)), 0)}
              toolbar={false}
              selectable={true}
              min= {new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)), parseInt(this.props.doctor.start.toString().substring(0,2)),parseInt(this.props.doctor.start.toString().substring(3,5)), 0)}
              max = {new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)), parseInt(this.props.doctor.end.toString().substring(0,2)),parseInt(this.props.doctor.end.toString().substring(3,5)), 0)}
              startAccessor="startDate"
              endAccessor="endDate"
              onSelectEvent={event =>

                ErrorSearch.fire({
                    title: "Not avaliable.",
                    text: '',
                    type: "error",
                    button: true,
                    icon: "error"
                  })
                }
                onSelectSlot={(slotInfo) =>
                  this.handleSlotSelect(slotInfo)
              }

            />
            </div>

            )

          }

      }


    }

    createEvents(doctor){

      var doctorsevents =[];
      console.log(this.props.date.substring(0,4));
      console.log(this.props.date.substring(5,7));
      console.log(this.props.date.substring(8,11));


      console.log(doctor);

      doctor.events.map((term, index) => {
        //12:40
        console.log(term);
        console.log(doctor);
        console.log(parseInt(doctor.exam.duration));

       var end = moment(term, "HH:mm:ss")
            .add(parseInt(doctor.exam.duration), 'minutes').format("HH:mm:ss");

          console.log(parseInt(end.toString().substring(0,2)));
          console.log(parseInt(end.toString().substring(3,5)));

            var begin = new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)), parseInt(term.toString().substring(0,2)),parseInt(term.toString().substring(3,5)), 0);
            var end= new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)),parseInt(end.toString().substring(0,2)),parseInt(end.toString().substring(3,5)), 0);

            console.log(begin);
            console.log(end);
            console.log(typeof(begin)== typeof(end));

    doctorsevents.push({
    title: 'Appointment'+' '+index+1,
    startDate: new Date(parseInt(this.props.date.substring(0,4)), parseInt(this.props.date.substring(5,7))-1, parseInt(this.props.date.substring(8,11)), parseInt(term.toString().substring(0,2)),parseInt(term.toString().substring(3,5)), 0),
    endDate: end,
    allDay: false,
  });


});
console.log(doctorsevents);
return doctorsevents;
}



    render() {
        return (
            <div>
                <Button id="showingtermsbutton"onClick={this.handleShow} variant="link">
                    Avaliable terms
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"

                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Avalibale terms
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="avaliableTerms">
                    <p>Found a term that works for you? Clicking on it leads you  to a page for scheduling an appointment with doctor <u style={{'text-transform':'capitalize'}}>{this.props.doctor.name} {this.props.doctor.lastname}</u> at choosen time</p>
                    &nbsp;
                    {this.renderTermsOtherVersion()}
                    </div>
                    <br/>

                    <Button className="closetermsbutton" variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default (DoctorsTerms);
