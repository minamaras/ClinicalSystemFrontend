import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import '../css/AddClinicalCentreAdmin.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CCAdminCreatedAlert = withReactContent(Swal)


class AddClinicalCentreAdmin extends React.Component{
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addClinicalCentreAdmin = this.addClinicalCentreAdmin.bind(this);


        this.state = {
            show: false,
            name: '',
            lasname: '',
            email: '',
            password: '',
            repeat: ''
        };
    }

    addClinicalCentreAdmin(event) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
        if(this.state.password === this.state.repeat){
         axios.post("http://localhost:8081/api/clinicalcentreadmins/addccadmin", this.state, options).then(
             (resp) => this.onSuccessHandlerccAdmin(resp),
             (resp) => this.onErrorHandlerccAdmin(resp)
         );
        } else {
            CCAdminCreatedAlert.fire({
                title: "Repeated password does not match!",
                text: '',
                type: "error",
                button: true
              });
        }

    }

    onErrorHandlerccAdmin(resp) {
        CCAdminCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandlerccAdmin(resp) {

        CCAdminCreatedAlert.fire({
            title: "Clinical centre admin added successfully",
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
                <Button id="ccadminadding" onClick={this.handleShow}>
                    Add Clinical Centre Admin
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
                        Add Clinical Centre Admin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addClinicalCentreAdmin} id="addClinicalCentreAdminForm">
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
                                <label htmlFor="specialization">Password</label>
                                <input type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    placeholder="Enter password"
                                    required
                                />
                                <br/>
                                <label htmlFor="specialization">Repeat Password</label>
                                <input type="password"
                                    className="form-control form-control-sm"
                                    name="repeat"
                                    onChange={this.handleChange}
                                    placeholder="Enter repeated password"
                                    required
                                />
                                <br/>
                            </div>
                            <hr/>
                            <Button className="dugme2" onClick={this.handleClose} variant="secondary">Close</Button>
                            <Button type="submit" className="dugme1" variant="success">Create</Button>
                            
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }


}

export default AddClinicalCentreAdmin
