import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import '../css/DoctorsTerms.css';
import { BrowserRouter as Router,Route,Link,withRouter} from "react-router-dom";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navigate, Views } from 'react-big-calendar'
import {  momentLocalizer } from 'react-big-calendar'
import PhotoSlider from './PhotoSlider';
import 'moment/locale/en-gb';
import e from '../icons/explanation.svg';
const localizer = momentLocalizer(moment)


const ErrorSearch = withReactContent(Swal)

class ShowPredef extends React.Component {

    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
        this.createEvents = this.createEvents.bind(this);
        this.renderTermsOtherVersion = this.renderTermsOtherVersion.bind(this);
        this.handleSlotSelect =this.handleSlotSelect.bind(this);




        this.state = {
            show: false,
            terms:[],
            doctorsevents:'',
        };


    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    renderTerms(){

      console.log(this.props.doctor);
      return this.props.doctor.hours.map((term, index) => {

        if(this.props.date != '' || this.props.date != undefined){
          if(typeof  this.props.doctor.exam === "object"){
            console.log("think he's an obect");
          return (

            <Link className="singleterm" to ={{pathname:`/appointment/${this.props.doctor.id}/${this.props.doctor.exam.name}/${this.props.doctor.exam.price}/${this.props.date}/${term}/`}}>
            [{term}] &nbsp;
            </Link>

    )

          }
        else{

          console.log("think he's a string");

          return (

            <Link className="singleterm" to ={{pathname:`/appointment/${this.props.doctor.id}/${this.props.doctor.exam}/${this.props.date}/${term}/`}}>
            [{term}] &nbsp;
            </Link>

    )



        }

      }


        });

    }


    handleSlotSelect(slotInfo) {
      var dateString = slotInfo.start.toISOString().substring(0,10);

      var datetext = slotInfo.start.toTimeString().split(' ')[0]
      var h = slotInfo.start.getHours();
      var m = slotInfo.start.getMinutes();
      var time = h + ":" + m;


      window.location.href=`http://localhost:3000/appointment/${this.props.doctor.id}/${this.props.doctor.exam.name}/${this.props.doctor.exam.price}/${dateString}/${datetext}/`;

    }


    onSelectEvent = event => {

    var exam = this.props.exams.find(x=> x.id == event.resoruce);

    if(exam != undefined)
      {

        ErrorSearch.fire({
            title: "",
            text: 'Exam done by doctor : '+exam.doctorfirstname+' '+exam.doctorlastname+
            ' for date : '+exam.date+' from '+exam.startTime+' till '+exam.endTime+' , exam price: '+exam.type.price+' , room '+exam.room+".By clicking on button below, this appointment will be scheduled for you and you will recive and email.",
            type: "success",
            button: true,
            icon: "info",
            confirmButtonText:"Yes i wanna schedule this appointment!"
          }).then((isOk) => {

            if(isOk){

              let token = localStorage.getItem('token');
              const options = {
                  headers: { 'Authorization': 'Bearer ' + token}
              };

              var datestring = exam.date.split('-');
              var startstring = exam.startTime.split(':');
              var endstring = exam.endTime.split(':');

              var dateandtimeS = new Date(datestring[0],datestring[1]-1,datestring[2],startstring[0],startstring[1],startstring[2]);
              var dateandtimeE = new Date(datestring[0],datestring[1]-1,datestring[2],endstring[0],endstring[1],endstring[2]);

              var objekat = {id:exam.id,start:exam.start,doctorEmail:exam.doctorEmail,
                              roomNumber:exam.room,date:exam.date,startTime:exam.startTime,
                            endTime:exam.endTime,type:exam.type,status:exam.status,classification:exam.classification};

              axios.post(`http://localhost:8081/api/appointments/save`,objekat,options).then(
                  (resp) => {

                    ErrorSearch.fire({
                        title: "",
                        text: 'You successfully scheduled this appointment.',
                        type: "error",
                        button: true,
                        icon: "info",
                      }).then((isOk) => {
                  if(isOk)
                  {
                    this.setState({ redirect: this.state.redirect === false });
                  window.location.reload();
                  this.handleClose();
                }
              });

                    },
                  (resp) => {

                    ErrorSearch.fire({
                        title: "",
                        text: 'Oops this term is no longer available.',
                        type: "error",
                        button: true,
                        icon: "info",

                      })


                  }
                );
            }
          });

      }
  }





    renderTermsOtherVersion(){

        var events=this.createEvents();
        var spliteddate = this.props.exams[0].date.split("-");
        var mindate = new Date(spliteddate[0],spliteddate[1]-1,spliteddate[2],0,0,0);
        var exams = this.props.exams;

            return (
            <div>
            <BigCalendar
              localizer={localizer}
              resourceTitleAccessor="title"
              resourceIdAccessor="resoruce"
              events={events}
              style={{height:'600px'}}
              view='month'
              views={['month']}
              defaultView='month'
              defaultDate={mindate}
              toolbar={true}
              selectable={true}
              min ={new Date()}
              startAccessor="startDate"
              endAccessor="endDate"
              onSelectEvent={this.onSelectEvent}


                onSelectSlot={(slotInfo) =>
                  ErrorSearch.fire({
                      title: "There isn't any predefined appointment for this time.",
                      text: '',
                      type: "error",
                      button: true,
                      icon: "error"
                    })
              }

            />
            </div>

            )


    }

    createEvents(){

      var predefevents =[];

      this.props.exams.map((exam, index) => {

      var splitedstart = exam.startTime.split(':');
      var splitedend = exam.endTime.split(':');
      var spliteddate = exam.date.split('-')

      var begin = new Date(spliteddate[0],spliteddate[1]-1,spliteddate[2],splitedstart[0],splitedstart[1],splitedstart[2]);
      var end = new Date(spliteddate[0],spliteddate[1]-1,spliteddate[2],splitedend[0],splitedend[1],splitedend[2]);


    predefevents.push({
    title: 'PREDEFINED',
    startDate: begin,
    endDate: end,
    allDay: false,
    resoruce:exam.id,

  });


});
console.log(predefevents);
return predefevents;
}



    render() {
      console.log(this.props.exams);
      console.log(this.props.info);
        return (
            <div>
                <Button id="showingtermsbutton" onClick={this.handleShow} variant="link">
                  {this.props.exam}
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"

                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Predefined appointments for type {this.props.exam}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="Info">
                    <img src={e} style={{height:'40px',width:'40px',marginTop:'20px',marginBottom:'20px'}}></img>
                    <label style={{marginLeft:'20px'}}>Click on blue marked "Predefiend" on calendar to see more information about appointment.</label>

                    </div>
                    <div className="avaliableTerms">
                    {this.renderTermsOtherVersion()}

                    </div>
                    <br/>

                    <Button className="closetermsbutton" variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default (ShowPredef);
