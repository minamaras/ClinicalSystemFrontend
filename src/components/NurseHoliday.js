import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/NurseHoliday.css'
import {SingleDatePicker} from 'react-dates';

const HolidayAlert = withReactContent(Swal)
const options = ['Holiday', 'Absence']

class NurseHoliday extends React.Component{
    constructor(props){
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        this.handleChange = this.handleChange.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            type: options[0],
            reason: '',
            start: null,
            end: null,

            today: date,
        }


    }

    handleSelect(eventKey, event) {
        event.preventDefault();

        this.setState({ type: options[eventKey] });
      }


    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }


    createRequest(event) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

         axios.post(`http://localhost:8081/api/holiday/makerequest`, this.state, options).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onSuccessHandler(resp) {
            //console.log(this.state)
            HolidayAlert.fire({
                title: "Request created successfully",
                text: "",
                type: "success",
            });

            //this.setState({ redirect: this.state.redirect === false });
            window.location.href = "http://localhost:3000/"
        }

    onErrorHandler(resp) {
        HolidayAlert.fire({
            title: "Request with the same start date already exists!",
            text: '',
            type: "error",
            button: true
          });

    }



    render() {
        return(
            <div className="holidayContainer">
                <Form className="formCard" onSubmit={this.createRequest}>

                    <h2 className="holidayTitle">Make a request</h2>
                    <Form.Row>
                        <Form.Label className="chooseLabel">Choose type: </Form.Label>
                    <DropdownButton
                        title={this.state.type}
                        id="document-type"
                        variant="info"
                        onSelect={this.handleSelect.bind(this)}
                    >
                        {options.map((opt, i) => (
                        <Dropdown.Item key={i} eventKey={i}>
                            {opt}
                        </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    </Form.Row>

                    <Form.Row className="rowScnd">
                        <Form.Label className="chooseLabel">Start date: </Form.Label>
                        <input className="startDate" type="date"
                        //value = {this.state.start}
                        min = {this.state.today}
                        pattern = "dd/mm/yyyy"
                        id="start"
                        name="start"
                        onChange={this.handleChange}
                        required
                        />
                        <Form.Label className="chooseLabel">End date: </Form.Label>
                        <input className="startDate" type="date"
                        min = {this.state.start}
                        id="end"
                        name="end"
                        onChange={this.handleChange}
                        required />
                    </Form.Row>

                    <Form.Row className="rowScnd">
                        <Form.Label className="chooseLabel">Reason: </Form.Label>
                        <textarea className="reasonTxt"
                        id="reason"
                        name="reason"
                        onChange={this.handleChange} />
                    </Form.Row>
                    <Form.Row>
                        <Button type="submit" className="dugme1" variant="outline-dark" >Submit</Button>
                    </Form.Row>
                </Form>
            </div>

        )
    }
}

export default withRouter(NurseHoliday)
