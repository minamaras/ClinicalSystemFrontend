import React from "react";
import axios from 'axios';
import { Form, Card, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import '../css/ClinicProfile.css'


class PatientInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            lastname: '',
            socialSecurityNumber: '',
            email: ''
        }

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        axios.get(`http://localhost:8081/api/patients/aboutpatient/${this.props.match.params.id}`, options).then(
            (resp) => { this.changeState(resp) },
            (resp) => this.onErrorHandler(resp),
        );
    }

    onSuccessHandler(resp) {

        this.changeState(resp);
    }


    changeState = (resp) => {

        console.log(resp);

        this.setState({
            name: resp.data.name,
            lastname: resp.data.lastname,
            socialSecurityNumber: resp.data.socialSecurityNumber,
            email: resp.data.email
        });

        console.log(this.state);
    }


    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    render() {
        return (
            <Card className="text-center-clinic" id="patientinfo">
                <Form className="clinicInfo">
                    <Card.Body>
                        <h1 className="clinicHeader">Patient's info</h1>
                        <br />
                        <b><h3 className="clinicTitle">{this.state.name} {this.state.lastname}</h3></b>
                        <br />
                        <Form.Row>
                        </Form.Row>
                        <div className="clinicCol">
                            <Form.Group className="firstColClinic" >
                                <p className="valueNameClinic"><b>SS number:</b> {this.state.socialSecurityNumber}</p>
                                <p className="valueNameClinic"><b>Email:</b> {this.state.email}</p>
                            </Form.Group>
                        </div>
                    </Card.Body>
                </Form>

                <Button id="startExam">Start Exam</Button>
                <Button id="viewMR">View medical record</Button>
            </Card>
        );
    }
}

export default withRouter(PatientInfo);
