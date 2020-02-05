import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navigate, Views } from 'react-big-calendar'
import { momentLocalizer } from 'react-big-calendar'
const localizer = momentLocalizer(moment)

const ErrorSearch = withReactContent(Swal)

class ShowRoomCalendar extends React.Component {

    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createEvents = this.createEvents.bind(this);
        this.renderTermsOtherVersion = this.renderTermsOtherVersion.bind(this);
        this.handleSlotSelect = this.handleSlotSelect.bind(this);
        this.customEventPropGetter = this.customEventPropGetter.bind(this);
        this.createAppointmentRequestEvents = this.createAppointmentRequestEvents.bind(this);



        this.state = {
            show: false,
            events : [],

        };


    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    renderTermsOtherVersion() {

        var events = [];
        var step;
        if (this.props.room.type !== undefined) {
            step = this.props.room.type.duration;
        } else {
            step = 30;
        }

        console.log(this.state.events);

        var events = this.createEvents();
        var apreqs = this.createAppointmentRequestEvents();


        if (this.props.date != '' || this.props.date != undefined) {

            var min = new Date(parseInt(this.props.date.substring(0, 4)), parseInt(this.props.date.substring(5, 7)) - 1, parseInt(this.props.date.substring(8, 11)), 8, 0, 0);
            var max = new Date(parseInt(this.props.date.substring(0, 4)), parseInt(this.props.date.substring(5, 7)) - 1, parseInt(this.props.date.substring(8, 11)), 20, 0, 0);

            return (
                <div>
                    <BigCalendar
                        localizer={localizer}
                        events={apreqs.concat(events)}
                        timeslots={1}
                        step={this.props.room.type.duration}
                        view='day'
                        views={['day']}
                        defaultView='day'
                        defaultDate={min}
                        toolbar={false}
                        selectable={true}
                        min={min}
                        max={max}
                        startAccessor="startDate"
                        endAccessor="endDate"
                        eventPropGetter= {this.customEventPropGetter}
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

    handleSlotSelect(slotInfo) {


        let token = localStorage.getItem('token');
        const options = {
             headers: { 'Authorization': 'Bearer ' + token}
        };

    var dateString = slotInfo.start.toISOString().substring(0,10);

      var datetext = slotInfo.start.toTimeString().split(' ')[0]
      var h = slotInfo.start.getHours();
      var m = slotInfo.start.getMinutes();
      var time = h + ":" + m;
      var endtime = slotInfo.end.getHours() + ":" + slotInfo.end.getMinutes() + ":00";

      console.log(endtime);
      console.log(datetext);
      console.log(dateString);

      console.log(slotInfo);

      console.log(this.props.room.id);

        axios.post(`http://localhost:8081/api/appointmentrequest/updateappointmentrequest/${this.props.room.id}/${dateString}/${datetext}/${endtime}`, this.props.request, options).then(
            (resp) => {

                console.log(resp.data);
                let doctor = this.props.request.doctorEmail;
                let patient = this.props.request.id;

                window.location.href=`http://localhost:3000/roomrequest/${doctor}/${dateString}/${datetext}/${endtime}/${patient}`;

                this.setState({
                    rooms: resp.data,
                });

                console.log(this.state.rooms)
                //this.someFunction();
            },
            (resp) => { alert('greska sobe') }

        )

    }

    createEvents() {

        var roomevents = [];

        console.log(this.props.date.substring(0, 4));
        console.log(this.props.date.substring(5, 7));
        console.log(this.props.date.substring(8, 11));


        this.props.room.events.map((term, index) => {

            var end = moment(term, "HH:mm:ss")
                .add(parseInt(this.props.room.type.duration), 'minutes').format("HH:mm:ss");

            var begin = new Date(parseInt(this.props.date.substring(0, 4)), parseInt(this.props.date.substring(5, 7)) - 1, parseInt(this.props.date.substring(8, 11)), parseInt(term.toString().substring(0, 2)), parseInt(term.toString().substring(3, 5)), 0);
            var end = new Date(parseInt(this.props.date.substring(0, 4)), parseInt(this.props.date.substring(5, 7)) - 1, parseInt(this.props.date.substring(8, 11)), parseInt(end.toString().substring(0, 2)), parseInt(end.toString().substring(3, 5)), 0);


            roomevents.push({
                title: 'Appointment',
                startDate: new Date(parseInt(this.props.date.substring(0, 4)), parseInt(this.props.date.substring(5, 7)) - 1, parseInt(this.props.date.substring(8, 11)), parseInt(term.toString().substring(0, 2)), parseInt(term.toString().substring(3, 5)), 0),
                endDate: end,
                allDay: false,
            });


        });


        return roomevents;
    }



createAppointmentRequestEvents(){

var roomapreqs = [];

  if(this.props.room.appointmentRequests !== undefined)
  {
    this.props.room.appointmentRequests.map((apreq, index) => {

      var startsplit = apreq.startTime.toString().split(':');
      var endsplit = apreq.endTime.toString().split(':');

      var begin = new Date(parseInt(this.props.date.substring(0, 4)), parseInt(this.props.date.substring(5, 7)) - 1, parseInt(this.props.date.substring(8, 11)),parseInt(startsplit[0]),parseInt(startsplit[1]),0);
      var end = new Date(parseInt(this.props.date.substring(0, 4)), parseInt(this.props.date.substring(5, 7)) - 1, parseInt(this.props.date.substring(8, 11)),parseInt(endsplit[0]),parseInt(endsplit[1]),0);


      roomapreqs.push({
          title: 'Appointment request',
          startDate: begin,
          endDate: end,
          allDay: false,
      });


  });
}


return roomapreqs;
}

    customEventPropGetter(event){
      //console.log(event)

      if(event.title.includes('Appointment request')){
        return {
          style: {
            backgroundColor: '#4f4f4f',
          },
        }
      } else {
          return {
            style: {
              backgroundColor: '#82c2e0',
              color: 'black',
            }
          }

        }
    }



    render() {
        return (
            <div>
                <Button id="showingtermsbutton" onClick={this.handleShow} variant="link">
                    Room calendar
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered="true"

                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Room terms
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="avaliableTerms">
                            {this.renderTermsOtherVersion()}
                        </div>
                        <br />

                        <Button className="closetermsbutton" variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default (ShowRoomCalendar);