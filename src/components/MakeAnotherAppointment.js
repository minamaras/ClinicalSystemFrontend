import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import '../css/MakeAnotherAppointment.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DoctorsTerms from './DoctorsTerms'
import { UncontrolledDropdown } from 'reactstrap';
const moment = require('moment');

class MakeAnotherAppointment extends React.Component {

    constructor(props) {

        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
        this.calculateTerms = this.calculateTerms.bind(this);

        this.state = {
            doctor: '',
            selectedDate: new Date(),
            dateString: '',
            doctors: [],
            startingdoctors: []

        }

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        console.log(this.props);

        
        axios.get("http://localhost:8081/api/appointments/getcurrent", options).then(
            (resp) => {
                this.changeState(resp);

            },
            (resp) => this.onErrorHandler(resp),
        );



    }

    onErrorHandler(response) {

        alert("Error response: Uncovered case");

    }

    changeState = (resp) => {

        this.setState({
            doctor: resp.data

        });

        console.log(this.state);

    }


    handleChangeDate = date => {


        var dateString = date.toISOString().substring(0, 10);
        console.log(dateString);

        this.setState({
            selectedDate: date,
            dateString: dateString,

        });

    }

    calculateTerms() {

        console.log(this.state.dateString);
        console.log(this.state.startingdoctors);
        
        

        var self = this;
        var doctorstemp = []
        var exams = [];

        if (self.state.dateString !== undefined) {
            var strint = this.state.doctor.start.toString().substring(0, 2);
            var time = parseInt(strint);

            var strinte = this.state.doctor.end.toString().substring(0, 2);
            var minutesend = this.state.doctor.end.toString().substring(3, 5);
            var minutesendnumber = parseInt(minutesend);


            console.log(minutesend);
            var timeend = parseInt(strinte);
            var dur = parseInt(this.state.doctor.examType.duration);



            const hours = [];
            const events = [];


            var duration = 0;


            for (let hour = time; hour <= timeend; hour++) {

                if (hour == timeend && duration == parseInt(minutesendnumber)) {

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

                duration = duration + dur;

                if (duration >= 60) {
                    duration = duration % 60;
                } else {
                    hour = hour - 1;
                }


            }



            
            var actualhours = [];

            var brojac = 0;
            var godisnji = 0;

            console.log(this.state);
            


            self.state.doctor.appointments.forEach(function (appointment) {

                /*let datum = moment(appointment.start);
                let formatDate =datum.format().toString().substring(0,10);
                appointment.start = formatDate;*/
      

                hours.forEach(function (term) {

                    if (appointment.date == self.state.dateString && appointment.startTime == term) {

                        console.log("in if");
                        console.log(appointment);
                        console.log(appointment.status);
                        console.log(appointment.time);
                        brojac = brojac + 1;

                        events.push(term);
                        hours.splice(hours.indexOf(term), 1);


                    }

                });
            });

            if (this.state.doctor.holidays.lenght !== 0) {

                this.state.doctor.holidays.forEach(function (holiday) {


                    var stringdate = holiday.fromto.split("-");
                    var wanteddate = self.props.match.params.date.split("-");
                    console.log(wanteddate);

                    var holidayEnd = new Date(stringdate[0], stringdate[1] - 1, parseInt(stringdate[2].substring(0, 2)), 0, 0, 0);
                    var holidayStart = new Date(stringdate[3], stringdate[4] - 1, parseInt(stringdate[5].substring(0, 2)), 0, 0, 0);
                    var wantedDate = new Date(wanteddate[0], wanteddate[1] - 1, wanteddate[2], 0, 0, 0);
                    //console.log(holidayStart);

                    console.log(holidayEnd)
                    console.log(holidayStart);
                    console.log(wantedDate);

                    if ((wantedDate == holidayStart) || (wantedDate == holidayEnd) || (holidayStart < wantedDate < holidayEnd)) {
                        godisnji = godisnji + 1;
                    }

                });

            }

            if (brojac == 0 && godisnji == 0) {

                doctorstemp.push({ holidays: this.state.doctor.holidays, events: events, gender: this.state.doctor.gender, exam: this.state.doctor.examType, id: this.state.doctor.id, name: this.state.doctor.name, lastname: this.state.doctor.lastname, rating: this.state.doctor.rating, appointments: this.state.doctor.appointments, start: this.state.doctor.start, end: this.state.doctor.end, hours: hours, godisnji: godisnji });
            }

        } else {
            return (
                <div>shah</div>
            )
        }

        this.setState({
            doctors: doctorstemp,
            startingdoctors: doctorstemp
          });
          console.log(doctorstemp);
          

    }

    renderTerms() {
        console.log(this.state);
        

        if (this.state.doctor  !== 0) {
            
            if (this.state.dateString != '') {
                console.log(this.state.startingdoctors[0])
                if (this.state.startingdoctors[0].godisnji == 0) {

                    return (<DoctorsTerms doctor={this.state.startingdoctors[0]} date={this.state.dateString} user={this.props.user} />);
                }
            }
        } else if (this.state.startingdoctors.length === 0) {
            return (<label>No avaliable terms for this date.</label>);
        } else {
            return;
        }


    }


    render() {
        console.log(this.state);
        return (
            <Card id="newApp">
                <Card.Title>New appointment or operation</Card.Title>
                <Card.Body>
                    <label htmlFor="start">Date</label>
                    <br />
                    <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.handleChangeDate}
                        value={this.state.inputValue}
                        name="startDate"
                        minDate={moment().toDate()}


                    />

                    <br />
                    <Button onClick={this.calculateTerms}>Show Terms</Button>

                    {this.renderTerms()}


                    <Button id="opButton">Operation</Button>
                    <Button id="examButton">Exam</Button>
                </Card.Body>
            </Card>
        )
    }

} export default withRouter(MakeAnotherAppointment);