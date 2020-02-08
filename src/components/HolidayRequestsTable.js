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
import airplane from '../icons/airplane.gif';
import moment from 'moment';


class HolidayRequestsTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }


    renderTableData() {
    return this.props.content.map((request, index) => {
        const { start, end, email, password } = request

        let datumStart = moment(request.start);
          let formatDateS =datumStart.format().toString().substring(0,10);

        let datumEnd = moment(request.end);
          let formatDateE =datumEnd.format().toString().substring(0,10);

        return (
            <Card key={email.toString()} className="cardContainerHoliday"
            style={{height:'auto',width:'300px',topMargin:'-10px',backgroundColor:'Lavender'}} >
            <Card.Img src={airplane}></Card.Img>
                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >{email}</Card.Title>
                    <Card.Text className='cardText'>

                           Start date: {formatDateS}
                           <br/>
                            End date: {formatDateE}

                    </Card.Text>
                    <div style={{textAlign:'center'}}>
                    <Button  variant="outline-info" onClick={this.acceptRequest.bind(this, request)} >Accept</Button>
                    <Button style={{marginLeft:'30px'}} variant="outline-info" onClick={this.sendEmail.bind(this, request)} >Decline</Button>
                    </div>
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

    acceptRequest(request){

      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

        axios.post("http://localhost:8081/api/holiday/confirm", request,options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
          );
    }

    declineRequest(holiday) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        //console.log(doctor.email);

         axios.post("http://localhost:8081/api/holiday/decline", holiday, options).then(

             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    sendEmail(request){

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };


        axios.post("http://localhost:8081/api/holiday/decline", request, options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),

          );
    }


    onErrorHandler(resp) {
        alert("Error response: Uncovered case");
    }

    onSuccessHandler(resp){
        window.location.reload();
    }




}

export default HolidayRequestsTable
