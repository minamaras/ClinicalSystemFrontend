import React from 'react'
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import usericon from '../icons/user.svg';
import '../css/RegistrationTable.css';
import EMailRejection from './EmailRejection';
import DeclineHolidayRequest from './DeclineHolidayRequest';

class HolidayRequestsTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }


    renderTableData() {
    return this.props.content.map((request, index) => {
        const { start, end, email, password } = request

        return (
            <Card key={email.toString()} className="cardContainer" >
            <Card.Img style={{height:'130px', width: 'auto'}} className="userIcon" variant="top" src={usericon} alt="Unavailable icon" />
                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >{email}</Card.Title>
                    <Card.Text className='cardText'>

                           Start date: {start}
                           <br/>
                            End date: {end}

                    </Card.Text>
                    <Button className="acceptBtn" onClick={this.acceptRequest.bind(this, request)} variant="success">Accept</Button>
                    <div className="declineBtn">
                         <DeclineHolidayRequest id={email} />
                    </div>

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

        axios.post("http://localhost:8081/api/holidayrequests/confirmrequest", request,options).then(
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
