import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'

const RoomCreatedAlert = withReactContent(Swal)

class AddOperationRoom extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.addRoom = this.addRoom.bind(this);

        this.state = {
            show: false,
            name: '',
            number: '',
            isReserved: ''
        };
    }

    addRoom(event) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

         axios.post("http://localhost:8081/api/rooms/add", this.state, options).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onErrorHandler(resp) {
        RoomCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandler(resp) {

        RoomCreatedAlert.fire({
            title: "OR added successfully",
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
                <Button id="roomadding" onClick={this.handleShow}>
                    Add a room
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
                            Add a room
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addRoom} id="addDoctorForm">
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
                                <label htmlFor="lastname">Number</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="number"
                                    name="number"
                                    onChange={this.handleChange}
                                    placeholder="Enter number"
                                    required
                                />
                                <br/>
                                <label htmlFor="isReserved">Reserve</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="isReserved"
                                    name="isReserved"
                                    onChange={this.handleChange}
                                    placeholder="Yes or No"
                                    required
                                />
                                <br/>
                            </div>
                            <hr/>
                            <Button className="roomDugme" variant = "secondary" style={{float: "right"}} onClick={this.handleClose}>Close</Button>
                            <Button type="submit" variant = "success" style={{float: "right", margin: "0px 10px 0px 0px" }} className="roomDugme">Add</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default AddOperationRoom;
