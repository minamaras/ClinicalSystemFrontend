import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import '../css/MakeAnotherAppointment.css'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');

class MakeAnotherAppointment extends React.Component {

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            inputdate: new Date(),
            dateString: '',
            inputValue: '',
            doctor: ''

        }

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        console.log(this.props);

        var normalDate =this.state.inputdate.toISOString().substring(0,10);
        console.log(normalDate);

        axios.get("http://localhost:8081/api/appointments/getcurrent",options).then(
          (resp) => {
            this.changeState(resp)},
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

    handleChange = date => {

        var dateString =date.toISOString().substring(0,10);
        console.log(dateString);
        this.setState({inputdate: date, inputValue: dateString});
    }


    render() {
        return (
            <Card id="newApp">
                <Card.Title>New appointment or operation</Card.Title>
                <Card.Body>
                    <label htmlFor="start">Date</label>
                    <br />
                    <DatePicker
                        selected={this.state.inputdate}
                        onChange={this.handleChange}
                        value={this.state.inputValue}
                        name="startDate"
                        className="datepickerClinicProfile"
                        minDate={moment().toDate()}

                    />

                    <br />


                    <Button id="opButton">Operation</Button>
                    <Button id="examButton">Exam</Button>
                </Card.Body>
            </Card>
        )
    }

} export default withRouter(MakeAnotherAppointment);