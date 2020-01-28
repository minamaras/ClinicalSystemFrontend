import React from 'react';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';

const Alert = withReactContent(Swal)

class AssignRoom extends React.Component {

    constructor(props){
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            doctors: [],
            rooms: []
        }
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
                <Button id="doctoradding" onClick={this.handleShow}>
                    Edit Information
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
                            Edit Information
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="addDoctorForm">
                            
                            <Button className="dugmad" variant="secondary" className="dugme2dr" onClick={this.handleClose}>Close</Button>
                            <Button type="submit" variant="success" className="dugme1dr">Update</Button>

                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

} export default AssignRoom;