import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button,  DropdownButton,Dropdown,Card} from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import moment from 'moment';
import Select from 'react-select';
import e from '../icons/explanation.svg';


const RoomCreatedAlert = withReactContent(Swal)

class AddPredefinedAppointment extends React.Component {

    constructor(props) {
        super(props);

        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.handleShow = this.handleShow.bind(this);
        this.renderTerms = this.renderTerms.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.addPredefinedAppointment = this.addPredefinedAppointment.bind(this);
        this.showDoctorsTerms = this.showDoctorsTerms.bind(this);


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
            type:'',
            selectedTime:'',
            options: [],
            isClicked: false,
            roomOptions : []
        };

    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };


        axios.get(`http://localhost:8081/api/rooms/clinicsrooms/${this.props.user.clinic}`, options).then(
            (resp) => this.onSuccessHandlerRoom(resp),
            (resp) => this.onErrorHandlerRoom(resp),
        );

        axios.get('http://localhost:8081/api/doctors/alldoctors', options).then(
            (resp) => this.onSuccessHandlerDoctor(resp),
            (resp) => this.onErrorHandlerDoctor(resp),
        );
    }


    onSuccessHandlerDoctor(resp) {
      console.log(resp.data);
      var doctorstemp = [];

      resp.data.forEach(function (doctor) {

        var hours = [];
        var timestart = doctor.start.toString().split(":");
        var timeend = doctor.end.toString().split(":");
        var duration = 0;
        var dur = parseInt(doctor.examType.duration);


        for(let hour = parseInt(timestart[0]); hour <= parseInt(timeend[0]); hour++) {

          if(hour == parseInt(timeend[0]) && duration == parseInt(timeend[1])){

            hours.push(
                moment({
                    hour,
                    minute: duration
                }).format('HH:mm:ss')
            );
            break;
          }

          hours.push(
              moment({
                  hour,
                  minute: duration
              }).format('HH:mm:ss')
          );

            duration = duration+dur;

            if(duration >= 60){
              duration = duration%60;
            }else {
              hour=hour-1;
            }
        }

        var godisnji = 0;
        doctorstemp.push({godisnji:godisnji,holidays:doctor.holidays,examType:doctor.examType,email:doctor.email,id:doctor.id,name:doctor.name,lastname:doctor.lastname,appointments:doctor.appointments,start:doctor.start,end:doctor.end,hours:hours});


      });

      this.setState({
        doctors: doctorstemp,
      });

      console.log(doctorstemp);

    }



    onSuccessHandlerRoom(resp) {


        this.setState({
          rooms: resp.data,
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


    addPredefinedAppointment(event) {
        event.preventDefault();

        console.log(this.state);
        var self = this;

        if(this.state.doctorEmail == '' || this.state.name == '' || this.state.date == '' ||
      this.state.date == undefined || this.state.selectedTime == ''){

        RoomCreatedAlert.fire({
            title: "You didn't enter all the values! ",
            text: '',
            type: "error",
            icon: 'error',
            button: true
          });

      }else
        {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
        var doctor = this.state.doctors.find(x => x.email == this.state.doctorEmail);

        var end = moment(this.state.selectedTime, "HH:mm:ss")
             .add(parseInt(doctor.examType.duration), 'minutes').format("HH:mm:ss");
        var stringend = end.toString().split(':');

        var dateandtimeS = new Date(parseInt(this.state.date.substring(0,4)),parseInt(this.state.date.substring(6,8))-1,parseInt(this.state.date.substring(9,11)),parseInt(this.state.selectedTime.substring(0,2)),parseInt(this.state.selectedTime.substring(3,5)),0);
        var dateandtimeE = new Date(parseInt(this.state.date.substring(0,4)),parseInt(this.state.date.substring(6,8))-1,parseInt(this.state.date.substring(9,11)),parseInt(stringend[0]),parseInt(stringend[1]),0);

        console.log(dateandtimeS.getTime());
        console.log(dateandtimeE.getTime());

        this.state.rooms.forEach((room, i) => {

        if(room.examType.name == doctor.examType.name){

          if(room.appointments.lenght !== 0){

            room.appointments.forEach((appointment, i) => {

                if(appointment.date == this.state.date && appointment.startTime == this.state.selectedTime){

                  console.log(appointment);
                  this.state.rooms.splice( this.state.rooms.indexOf(room), 1 );
                }

          });
        }

        }

        });

        var index =  Math.floor(Math.random() * this.state.rooms.lenght);
        var radnomroomnumber = this.state.rooms.lenght;
        console.log(this.state.rooms[0]);
        console.log(doctor);
        var start = new Date(parseInt(this.state.date.substring(0,4)),parseInt(this.state.date.substring(6,8))-1,parseInt(this.state.date.substring(9,11)),0,0,0);

        if(this.state.rooms.lenght == 0){

          RoomCreatedAlert.fire({
              title: "Currently no avalible rooms for chosen date and time!",
              text: '',
              type: "error",
              icon: 'error',
              button: true
            });

        }

        var objekat = {start:start,examTypeName:doctor.examType.name,doctorEmail:this.state.doctorEmail,
          roomNumber:this.state.rooms[0].number,name:this.state.name,date:this.state.date,
          type:doctor.type,startTime:dateandtimeS.getTime(),endTime:dateandtimeE.getTime()};

          console.log(objekat);


         axios.post("http://localhost:8081/api/appointments/savepredefined", objekat, options).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
       }
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
            icon: 'success',
            button: 'false'
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

    showDoctorsTerms(){

      this.setState({
        isClicked: true,
      });

      if((this.state.date == '' || this.state.date == undefined)){

          RoomCreatedAlert.fire({
              title: "You didn't select doctor or date! ",
              text: '',
              type: "error",
              icon: 'error',
              button: true
            });
        }else {


            var selctedDoctor = this.state.doctors.find(x => x.email == this.state.doctorEmail);
            console.log(selctedDoctor);
            if(selctedDoctor !== undefined){

              var godisnji = 0;
              var self = this;

              if(selctedDoctor.holidays.lenght !== 0){

                  selctedDoctor.holidays.forEach(function (holiday) {


                    var stringdate =  holiday.fromto.split("-");
                    var wanteddate = self.state.date.split("-");
                    console.log(wanteddate);

                    var holidayEnd = new Date(stringdate[0],stringdate[1]-1,parseInt(stringdate[2].substring(0,2)),0,0,0);
                    var holidayStart = new Date(stringdate[3],stringdate[4]-1,parseInt(stringdate[5].substring(0,2)),0,0,0);
                    var wantedDate = new Date(wanteddate[0],wanteddate[1]-1,wanteddate[2],0,0,0);


                      if((wantedDate == holidayStart) || (wantedDate == holidayEnd) || (holidayStart < wantedDate < holidayEnd)){
                        godisnji= godisnji+1;
                      }

                  });
                }

                selctedDoctor.godisnji = godisnji;


            if(selctedDoctor.appointments.lenght !== 0){

            selctedDoctor.hours.forEach((term, i) => {

            selctedDoctor.appointments.forEach((appointment, i) => {

              if(appointment.status == 'SHEDULED'){

                if(appointment.date == this.state.date &&
                  (appointment.startTime) == term){



                selctedDoctor.hours.splice( selctedDoctor.hours.indexOf(term), 1 );

            }
          }

        });

        });

        }

  this.setState({

    options : selctedDoctor.hours,
    selctedDoctor : selctedDoctor,
  });

        }

        }

    }

    componentWillMount(){
      this.setState({
        isClicked : false,
      });
    }

renderTerms(){

if (this.state.isClicked == true){

console.log(this.state.selctedDoctor);

if(this.state.selctedDoctor !== undefined ){

if(this.state.selctedDoctor.godisnji == 0 )

{  return(

    <Select
      className="selectTerm"
      style={{ width: "25%",margin:'20px 0px 0px 0px'}}
      onChange={entry => {

            this.setState({ selectedTime: entry.value });

      }
      }
      value={this.state.selectedTime}
      id="selectterms"
      options={

          this.state.options.map((term, i) => {
              return { value: term, label: term };
          })
      }
      />
      );}
    }
  }
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
                                    style={{width:'400px'}}
                                    onChange={this.handleChange}
                                    placeholder="Enter name"
                                    required
                                />
                                <br/>
                                <label htmlFor="doctor">Doctor</label>

                                <Select
                                    className="selectoptions"
                                    style={{ width: "70%", marginBottom: "10px" }}
                                    onChange={entry => {
                                        this.setState({ doctorEmail: entry.label});
                                    }
                                    }
                                    value={this.state.doctorEmail.label}
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
                                    style={{marginTop:'2px',marginBottom:'10px'}}

                                />

                                <Button onClick={this.showDoctorsTerms} style={{margin:'0px 0px 10px 30px',height:'30px',padding:'3px',backgroundColor:'lightpink',borderColor:'lightpink'}}>
                                Click here to see doctor's avalible terms for the chosen date.</Button>

                                {this.renderTerms()}


                                <br/>

                                <Card style={{topMargin:'30px',marginBottom:'20px',height:'150px',width:'300px',
                                padding:'10px',border:'none',outline:'none',backgroundColor:'aliceblue'}}>
                                <Card.Img src={e} style={{width:'40px',height:'40px',marginTop:'20px'}}></Card.Img>
                                <label style={{marginLeft:'10px'}}>System will automatically find you a free room for this exam.</label>
                                </Card>


                            </div>
                            <hr />
                            <Button className="roomDugme" variant="primary" style={{
                              float: "right"}} onClick={this.handleClose}>Close</Button>
                            <Button type="submit" variant="success" style={{backgroundColor:'lightpink',borderColor:'lightpink', float: "right", margin: "0px 10px 0px 0px" }} className="roomDugme">Add</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default AddPredefinedAppointment;
