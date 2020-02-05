import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import HolidayRequestsTable from './HolidayRequestsTable'
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import '../css/HolidayRequests.css'
import PatientAppointmentRequestsTable from './PatientAppointmentRequestsTable';
import sad from '../icons/sad.svg';


class ManageAppointmentRequest extends React.Component {

    constructor(props) {
        super(props);

        this.checkLenght = this.checkLenght.bind(this);


        this.state = {
            requests: []
        }

    }


    componentWillMount(){

      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get("http://localhost:8081/api/appointmentrequest/allmyexams",options).then(
          (resp) => this.onSuccessHandler(resp),
          (resp) => this.onErrorHandler(resp)
      );

    }


    checkLenght(){

      if(this.state.requests.lenght !== 0){

        return(<PatientAppointmentRequestsTable content = {this.state.requests}/>);
      }else {

        return(

          <div style={{margin:'200px 0px 0px 200px',width:'60%'}}>
          <Card>
          <Card.Body style={{textAlign:'center'}}>
          Currently no requests to review.
          <br/>
          <Card.Img src={sad} style={{height:'50px',width:'50px',margin:'20px 0px 0px 0px'}}></Card.Img>

          </Card.Body>
          </Card>
          </div>


        )
      }


    }

    onSuccessHandler(resp) {
        var tempRequests = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempRequests.push(resp.data[i]);
        }
        this.setState({
            requests: tempRequests
        });
    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    render() {
        return (
            <div className="container">
                <h1 id="manage">Requests for appointments</h1>
                <div className="row">

                    <div className="col-md-10">
                        <br />
                       {/*<HolidayRequestsTable content={this.state.requests} /> */}
                       {this.checkLenght()}
                    </div>
                </div>
            </div>
        );
    }

}
export default  withRouter(ManageAppointmentRequest);
