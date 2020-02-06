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
import '../css/AssignRoomOperation.css'
import 'moment/locale/en-gb';
const localizer = momentLocalizer(moment)

const ErrorSearch = withReactContent(Swal)

class CalendarOperationRooms extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createEvents = this.createEvents.bind(this);

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


    componentDidMount(){
        this.createEvents();
    }


    renderTermsOtherVersion() {

        //var events = [];
        //var step = 180;

       // console.log(this.state.events);

       // var events = this.createEvents();
       // var apreqs = this.createAppointmentRequestEvents();

        console.log(this.props)
        var min;
        var max; 
        var dayyy;

        if(this.props.dayDate === undefined){
            dayyy = this.props.start;
            min = new Date(parseInt(dayyy.substring(0, 4)), parseInt(dayyy.substring(5, 7)), parseInt(dayyy.substring(8, 11)), 8, 0, 0);
            max = new Date(parseInt(dayyy.substring(0, 4)), parseInt(dayyy.substring(5, 7)), parseInt(dayyy.substring(8, 11)), 20, 0, 0);

            //new Date(parseInt(resp.data.start.substring(0, 4)), parseInt(resp.data.start.substring(5, 7)) - 1, parseInt(resp.data.start.substring(8, 11)) + 1,0,0,0);

        }else if (this.props.dayDate !== '' || this.props.dayDate !== undefined) {
            console.log('iz kalendara:' + this.props.dayDate)
            min = new Date(parseInt(this.props.dayDate.substring(0, 4)), parseInt(this.props.dayDate.substring(5, 7))-1, parseInt(this.props.dayDate.substring(8, 11)), 8, 0, 0);
            max = new Date(parseInt(this.props.dayDate.substring(0, 4)), parseInt(this.props.dayDate.substring(5, 7))-1, parseInt(this.props.dayDate.substring(8, 11)), 20, 0, 0);
            //console.log(min)
        }

            console.log(min)
            return (
                <div>
                    <BigCalendar
                        localizer={localizer}
                        events={this.state.events}
                        timeslots={1}
                        step={120}
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



    handleSlotSelect(slotInfo) {
/*

        let token = localStorage.getItem('token');
        const options = {
             headers: { 'Authorization': 'Bearer ' + token}
        };
*/
        var finalDate = new Date(parseInt(slotInfo.start.toISOString().substring(0, 4)), parseInt(slotInfo.start.toISOString().substring(5, 7))-1, parseInt(slotInfo.start.toISOString().substring(8, 11))+1,0,0,0);
        //finalDate.setMinutes( finalDate.getMinutes() + finalDate.getTimezoneOffset() );
        //console.log(finalDate)
        
        //var dateString = slotInfo.start.getTimezoneOffset().toISOString().substring(0,10);
        var dateString = finalDate.toISOString().substring(0,10);
      var timeStart = slotInfo.start.toTimeString().split(' ')[0]

      //console.log(dateString);
      console.log(slotInfo.start.toTimeString().split(' ')[0]);


      //console.log(this.props);
      let roomnumber = this.props.number;

      ErrorSearch.fire({
          title: "Are you sure you want reserve room "+roomnumber+ " at date " + dateString + " and time "+timeStart+"?",
          text: '',
          type: "error",
          button: true,
          icon: "info",
          //showCancelButton: true,
          confirmButtonText:"Yes",
          //closeOnCancel: true
      }).then((isOk) => {

        if(isOk){
            window.location.href=`/operation/doctors/${this.props.id}/${dateString}/${timeStart}/${roomnumber}`;

        } else {
          window.location.href="/operationrequests"
        }
        })
      
}

    customEventPropGetter(event){
        //console.log(event)
  
        if(event.title.includes('Operation request')){
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


      createEvents(){

        var appointEvents = []
    
        this.props.operationReq.map((operation, index) => {
          if(!operation.scheduled){
            return;
          }
    
          var splitedstart = operation.startTime.split(':');
          var splitedend = operation.endTime.split(':');
          var spliteddate = operation.start.split('-')
         // var numapp = index + 1;
          var beginApp = new Date(spliteddate[0],spliteddate[1]-1,spliteddate[2],splitedstart[0],splitedstart[1],splitedstart[2]);
          var endApp = new Date(spliteddate[0],spliteddate[1]-1,spliteddate[2],splitedend[0],splitedend[1],splitedend[2]);
          
          
          appointEvents.push({
            title: operation.name,
            startDate: beginApp,
            endDate: endApp,
            allDay: false,
            resource: operation.id, 
        
          });
      
        })

        this.setState({
            events: appointEvents,
        })
        
        console.log(this.state.events);
    }        





    render() {
        
        return (
            <div>
                <Button className="clndrBtn" variant="outline-info" onClick={this.handleShow}>
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
                    {this.props.dayDate != null && <p style={{float:'right'}}>{(this.props.dayDate.substring(8, 11))}.{parseInt(this.props.dayDate.substring(5, 7))}.{ parseInt(this.props.dayDate.substring(0, 4))}.</p>}
                    <p>Select on a term to reserve it.</p>
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

export default CalendarOperationRooms;