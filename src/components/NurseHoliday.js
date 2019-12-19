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

        this.handleChange = this.handleChange.bind(this);
        this.createRequest = this.createRequest.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            type: options[0],
            reason: '',
            start: null,
            end: null
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

         axios.post(`http://localhost:8081/api/holiday/makerequest/${this.props.id}`, this.state, options).then(
             console.log(this.props.id),
             (resp) => this.onSuccessHandlerClinicAdmin(resp),
             (resp) => this.onErrorHandlerClinicAdmin(resp)
         );
    }

    onErrorHandlerClinicAdmin(resp) {
        HolidayAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandlerClinicAdmin(resp) {

        HolidayAlert.fire({
            title: "Request created successfully",
            text: "",
            type: "success",
          });

        this.setState({ redirect: this.state.redirect === false });
        window.location.href = "http://localhost:3000/"
    }


    render() {
        return(
            <div className="holidayContainer">
                <Form className="formCard" onClick={this.createRequest}>

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
                        id="start"
                        name="start"
                        onChange={this.handleChange}
                        required                       
                        />
                        <Form.Label className="chooseLabel">End date: </Form.Label>
                        <input className="startDate" type="date" 
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