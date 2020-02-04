import React from 'react'
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import usericon from '../icons/user.svg';
import '../css/RegistrationTable.css';
import EMailRejection from './EmailRejection';
import DeclineHolidayRequest from './DeclineHolidayRequest';

import '../css/HolidayRequests.css'
const moment = require('moment');

class PatientAppointmentRequestsTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }


    renderTableData() {
    return this.props.content.map((request, index) => {
        console.log(request);
        var examStart = request.startTime.substring(0,5);
        var examEnd = request.endTime.substring(0,5);

        let datum = moment(request.start);
        let formatDate =datum.format().toString().substring(0,10);

        const { starttime, endtime, date, id } = request
        
        return (
            <Card key={id} className="cardContainerHoliday" >
            
                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >Appointment request</Card.Title>
                    <Card.Text className='cardText'>

                           Date: {formatDate}
                           <br/>
                           Time: {examStart + " - " + examEnd}

                    </Card.Text>
                    <Button id="acceptBtnH">Accept</Button>
                    <Button id="declineH">Decline</Button>
                    {/*<div className="declineBtn">
                        <DeclineHolidayRequest id={email} />
        </div>*/}

                </Card.Body>
            </Card>
        )

    })
}

    render() {
        return (
            <div className="containerRenderCards">
                {this.renderTableData()}
            </div>
        )
    }




}

export default PatientAppointmentRequestsTable
