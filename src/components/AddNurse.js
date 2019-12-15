import React from 'react';
import ReactDOM from 'react-dom';
//import '../css/DoctorPage.css';
import { Modal, Button } from "react-bootstrap";
//import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'

const NurseCreatedAlert = withReactContent(Swal)

class AddNurse extends React.Component{

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.addNurse = this.addNurse.bind(this);

        this.state = {
            show: false,
            name: '',
            lastname: '',
            email: '',
            password: '',
            repeat: ''

        };
    }

    addNurse(event) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

    if(this.state.password === this.state.repeat){
         axios.post("http://localhost:8081/api/nurses/addnurse", this.state, options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
            
         );
    } else {
        NurseCreatedAlert.fire({
            title: "Repeated password does not match!",
            text: '',
            type: "error",
            button: true
          });
    }
    }

    onErrorHandler(resp) {
        NurseCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandler(resp) {

        NurseCreatedAlert.fire({
            title: "Nurse added successfully",
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
                <Button id="nurseadding" onClick={this.handleShow}>
                    Add Nurse
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
                            Add Nurse
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addNurse} id="addNurseForm">
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
                                <label htmlFor="password">Repeat Password</label>
                                <input type="password"
                                    name="repeat"
                                    className="form-control form-control-sm"
                                    onChange={this.handleChange}
                                    placeholder="Enter repeated password"
                                    required
                                />
                                <br/>
                                
                            </div>
                            <hr/>
                            <Button className="dugmad" variant="secondary" style={{float: "right"}} onClick={this.handleClose}>Close</Button>
                            <Button type="submit" variant="success" style={{float: "right", margin: "0px 10px 0px 0px" }} >Create</Button>
                            
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }


}

export default AddNurse;