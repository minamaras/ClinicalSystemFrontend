import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button,  DropdownButton,Dropdown} from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import moment from 'moment';
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
            doctorEmail: '',
            doctors: [],
            roomNumber: '',
            rooms: [],
            examTypeName: '',
            examtypes: [],
            startTime: undefined,
            endTime: undefined,
            date:'',
            today: new Date(),
            type:''
        };

    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };


        axios.get('http://localhost:8081/api/rooms/all', options).then(
            (resp) => this.onSuccessHandlerRoom(resp),
            (resp) => this.onErrorHandlerRoom(resp),
        );

        axios.get('http://localhost:8081/api/doctors/alldoctors', options).then(
            (resp) => this.onSuccessHandlerDoctor(resp),
            (resp) => this.onErrorHandlerDoctor(resp),
        );
    }


    onSuccessHandlerDoctor(resp) {

        var tempdoctors = [];
        var tempexams = [];

        console.log(resp.data);

        for (var i = 0; i < resp.data.length; i++) {

            tempdoctors.push(resp.data[i]);

                if (tempexams.some(x=> x.name == resp.data[i].examType.name) == false){
                  tempexams.push(resp.data[i].examType);
                }
          }



        this.setState({
            doctors : tempdoctors,
            examtypes: tempexams,
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


    addPredefinedAppointment(event) {
        event.preventDefault();

        console.log(this.state);

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        var dateandtimeS = new Date(parseInt(this.state.date.substring(0,4)),parseInt(this.state.date.substring(6,8))-1,parseInt(this.state.date.substring(9,11)),parseInt(this.state.startTime.substring(0,2)),parseInt(this.state.startTime.substring(3,5)),0);
        var dateandtimeE = new Date(parseInt(this.state.date.substring(0,4)),parseInt(this.state.date.substring(6,8))-1,parseInt(this.state.date.substring(9,11)),parseInt(this.state.endTime.substring(0,2)),parseInt(this.state.endTime.substring(3,5)),0);

        console.log(dateandtimeS.getTime());
        console.log(dateandtimeE.getTime());
        var objekat = {examTypeName:this.state.examTypeName,doctorEmail:this.state.doctorEmail,
          roomNumber:this.state.roomNumber,name:this.state.name,date:this.state.date,
          type:this.state.type,startTime:dateandtimeS.getTime(),endTime:dateandtimeE.getTime()};

          console.log(objekat);


         axios.post("http://localhost:8081/api/appointments/savepredefined", objekat, options).then(
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
          console.log(resp);

    }

    onChangeTime = time => {
      this.setState({ startTime: time});

    }

    onSuccessHandler(resp) {

        RoomCreatedAlert.fire({
            title: "Predefined appointment added successfully",
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
                                <br/>
                                <label htmlFor="doctor">Doctor</label>
                                <Select
                                    className="selectoptions"
                                    style={{ width: "25%", marginBottom: "10px" }}
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

                                <label htmlFor="start">Date</label>
                                  <br/>
                                <input className="start" type="date"
                                    min={this.state.today}
                                    pattern="dd/mm/yyyy"
                                    id="start"
                                    name="date"
                                    onChange={this.handleChange}
                                    required
                                    style={{marginTop:'2px'}}

                                />


                                <TimePicker
                                   onChange={this.onChangeTime}
                                   value={this.state.starttime}
                                   locale="sv-sv"
                                   className="timepicker"

                                 />

                                <br/>

                                <label htmlFor="roomNumber">Room</label>
                                <br/>
                                <Select
                                    className="selectoptions"
                                    style={{ width: "25%", marginBottom: "5px",marginTop:'7px' }}
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
                                    style={{ width: "25%", marginBottom: "8px",marginTop:'7px' }}
                                    onChange={entry => {
                                        this.setState({
                                          examTypeName: entry.label,
                                          type: entry.value,
                                        });
                                        var date = moment(this.state.startTime,"HH:mm")
                                            .add(entry.value.duration,'minutes')
                                            .format('HH:mm');

                                            this.setState({
                                              endTime:date
                                            });

                                    }
                                    }
                                    value={this.state.examTypeName.label}
                                    options={

                                        this.state.examtypes.map((type, i) => {
                                            return { value: type, label: type.name };
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
