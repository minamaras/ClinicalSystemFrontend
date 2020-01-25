import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/en-gb';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router-dom';


const localizer = momentLocalizer(moment);

const myEventsList = []

class MyCalendar extends React.Component {
  constructor() {
    
    super();

    
    const now = new Date();
    const events = [
      {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 1)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
      
    ]
    this.state = {
      name: 'React',
      events
    };
    
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
          <br />
        <div style={{ height: '450pt', margin: '50px 0 0 0'}}>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MyCalendar);
