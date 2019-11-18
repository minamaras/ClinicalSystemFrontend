import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Modal } from "react-bootstrap";
import Routes from './Router';
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";
import '../css/ClinicForm.css';


class ClinicForm extends React.Component {
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
            <Button id="clinicadding" onClick={this.handleShow}>
                Add a Clinic
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
                        Add a Clinic
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="addClinicForm">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="name"
                                name="newClinic"
                                placeholder="Enter name"
                                required
                            />
                            <br/>
                            <label htmlFor="adress">Adress</label>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="adress"
                                name="newClinic"
                                placeholder="Enter adress"
                                required
                            />
                            <br/>
                            <label htmlFor="description">Description</label>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="description"
                                name="newClinic"
                                placeholder="Enter description"
                                required
                            />
                            <br/>
                        </div>
                        <hr/>
                        <Button className="dugme1">Create</Button>
                        <Button className="dugme2" onClick={this.handleClose}>Close</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>

    );
}
        
}

export default ClinicForm