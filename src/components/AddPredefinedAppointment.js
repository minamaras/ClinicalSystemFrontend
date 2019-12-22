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
            duration: '',
            doctor: '',
            doctors: [],
            room: '',
            rooms: [],
            type: '',
            examtypes: [],
            examTime: '10:00',

            examDate: date,
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
            tempexams.push(resp.data[i].name);
            console.log(resp.data[i]);
            console.log(resp.data[i].name);
            console.log(tempexams);
        }
      
        this.setState({
            examtypes : tempexams,
        });
      
      
    }

    onSuccessHandlerDoctor(resp) {

        var tempdoctors = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            tempdoctors.push(resp.data[i].name);
            console.log(resp.data[i]);
            console.log(resp.data[i].name);
        }
      
        this.setState({
            doctors : tempdoctors,
        });
      
      
    }


    onSuccessHandlerRoom(resp) {

        var temprooms = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            temprooms.push(resp.data[i].name);
            console.log(resp.data[i]);
            console.log(resp.data[i].name);
        }
      
        this.setState({
            rooms : temprooms,
        });
      
      
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

         axios.post("http://localhost:8081/api/examtypes/addpredefined", this.state, options).then(
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
                                <label htmlFor="doctor">Doctor</label>
                                <DropdownButton
                                    title={this.state.doctor}
                                    id="document-type"
                                    variant="info"
                                    onSelect={this.handleSelectDoctor.bind(this)}
                                >
                                    {this.state.doctors.map((opt, i) => (
                                        <Dropdown.Item key={i} eventKey={i}>
                                            {opt}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                <br />
                                <label htmlFor="examDate">Date</label>
                                <br />
                                <DatePicker id="examDate" name="examDate" onChange={this.onChange} value={this.state.examDate} />
                                <br />
                                <br />
                                <label htmlFor="examTime">Time</label>
                                <br />
                                <TimePicker id="examTime" name="examTime" onChange={this.onChangeTime} value={this.state.examTime} />
                                <br />
                                <br />
                                <label htmlFor="room">Room</label>
                                <DropdownButton
                                    title={this.state.room}
                                    id="document-type"
                                    variant="info"
                                    onSelect={this.handleSelectRoom.bind(this)}
                                >
                                    {this.state.rooms.map((opt, i) => (
                                        <Dropdown.Item key={i} eventKey={i}>
                                            {opt}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                <br />
                                Select exam type :{" "}
                                <DropdownButton
                                    title={this.state.type}
                                    id="document-type"
                                    variant="info"
                                    onSelect={this.handleSelect.bind(this)}
                                >
                                    {this.state.examtypes.map((opt, i) => (
                                        <Dropdown.Item key={i} eventKey={i}>
                                            {opt}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
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
