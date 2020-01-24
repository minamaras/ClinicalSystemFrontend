import React from 'react';
import ReactDOM from 'react-dom';
//import '../css/DoctorPage.css';
import { Modal, Button } from "react-bootstrap";
//import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'

const TypeCreatedAlert = withReactContent(Swal)

class AddExamType extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.addExamType = this.addExamType.bind(this);

        this.state = {
            show: false,
            name: '',
            price: '',
            duration: ''
        };
    }

    addExamType(event) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

         axios.post("http://localhost:8081/api/examtypes/savetype", this.state,options).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onErrorHandler(resp) {
        TypeCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandler(resp) {

        TypeCreatedAlert.fire({
            title: "Exam type added successfully",
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
                <Button id="examadding" onClick={this.handleShow}>
                    Add exam type
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
                            Add exam addExamType
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addExamType} id="addDoctorForm">
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
                                <input type="number"
                                    className="form-control form-control-sm"
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    placeholder="Enter price"
                                    required
                                />
                                <br/>
                                <input type="number"
                                    className="form-control form-control-sm"
                                    id="duration"
                                    name="duration"
                                    onChange={this.handleChange}
                                    placeholder="Enter duration in minutes"
                                    required
                                />
                                <br/>
                            </div>
                            <hr/>
                            <Button className="dugmad" variant="secondary" className="dugme2dr" onClick={this.handleClose}>Close</Button>
                            <Button type="submit" variant="success" className="dugme1dr">Create</Button>
                            
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default AddExamType;
