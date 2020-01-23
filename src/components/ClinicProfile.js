import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Card,Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter,useParams,Link} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import '../css/ClinicProfile.css'
import icon from '../icons/klinika.svg';
import doctors from '../icons/doctors.svg';
import clinicsicon from '../icons/doctor.svg';
import Select from 'react-select';
import "react-select/dist/react-select.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import matchSorter from "match-sorter";
import ClinicDoctorsTable from './ClinicDoctorsTable';
import moment from 'moment';


class  ClinicProfile extends React.Component{
  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleChangeResultFiltering = this.handleChangeResultFiltering.bind(this);

      this.state =  {
          clinicname: '',
          adress : '',
          description: '',
          doctorsId: [],
          rating : '',
          doctors:[],
          filtered:[],
          examTypes:[],
          select2: undefined,
          exam: props.match.params.examtype,
          date: props.match.params.date,
          startDate: new Date(),
          clinic:'',
          filter:'',
          startingdoctors:[]
        }



      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get(`http://localhost:8081/api/clinics/clinicabout/${this.props.match.params.name}`,options).then(
          (resp) => { this.changeState(resp)},
          (resp) => this.onErrorHandler(resp),
        );

        var exams=[];
        var doctorstemp=[];
        axios.get(`http://localhost:8081/api/doctors/aboutclinicdoctors/${this.props.match.params.name}`,options).then(
            (resp) => {
              console.log(resp.data);

              resp.data.map((doctor, index) => {

                var strint = doctor.start.toString().substring(0,2);
                var time = parseInt(strint);

                var strinte = doctor.end.toString().substring(0,2);
                var timeend = parseInt(strinte);
                console.log(timeend);

                const locale = 'eu'; // or whatever you want...
                const hours = [];

                for(let hour = time; hour < timeend; hour++) {
                  hours.push(moment({ hour }).format('HH:mm:ss'));
                  hours.push(
                      moment({
                          hour,
                          minute: 30
                      }).format('HH:mm:ss')
                  );
              }

              var self = this;
              var actualhours=[];

              doctor.appointments.forEach(function (appointment) {

                console.log(appointment.startTime);
                hours.forEach(function (term) {


                  if(appointment.date == self.props.match.params.date && appointment.startTime == term){

                    console.log(hours.indexOf(term));
                    hours.splice( hours.indexOf(term), 1 );

                  }

                });


              });


              if(doctor.examType.name.toLowerCase().includes(self.props.match.params.exam.toLowerCase())){

                doctorstemp.push({name:doctor.name,lastname:doctor.lastname,rating:doctor.rating,appointments:doctor.appointments,start:doctor.start,end:doctor.end,hours:hours});
              }
            });


            console.log(doctorstemp);
            this.setState({
              doctors: doctorstemp,
              startingdoctors: doctorstemp,
            });

          },
            (resp) =>this.onErrorHandler(resp));
      }



      componentDidMount () {



        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };

            const tempExams = [];

        axios.get('http://localhost:8081/api/examtypes/all',options).then(
              (resp) => {this.setState({

                examTypes: resp.data,

              });},
              (resp) => this.onErrorHandler(resp),
            );


      }



      onSuccessHandler(resp) {

        this.changeState(resp);
      }


      changeState = (resp) => {

                this.setState({
                    clinicname: resp.data.name,
                    adress :resp.data.adress,
                    description: resp.data.description,
                    doctorsId: resp.data.doctorsId,
                    rating: resp.data.rating,
                    clinic: resp.data,

        });

        console.log(this.clinicname);



      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");
        }



    handleChange = date => {

         var dateString = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
         console.log(dateString);


           this.setState({
             startDate: date,
           });


           this.setState({

             date: date,
           });

           console.log(dateString);
           if(this.state.filtered[0] != undefined){
           this.state.filtered[0].date=dateString;
         }

       }


       handleChange(e) {
             this.setState({...this.state, [e.target.name]: e.target.value});

         }


  handleChangeResultFiltering(e) {

           this.setState({...this.state, [e.target.name]: e.target.value});

           if(e.target != undefined){
           console.log(e.target.value);
         }

         if(document.getElementsByName("filter")[0].value ==''){

         this.setState({
           doctors: this.state.startingdoctors,
         });
         return;
         }

         var resultingdoctors =[];
         var doctorsName=[];
         var doctorsLastname=[];
         var doctorsRating=[];
         var doctorsFirstAndLastName=[];


         this.state.doctors.forEach(function (arrayItem) {

           if(arrayItem.name.toLowerCase().includes(e.target.value.toLowerCase())){
             doctorsName.push(arrayItem);
         }

         if(arrayItem.lastname.toLowerCase().includes(e.target.value.toLowerCase())){
           doctorsLastname.push(arrayItem);
       }

       if(arrayItem.lastname.toLowerCase().includes(e.target.value.toLowerCase())){
         doctorsFirstAndLastName.push(arrayItem);
     }

       if(arrayItem.rating.toString().startsWith(e.target.value)){
           doctorsRating.push(arrayItem);
     }

     console.log(doctorsFirstAndLastName);
 });


     resultingdoctors = doctorsName;

       doctorsLastname.forEach(function (arrayItem) {

         if(resultingdoctors.some(x=>x.name == arrayItem.name)){
           return;
         }else{
           resultingdoctors.push(arrayItem);
         }

       });


       doctorsRating.forEach(function (arrayItem) {

         if(resultingdoctors.some(x=>x.name == arrayItem.name)){
           return;
         }else{
           resultingdoctors.push(arrayItem);
         }

       });


       this.setState({

         doctors: resultingdoctors,

       });

       }


      render() {

          if(this.props.match.params.date != undefined && this.props.match.params.time != undefined && this.props.match.params.exam != undefined){
          return(
            <div className="back">
            <img src = {doctors} className="slikadoktora"></img>
            <h1 className="nazivklinike"><u>{this.state.clinicname}</u></h1>
            <input className="filter" name="filter" placeholder="Enter name,lastname or doctors rating." onChange={this.handleChangeResultFiltering}></input>
            <div className="nesto">

                        <br />
                        <ClinicDoctorsTable content={this.state.doctors} date={this.props.match.params.date}/>
                        <br />
            </div>

            </div>

          );
        }else{
          return(
            <div>Nedefinisani</div>
          );
        }
      }

  }



  export default withRouter(ClinicProfile);
