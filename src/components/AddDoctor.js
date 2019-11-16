import React from 'react';
import ReactDOM from 'react-dom';
import '../css/DoctorPage.css';
import { Modal, Button } from "react-bootstrap";
//import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const DoctorCreatedAlert = withReactContent(Swal)

class AddDoctor extends React.Component {

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
                <Button id="doctoradding" onClick={this.handleShow}>
                    Add a Doctor
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
                            Add a Doctor
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="addDoctorForm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    name="newDoctor"
                                    placeholder="Enter name"
                                    required
                                />
                                <br/>
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="lastname"
                                    name="newDoctor"
                                    placeholder="Enter lastname"
                                    required
                                />
                                <br/>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    name="newDoctor"
                                    placeholder="Enter email"
                                    required
                                />
                                <br/>
                                <label htmlFor="specialization">Specialization</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="specialization"
                                    name="newDoctor"
                                    placeholder="Enter specialization"
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

export default AddDoctor;