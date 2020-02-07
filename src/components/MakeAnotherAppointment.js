import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Card, Button, Dropdown } from 'react-bootstrap';
import '../css/MakeAnotherAppointment.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DoctorsTerms from './DoctorsTerms'
import { UncontrolledDropdown } from 'reactstrap';
import DoctorDaily from './DoctorDaily';
import Select from 'react-select';
import "react-select/dist/react-select.css";
const moment = require('moment');

class MakeAnotherAppointment extends React.Component {

    constructor(props) {

        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
        this.calculateTerms = this.calculateTerms.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleChange= this.handleChange.bind(this);


        this.state = {
            doctor: '',
            selectedDate: new Date(),
            dateString: '',
            startingdoctors: [],
            isClicked: false,
            opapp: '',
            select: undefined,
            name: '',
            options: [
                { value: 'operation', label: 'Operation' },
                { value: 'exam', label: 'Exam' },
            ]

        }



        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        console.log(this.props);


        axios.get("http://localhost:8081/api/appointments/getcurrent", options).then(
            (resp) => {
                console.log(resp.data)

                var self = this;
                var doctorstemp = []
                var exams = [];

                var strint = resp.data.start.toString().substring(0, 2);
                var time = parseInt(strint);

                var strinte = resp.data.end.toString().substring(0, 2);
                var minutesend = resp.data.end.toString().substring(3, 5);
                var minutesendnumber = parseInt(minutesend);


                console.log(minutesend);
                var timeend = parseInt(strinte);
                var dur = parseInt(resp.data.examType.duration);



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

                var godisnji = 0;

                if (resp.data.holidays.lenght !== 0) {

                    resp.data.holidays.forEach(function (holiday) {


                        var stringdate = holiday.fromto.split("-");
                        var wanteddate = self.state.dateString.split("-");
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


                if (godisnji == 0) {
                    doctorstemp.push({ godisnji: godisnji, appointments: resp.data.appointments, holidays: resp.data.holidays, events: events, exam: resp.data.examType, id: resp.data.id, name: resp.data.name, lastname: resp.data.lastname, rating: resp.data.rating, start: resp.data.start, end: resp.data.end, hours: hours });
                }

                this.setState({
                    doctor: doctorstemp[0],
                });
                console.log(doctorstemp);

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

    handleSelectChange = entry => {

        var self = this;


        if (entry == null) {
            this.setState({
                select: undefined,
            });
        }

        else {

            this.setState({ select: entry.value });
        }
    }

    calculateTerms() {

        this.setState({
            isClicked: true,
        })

        var self = this;
        var doctorstemp = []
        var exams = [];

        if (self.state.dateString !== '') {
            var strint = this.state.doctor.start.toString().substring(0, 2);
            var time = parseInt(strint);

            var strinte = this.state.doctor.end.toString().substring(0, 2);
            var minutesend = this.state.doctor.end.toString().substring(3, 5);
            var minutesendnumber = parseInt(minutesend);


            console.log(minutesend);
            var timeend = parseInt(strinte);
            var dur = parseInt(this.state.doctor.exam.duration);



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
            var godisnji = 0;

            console.log(this.state);

            console.log(self.state.dateString);


            self.state.doctor.appointments.forEach(function (appointment) {

                console.log(appointment.date);
                /*let datum = moment(appointment.start);
                let formatDate =datum.format().toString().substring(0,10);
                appointment.start = formatDate;*/


                hours.forEach(function (term) {

                    if (appointment.date == self.state.dateString && appointment.startTime == term
                        && appointment.status !== 'HAS_HAPPEND') {

                        console.log("in if");
                        console.log(appointment);
                        console.log(appointment.status);
                        console.log(appointment.time);
                        events.push(term);
                        console.log(term);
                        hours.splice(hours.indexOf(term), 1);


                    }

                });
            });

            console.log(events);
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

            if (godisnji == 0) {

                doctorstemp.push({ holidays: this.state.doctor.holidays, events: events, gender: this.state.doctor.gender, exam: this.state.doctor.exam, id: this.state.doctor.id, name: this.state.doctor.name, lastname: this.state.doctor.lastname, rating: this.state.doctor.rating, appointments: this.state.doctor.appointments, start: this.state.doctor.start, end: this.state.doctor.end, hours: hours, godisnji: godisnji });
            }

            this.setState({
                doctor: doctorstemp[0],
            });
            console.log(doctorstemp);

        }

    }


    componentDidMount() {
        this.setState({

            isClicked: false,
        });
    }

    renderTerms() {
        console.log(this.state);


        if (this.state.doctor !== undefined && this.state.isClicked == true) {

            if (this.state.dateString != '') {

                if (this.state.doctor.godisnji == 0) {

                    return (<DoctorDaily doctor={this.state.doctor} date={this.state.dateString} user={this.props.user} patient={this.props.match.params.patientmail} selected={this.state.select} name={this.state.name} />);
                }
            }
        } else if (this.state.doctor === undefined) {
            return (<label>No avaliable terms for this date.</label>);
        } else {
            return;
        }


    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }


    render() {
        console.log(this.state);
        return (
            <Card id="newApp">
                <Card.Title style={{ textAlign: 'center' }}>New appointment or operation</Card.Title>
                <Card.Body>
                    <Select
                        className="selectoptions"
                        style={{ width: "70%", marginBottom: "10px" }}
                        onChange={this.handleSelectChange}
                        value={this.state.opapp.label}
                        options={this.state.options}
                    />

                    <label htmlFor="name">Name</label>
                    <input type="text"
                        className="form-control form-control-sm"
                        id="name"
                        name="name"
                        onChange={this.handleChange}
                        placeholder="Enter operation name"
                        required
                    />

                    <br />
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
                    <Button id="termId" onClick={this.calculateTerms}>Show Terms</Button>



                    {this.renderTerms()}
                </Card.Body>
            </Card>
        )
    }

} export default withRouter(MakeAnotherAppointment);
