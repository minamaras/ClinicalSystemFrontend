import 'moment/locale/en-gb';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import { withRouter } from 'react-router-dom';
import  BigCalendar, {momentLocalizer } from 'react-big-calendar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/MyCalendar.css'
import tipicon from '../icons/lamp.svg'
import React from 'react';

const PatientAlert = withReactContent(Swal);
const localizer = momentLocalizer(moment);

class MyCalendarNurse extends React.Component {

  

  constructor() {
    
    super();
  
  const now = new Date();

    this.state = {
      name: 'React',
      clinicName : '',
      nurseemail: '',
      events: [],
      appointments: [],
      holidays: [],
    };
    
  }


  componentDidMount(){
    
    let token = localStorage.getItem('token');
    const options = {
      headers: { 'Authorization': 'Bearer ' + token}
          };

    axios.get('http://localhost:8081/api/nurses/getdates',options).then(
              (resp) => this.onSuccessHandler(resp),
              (resp) => this.onErrorHandler(resp)
              );


  }

  onErrorHandler(resp) {
    PatientAlert.fire({
        title: "Error occured",
        text: '',
        type: "error",
        button: true
      });
  
  }

  onSuccessHandler(resp){
    console.log(resp);

    this.setState({
        clinicName : resp.data.clinicName,
        nurseemail : resp.data.nurseemail,
        appointments : resp.data.appointments,
        holidays : resp.data.holidays
    });

    this.createEvents();
    this.createHolidays();

  }



  createEvents(){
    var appointEvents = []

    this.state.appointments.map((app, index) => {
      if(app.classification !== "NORMAL"){
        return;
      }

      var splitedstart = app.startTime.split(':');
      var splitedend = app.endTime.split(':');
      var spliteddate = app.date.split('-')
     // var numapp = index + 1;
      var beginApp = new Date(spliteddate[0],spliteddate[1]-1,spliteddate[2],splitedstart[0],splitedstart[1],splitedstart[2]);
      var endApp = new Date(spliteddate[0],spliteddate[1]-1,spliteddate[2],splitedend[0],splitedend[1],splitedend[2]);


    appointEvents.push({
      title: app.examTypeName,
      startDate: beginApp,
      endDate: endApp,
      allDay: false,
      resource: app.id, 
  
    });

  })

  this.setState({
    events: this.state.events.concat(appointEvents)
})

  }



  createHolidays(){
    var holidayEvents = []
  
    this.state.holidays.map((holiday, index) => {
  
        if(holiday.holidayRequestStatus !== "ACCEPTED"){
            return;
        }

      var starth = holiday.startHoliday.split('-');
      var endh = holiday.endHoliday.split('-');
      //var numapp = index + 1;
  
      var beginH = new Date(starth[0],starth[1]-1,starth[2]);
      var endH = new Date(endh[0],endh[1]-1,endh[2]);
  
  
    holidayEvents.push({
      title: 'Holiday',
      startDate: beginH,
      endDate: endH,
      allDay: true,
  
    });
  })
  
  
  this.setState({
    events: this.state.events.concat(holidayEvents)
  })
  
  }


  customEventPropGetter(event){
    //console.log(event)
  
    if(event.title.includes('Holiday')){
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
          <br />
          <div className="calendarInfo">
            <img style={{height:'55px', width: 'auto'}} src={tipicon} className="tipIcon" />
          <p>You can start the appointment by clicking on it.</p>
          </div>

        <div  style={{ height: '470pt', margin: '40px 0 0 0'}} >
          
          <BigCalendar
            localizer={localizer}
            events={this.state.events}
            views={['month', 'week', 'day']}
            startAccessor="startDate"
            endAccessor="endDate"
            // min={this.state.startShift}
            //max={this.state.endShift}
            eventPropGetter={this.customEventPropGetter}
            // onSelectEvent={this.onSelectEvent}
          />
        </div>
      </div>
    );
  }

}


export default withRouter(MyCalendarNurse)