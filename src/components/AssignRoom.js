import React from 'react';
import { Modal, Button, Card, InputGroup, FormControl } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import { Route, withRouter, Switch, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';

const moment = require('moment');

const Alert = withReactContent(Swal)
const ErrorSearch = withReactContent(Swal)

class AssignRoom extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelectChange = this.handleSelectChange.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeResultFiltering = this.handleChangeResultFiltering.bind(this);
        this.filterRooms = this.filterRooms.bind(this);

        this.state = {
            rooms: [],
            filtered: [],
            select: undefined,
            startDate: new Date(),
            filter: '',
            startingrooms: [],
            exams: [],
            dateString: ''
        }


        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        var exams = [];
        var roomsTemp = [];

        axios.get("http://localhost:8081/api/rooms/allrooms", options).then(

            (resp) => {
                resp.data.map((room, index) => {

                    if (room.examTypeName.toLowerCase().includes(this.props.match.params.exam.toLowerCase())) {

                        var strint = room.start.toString().substring(0, 2);
                        var time = parseInt(strint);

                        var strinte = room.end.toString().substring(0, 2);
                        var minutesend = room.end.toString().substring(3, 5);
                        var minutesendnumber = parseInt(minutesend);


                        console.log(minutesend);
                        var timeend = parseInt(strinte);
                        var dur = parseInt(room.examType.duration);



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



                        var self = this;
                        var actualhours = [];

                        room.appointments.forEach(function (appointment) {

                            console.log(appointment.startTime);
                            hours.forEach(function (term) {


                                if (appointment.date == self.props.match.params.date && appointment.startTime == term &&
                                    (appointment.status == 'SHEDULED' || appointment.status == 'HAPPENING' || appointment.classification == 'PREDIFINED')) {

                                    console.log(appointment);
                                    console.log(appointment.status);
                                    console.log(appointment.time);

                                    events.push(term);
                                    hours.splice(hours.indexOf(term), 1);

                                }

                            });


                        });


                        roomsTemp.push({ events: events, exam: room.examType, id: room.number, name: room.name, appointments: room.appointments, start: room.start, end: room.end, hours: hours });
                    }

                });

                this.setState({
                    rooms: roomsTemp,
                    startingrooms: roomsTemp,
                });
                console.log(this.state.rooms);

            },
            (resp) => this.onErrorHandler(resp));

    }

    handleChangeResultFiltering(e) {

        this.setState({ ...this.state, [e.target.name]: e.target.value });

        if (e.target != undefined) {
            console.log(e.target.value);
        }

        console.log(this.state.select);
        console.log(this.state.rooms);

        if (document.getElementsByName("filter")[0].value == '') {
            if (this.state.select == undefined || this.state.dateString == '') {
                console.log("thinks hes here");
                this.setState({
                    rooms: this.state.startingrooms,
                });
                return;
            } else {
                console.log("in gere");
                if (this.state.select != undefined && this.state.dateString != '') {
                    this.filterRooms();
                    return;
                }
            }
        }

        var resultingrooms = [];
        var roomName = [];
        var roomNumber = [];


        this.state.rooms.forEach(function (arrayItem) {

            if (arrayItem.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                roomName.push(arrayItem);
            }

            if (arrayItem.number.toString().startsWith(e.target.value)) {
                roomNumber.push(arrayItem);
            }


        });


        resultingrooms = roomNumber;

        roomName.forEach(function (arrayItem) {

            if (resultingrooms.some(x => x.id == arrayItem.id)) {
                return;
            } else {
                resultingrooms.push(arrayItem);
            }

        });


        roomNumber.forEach(function (arrayItem) {

            if (resultingrooms.some(x => x.id == arrayItem.id)) {
                return;
            } else {
                resultingrooms.push(arrayItem);
            }

        });


        this.setState({

            rooms: resultingrooms,

        });


    }


    filterRooms() {

        if (this.state.select == undefined || this.state.dateString == '') {

            ErrorSearch.fire({
                title: "You didnt enter date or you didn't select exam type so we can't filter.Please try again.",
                text: '',
                type: "error",
                button: true,
                icon: "error"
            });

            return;

        }


        var self = this;

        var returnRooms = [];

        console.log(this.state.dateString);

        this.state.startingrooms.forEach(function (room) {

            if (room.examTypeName == self.state.select) {

                console.log("same exam");

                var strint = room.start.toString().substring(0, 2);
                var time = parseInt(strint);

                var strinte = room.end.toString().substring(0, 2);
                var timeend = parseInt(strinte);

                var minutesend = room.end.toString().substring(3, 5);
                var minutesendnumber = parseInt(minutesend);

                var timeend = parseInt(strinte);
                var dur = parseInt(room.exam.duration);
                const hours = [];
                var duration = 0;
                var events = [];

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

                console.log("paased making terms");



                room.appointments.forEach(function (appointment) {
                    hours.forEach(function (term) {

                        if (appointment.date == self.state.dateString && appointment.startTime == term &&
                            (appointment.status == 'SHEDULED' || appointment.status == 'HAPPENING' || appointment.classification == 'PREDIFINED')) {

                            console.log(appointment);
                            console.log(appointment.status);
                            console.log(appointment.classification);
                            hours.splice(hours.indexOf(term), 1);
                            events.push(term);
                            console.log("thinks they are same");

                        }
                    });

                });

                returnRooms.push({ events: events, exam: room.examType, id: room.number, name: room.name, appointments: room.appointments, start: room.start, end: room.end, hours: hours });

            }

        });


        this.setState({
            rooms: returnRooms
        });

    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    handleChangeDate = date => {


        var dateString = date.toISOString().substring(0, 10);
        console.log(dateString);

        this.setState({
            startDate: date,
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


    render() {
        return (
            <Card className="assignCard" style={{ margin: "100px 0px 0px 300px", height: "500px", width: "600px" }}>
                <Card.Body>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm" onClick={this.handleChangeResultFiltering}>Name or number</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                    <br></br>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangeDate}
                        value={this.state.inputValue}
                        name="startDate"
                        className="datepickerClinicProfile"
                        minDate={moment().toDate()}


                    />

                    <br></br>

                    <Select
                        options={
                            this.state.exams.map((type, i) => {
                                return { id: i, value: type, label: type };
                            })
                        }
                        onChange={this.handleSelectChange}
                        value={this.state.select}
                        className="type"
                        required
                        placeholder="Select exam type"
                    />

                    <Button className="buttonForFiltering" variant="light" onClick={this.filterRooms}>Filter</Button>
                    <br />
                </Card.Body>



            </Card>
        )
    }



} export default withRouter(AssignRoom);