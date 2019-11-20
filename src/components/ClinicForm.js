import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import Routes from './Router';
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";
import '../css/ClinicForm.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'

const ClinicCreatedAlert = withReactContent(Swal)

class ClinicForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addClinic = this.addClinic.bind(this);


        this.state = {
            show: false,
            name: '',
            adress: '',
            description: ''
        };
    }

    addClinic(event) {
        event.preventDefault();


         axios.post("http://localhost:8081/api/clinicalcentreadmins/addclinic", this.state).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );

    }

    onErrorHandler(resp) {
        ClinicCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandler(resp) {

        ClinicCreatedAlert.fire({
            title: "Clinic added successfully",
            text: "",
            type: "success",
          });

        this.setState({ redirect: this.state.redirect === false });
        window.location.reload();
        this.handleClose();
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <Button id="clinicadding" onClick={this.handleShow}>
                    Add Clinic
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Clinic
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addClinic} id="addClinicForm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    name="name"
                                    onChange={this.handleChange}
                                    placeholder="Enter name"
                                    required
                                />
                                <br/>
                                <label htmlFor="lastname">Adress</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="adress"
                                    name="adress"
                                    onChange={this.handleChange}
                                    placeholder="Enter adress"
                                    required
                                />
                                <br/>
                                <label htmlFor="description">Description</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="description"
                                    name="description"
                                    onChange={this.handleChange}
                                    placeholder="Enter description"
                                    required
                                />
                                <br/>

                            </div>
                            <hr/>
                            <Button type="submit" className="dugme1">Create</Button>
                            <Button className="dugme2" onClick={this.handleClose}>Close</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
        
}

export default ClinicForm;