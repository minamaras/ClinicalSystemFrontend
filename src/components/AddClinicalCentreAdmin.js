import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import '../css/AddClinicalCentreAdmin.css'


class AddClinicalCentreAdmin extends React.Component{
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
                <Button id="ccadminadding" onClick={this.handleShow}>
                    Add a Clinical Centre Admin
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
                        Add a Clinical Centre Admin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="addClinicalCentreAdminForm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    name="newClinicalCentreAdmin"
                                    placeholder="Enter name"
                                    required
                                />
                                <br/>
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="lastname"
                                    name="newClinicalCentreAdmin"
                                    placeholder="Enter lastname"
                                    required
                                />
                                <br/>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    name="newClinicalCentreAdmin"
                                    placeholder="Enter email"
                                    required
                                />
                                <br/>
                                <label htmlFor="specialization">Password</label>
                                <input type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    name="newClinicalCentreAdmin"
                                    placeholder="Enter password"
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

export default AddClinicalCentreAdmin
