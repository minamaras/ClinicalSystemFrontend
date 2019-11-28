import React from 'react';
import ReactDOM from 'react-dom';
import '../css/DoctorPage.css';
import { Modal, Button } from "react-bootstrap";
//import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'

const DoctorCreatedAlert = withReactContent(Swal)

class AddDoctor extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.addDoctor = this.addDoctor.bind(this);

        this.state = {
            show: false,
            name: '',
            lastname: '',
            email: '',
            password: '',
            specialization: '',
            rating: ''
        };
    }

    addDoctor(event) {
        event.preventDefault();

        // var name = document.getElementById("name");
        // var lastname = document.getElementById("lastname");
        // var email = document.getElementById("email");
        // var password = document.getElementById("password");
        // var specialization = document.getElementById("specialization");
        // var rating = document.getElementById("rating");

        // var formData = new FormData();

        // formData.append('Name', name);
        // formData.append('Lastname', lastname);
        // formData.append('Email', email);
        // formData.append('Password', password);
        // formData.append('Specialization', specialization);
        // formData.append('Rating', rating);
        // const obj = {'name': this.state.name}

         axios.post("http://localhost:8081/api/doctors/saveDoctor", this.state).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
        /*try {
            const response = await axios.post("http://localhost:8081/api/clinicadmin/saveDoctor", this.state);
            const doktor = response.data;
        } catch(err) {
            this.onErrorHandler(err);
        }*/
    }

    onErrorHandler(resp) {
        DoctorCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandler(resp) {

        DoctorCreatedAlert.fire({
            title: "Doctor added successfully",
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
                        <form onSubmit={this.addDoctor} id="addDoctorForm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    name="name"
                                    // name="newDoctor"
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
                                <label htmlFor="specialization">Specialization</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="specialization"
                                    name="specialization"
                                    onChange={this.handleChange}
                                    placeholder="Enter specialization"
                                    required
                                />
                                <br/>
                                <label htmlFor="rating">Rating</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="rating"
                                    name="rating"
                                    onChange={this.handleChange}
                                    placeholder="Enter rating"
                                    required
                                />
                                <br/>
                            </div>
                            <hr/>
                            <Button type="submit" className="dugmad">Create</Button>
                            <Button className="dugmad" onClick={this.handleClose}>Close</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default AddDoctor;
