import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import Routes from './Router';
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";
import '../css/ClinicAdminForm.css';

class ClinicAdminForm extends React.Component{
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <Button id="clinicadminadding" onClick={this.handleShow}>
                    Add a Clinic Admin
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
                            Add a Clinic Admin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="addClinicAdminForm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    name="newClinicAdmin"
                                    placeholder="Enter name"
                                    required
                                />
                                <br/>
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="lastname"
                                    name="newClinicAdmin"
                                    placeholder="Enter lastname"
                                    required
                                />
                                <br/>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    name="newClinicAdmin"
                                    placeholder="Enter email"
                                    required
                                />
                                <br/>
   
                            </div>
                            <hr/>
                            <Button className="dugmad">Create</Button>
                            <Button className="dugmad" onClick={this.handleClose}>Close</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }


}

export default ClinicAdminForm