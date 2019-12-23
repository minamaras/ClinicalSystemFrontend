import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button,  DropdownButton,Dropdown} from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import Select from 'react-select';

const RoomCreatedAlert = withReactContent(Swal)

class AddPredefinedAppointment extends React.Component {

    constructor(props) {
        super(props);

        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.addPredefinedAppointment = this.addPredefinedAppointment.bind(this);

        this.state = {
            show: false,
            name: '',
            startTime: '',
            endTime: '',
            doctorEmail: '',
            doctors: [],
            roomNumber: '',
            rooms: [],
            start: null,
            examTypeName: '',
            examtypes: [],

            today: date,
        };

    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };

        axios.get('http://localhost:8081/api/examtypes/all', options).then(
            (resp) => this.onSuccessHandlerExam(resp),
            (resp) => this.onErrorHandlerExam(resp),
        );

        axios.get('http://localhost:8081/api/rooms/all', options).then(
            (resp) => this.onSuccessHandlerRoom(resp),
            (resp) => this.onErrorHandlerRoom(resp),
        );

        axios.get('http://localhost:8081/api/doctors/alldoctors', options).then(
            (resp) => this.onSuccessHandlerDoctor(resp),
            (resp) => this.onErrorHandlerDoctor(resp),
        );
    }

    onSuccessHandlerExam(resp) {

        var tempexams = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            tempexams.push(resp.data[i]);
        }
      
        this.setState({
            examtypes : tempexams,
        });
      
      
    }

    onSuccessHandlerDoctor(resp) {

        var tempdoctors = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            tempdoctors.push(resp.data[i]);
        }
      
        this.setState({
            doctors : tempdoctors,
        });
      
      
    }


    onSuccessHandlerRoom(resp) {

        var temprooms = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            temprooms.push(resp.data[i]);
        }
      
        this.setState({
            rooms : temprooms,
        });
      
        console.log(this.state.rooms);
      
    }


    onErrorHandlerExam(response) {
        alert("Error response: Uncovered case");
    }

    onErrorHandlerDoctor(response) {
        alert("Error response: Uncovered case");
    }

    onErrorHandlerRoom(response) {
        alert("Error response: Uncovered case");
    }

    onChange = (date) => this.setState({ examDate: date })
    onChangeTime = (time) => this.setState({examTime : time })

    addPredefinedAppointment(event) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        console.log(this.state);

         axios.post("http://localhost:8081/api/appointments/savepredefined", this.state, options).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onErrorHandler(resp) {
        RoomCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            icon: 'error',
            button: true
          });

    }

    onSuccessHandler(resp) {

        RoomCreatedAlert.fire({
            title: "OR added successfully",
            text: "",
            type: "success",
            icon: 'success'
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

    handleSelect(eventKey, event) {
        event.preventDefault();

        this.setState({ type: this.state.examtypes[eventKey] });
    }

    handleSelectDoctor(eventKey, event) {
        event.preventDefault();

        this.setState({ doctor: this.state.doctors[eventKey] });
    }

      handleSelectRoom(eventKey, event) {
        event.preventDefault();

        this.setState({ room: this.state.rooms[eventKey] });
    }

    render() {
        return (
            <div>
                <Button id="predefinedExam" onClick={this.handleShow}>
                    Add predefined
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
                            Add a predefined appointment
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addPredefinedAppointment} id="addDoctorForm">
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
                                <label htmlFor="doctor">Doctor</label>
                                <Select
                                    className="selectoptions"
                                    style={{ width: "25%", marginBottom: "40px" }}
                                    onChange={entry => {
                                        this.setState({ doctorEmail: entry.value });
                                    }
                                    }
                                    value={this.state.doctorEmail.value}
                                    options={

                                        this.state.doctors.map((type, i) => {
                                            return { value: type.email, label: type.email };
                                        })
                                    }
                                />
                                <br />
                                <label htmlFor="start">Date</label>
                                <input className="start" type="date"
                                    min={this.state.today}
                                    pattern="dd/mm/yyyy"
                                    id="start"
                                    name="start"
                                    onChange={this.handleChange}
                                    required
                                />
                                <br />
                                <label htmlFor="startTime">Start time:</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="startTime"
                                    name="startTime"
                                    onChange={this.handleChange}
                                    placeholder="Enter start hh:mm:ss"
                                    required
                                />
                                <br />
                                <label htmlFor="endTime">End time:</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="endTime"
                                    name="endTime"
                                    onChange={this.handleChange}
                                    placeholder="Enter end hh:mm:ss"
                                    required
                                />
                                <br />
                                <label htmlFor="roomNumber">Room</label>
                                <Select
                                    className="selectoptions"
                                    style={{ width: "25%", marginBottom: "40px" }}
                                    onChange={entry => {
                                        this.setState({ roomNumber: entry.value });
                                    }
                                    }
                                    value={this.state.roomNumber.value}
                                    options={

                                        this.state.rooms.map((type, i) => {
                                            return { value: type.number, label: type.number };
                                        })
                                    }
                                />
                                <br />
                                Select exam type :{" "}
                                <Select
                                    className="selectoptions"
                                    style={{ width: "25%", marginBottom: "40px" }}
                                    onChange={entry => {
                                        this.setState({ examTypeName: entry.value });
                                    }
                                    }
                                    value={this.state.examTypeName.value}
                                    options={

                                        this.state.examtypes.map((type, i) => {
                                            return { value: type.name, label: type.name };
                                        })
                                    }
                                />
                            </div>
                            <hr />
                            <Button className="roomDugme" variant="secondary" style={{ float: "right" }} onClick={this.handleClose}>Close</Button>
                            <Button type="submit" variant="success" style={{ float: "right", margin: "0px 10px 0px 0px" }} className="roomDugme">Add</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default AddPredefinedAppointment;
