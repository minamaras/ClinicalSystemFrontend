import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'

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

        this.addPredefinedAppointment = this.addPredefinedAppointment.bind(this);

        this.state = {
            show: false,
            duration: '',
            doctor: '',
            room: '',
            type: '',
            examTime: '10:00',

            examDate: date,
        };

        console.log(this.props.tipovi);
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
                                <select id="doctors" name="doctors" className="form-control form-control-sm" required>
                                    <option value="CSHARP">.NET Core 2.1</option>
                                    <option value="PYTHON">Python 3</option>
                                    <option value="NODE">node.js 11</option>
                                    <option value="GO">Go</option>
                                </select>
                                <br/>
                                <label htmlFor="examDate">Date</label>
                                <br/>
                                <DatePicker id="examDate" name="examDate" onChange={this.onChange} value={this.state.examDate}/>
                                <br/>
                                <br/>
                                <label htmlFor="examTime">Time</label>
                                <br/>
                                <TimePicker id="examTime" name="examTime" onChange={this.onChangeTime} value={this.state.examTime}/>
                                <br/>
                                <br/>
                                <label htmlFor="room">Room</label>
                                <select id="doctors" name="doctors" className="form-control form-control-sm" required>
                                    <option value="CSHARP">.NET Core 2.1</option>
                                    <option value="PYTHON">Python 3</option>
                                    <option value="NODE">node.js 11</option>
                                    <option value="GO">Go</option>
                                </select>
                                <br/>
                                <label htmlFor="type">Exam type</label>
                                <select id="doctors" name="doctors" className="form-control form-control-sm" required>
                                    <option value="CSHARP">.NET Core 2.1</option>
                                    <option value="PYTHON">Python 3</option>
                                    <option value="NODE">node.js 11</option>
                                    <option value="GO">Go</option>
                                </select>
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

export default AddPredefinedAppointment;
