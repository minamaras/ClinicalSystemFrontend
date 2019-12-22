import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withRouter } from 'react-router-dom';

const localizer = momentLocalizer(moment);

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

  render() {
    return (
      <div>
          <br />
        <div style={{ height: '450pt'}}>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MyCalendar);
