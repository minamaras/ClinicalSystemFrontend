import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import Routes from './Router';
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/ClinicAdminForm.css';
import axios from 'axios'

const ClinicAdminCreatedAlert = withReactContent(Swal)

class ClinicAdminForm extends React.Component{
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addClinicAdmin = this.addClinicAdmin.bind(this);


        this.state = {
            show: false,
            name: '',
            lasname: '',
            email: '',
            password: ''
        };
    }

    addClinicAdmin(event) {
        event.preventDefault();


         axios.post("http://localhost:8081/api/clinicalcentreadmins/addclinicaladmin", this.state).then(
             (resp) => this.onSuccessHandlerClinicAdmin(resp),
             (resp) => this.onErrorHandlerClinicAdmin(resp)
         );

    }

    onErrorHandlerClinicAdmin(resp) {
        ClinicAdminCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandlerClinicAdmin(resp) {

        ClinicAdminCreatedAlert.fire({
            title: "Clinic admin added successfully",
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
                <Button id="clinicadminadding" onClick={this.handleShow}>
                    Add Clinic Admin
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
                            Add Clinic Admin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addClinicAdmin} id="addClinicAdminForm">
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
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="lastname"
                                    name="lastname"
                                    onChange={this.handleChange}
                                    placeholder="Enter lastname"
                                    required
                                />
                                <br/>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    placeholder="Enter email"
                                    required
                                />
                                <br/>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    placeholder="Enter password"
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

export default ClinicAdminForm;