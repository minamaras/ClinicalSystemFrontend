import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Card,Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter,useParams,Link} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import '../css/ClinicProfile.css'
import icon from '../icons/klinika.svg';
import clinicprofileimage from '../icons/polymesh.jpg';
import doctors from '../icons/Career_3-01.jpg';
import clinicsicon from '../icons/doctor.svg';
import Select from 'react-select';
import "react-select/dist/react-select.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import matchSorter from "match-sorter";
import ClinicDoctorsTable from './ClinicDoctorsTable';
import AllDoctorsFromClinicTable from './AllDoctorsFromClinicTable.js';
import moment from 'moment';



class  ClinicProfile extends React.Component{
  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleChangeDate = this.handleChangeDate.bind(this);
      this.handleChangeResultFiltering = this.handleChangeResultFiltering.bind(this);
      this.FilterDocs = this.FilterDocs.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);

      this.state =  {
          clinicname: '',
          adress : '',
          description: '',
          doctorsId: [],
          rating : '',
          doctors:[],
          filtered:[],
          examTypes:[],
          exam: props.match.params.examtype,
          date: props.match.params.date,
          time: props.match.params.time,
          name: props.match.params.name,
          startDate: new Date(),
          clinic:'',
          filter:'',
          startingdoctors:[],
          exams:[],
          select:undefined,
          startDate: new Date(),
          dateString:'',
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
              if(this.props.match.params.date !==  undefined && this.props.match.params.date !==  undefined && this.props.match.params.time !==  undefined  ){
              console.log(resp.data);

              resp.data.map((doctor, index) => {

                var strint = doctor.start.toString().substring(0,2);
                var time = parseInt(strint);

                var strinte = doctor.end.toString().substring(0,2);
                var timeend = parseInt(strinte);
                console.log(timeend);

                const locale = 'eu'; // or whatever you want...
                const hours = [];

                for(let hour = time; hour <= timeend; hour++) {
                  hours.push(moment({ hour }).format('HH:mm:ss'));
                  if(hour == timeend){

                    hours.push(
                        moment({
                            hour,
                            minute: 0
                        }).format('HH:mm:ss')
                    );
                    break;
                  }
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

                doctorstemp.push({exam:doctor.examType.name,id:doctor.id,name:doctor.name,lastname:doctor.lastname,rating:doctor.rating,appointments:doctor.appointments,start:doctor.start,end:doctor.end,hours:hours});
              }

            });


            console.log(doctorstemp);
            this.setState({
              doctors: doctorstemp,
              startingdoctors: doctorstemp,
            });
          }else{

            var tempexams = [];
            resp.data.map((doctor, index) => {


            if(tempexams.indexOf(doctor.examType.name) == -1){
              tempexams.push(doctor.examType.name)
            }


              var strint = doctor.start.toString().substring(0,2);
              var time = parseInt(strint);

              var strinte = doctor.end.toString().substring(0,2);
              var timeend = parseInt(strinte);
              console.log(timeend);



              doctorstemp.push({exam:doctor.examType.name,id:doctor.id,name:doctor.name,lastname:doctor.lastname,rating:doctor.rating,appointments:doctor.appointments,start:doctor.start,end:doctor.end});

            });

          this.setState({
            doctors: doctorstemp,
            startingdoctors: doctorstemp,
            exams:tempexams,
          });

          console.log(this.state);

          }
        },
            (resp) =>this.onErrorHandler(resp));
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



       handleChange(e) {
             this.setState({...this.state, [e.target.name]: e.target.value});

         }


handleChangeDate = date => {


               //var dateString = date.getFullYear() + '-' + 0 +(date.getMonth() + 1) + '-' + date.getDate();
               var dateString =date.toISOString().substring(0,10);
               console.log(dateString);

                this.setState({
                  startDate: date,
                  dateString:dateString,

                });

                console.log(this.state.select);
                console.log(this.state.startDate);

                if(this.state.select !== undefined && this.state.dateString !== undefined ){

                  {this.FilterDocs()}
                }
                else{
                return;
                }

            }

  handleSelectChange = entry => {

      var self = this;

        if(entry == null){
          this.setState({
            select: undefined,
            doctor: self.state.startingdoctors,
        });
      }

      else{

        this.setState({ select: entry.value});


        if(this.state.dateString !== undefined && this.state.select !== undefined){


                {this.FilterDocs()}
    }else{
      return;
    }
    }
  }



    FilterDocs(){

      console.log("in the filter function");


      var returnDoctors =[];
      var self= this;

      this.state.doctors.forEach(function (doctor) {

        console.log(doctor.exam);
        console.log(self.state.select);

        if(doctor.exam == self.state.select){



          var strint = doctor.start.toString().substring(0,2);
          var time = parseInt(strint);

          var strinte = doctor.end.toString().substring(0,2);
          var timeend = parseInt(strinte);

          console.log(self.state.dateString);

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

            doctor.appointments.forEach(function (appointment) {
              hours.forEach(function (term) {

                console.log(appointment.date);
                console.log(self.state.dateString);
              if(appointment.date == self.state.dateString && appointment.startTime == term){

                console.log(term);
                hours.splice( hours.indexOf(term), 1 );
                console.log(hours);

              }
            });

            });

        returnDoctors.push({exam:doctor.exam,id:doctor.id,
          name:doctor.name,lastname:doctor.lastname,
          rating:doctor.rating,appointments:doctor.appointments,start:doctor.start,end:doctor.end,hours:hours});

        }

      });




      this.setState({

        doctors: returnDoctors,
      });

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

         var trywholename=false;

         var firstandlast = e.target.value.split(/ (?!\|)/);
         if( firstandlast !== undefined && firstandlast[0] !== undefined && firstandlast[1] !== undefined){
           trywholename=true;
         }


         this.state.doctors.forEach(function (arrayItem) {

           if(arrayItem.name.toLowerCase().includes(e.target.value.toLowerCase())){
             doctorsName.push(arrayItem);
         }

         if(arrayItem.lastname.toLowerCase().includes(e.target.value.toLowerCase())){
           doctorsLastname.push(arrayItem);
       }

        if(trywholename){
       if(arrayItem.lastname.toLowerCase().includes(firstandlast[1].toLowerCase()))
        if(arrayItem.name.toLowerCase().includes(firstandlast[0].toLowerCase())){
         {doctorsFirstAndLastName.push(arrayItem);}
     }
   }

       if(arrayItem.rating.toString().startsWith(e.target.value)){
           doctorsRating.push(arrayItem);
     }

     console.log(doctorsFirstAndLastName);
 });


     resultingdoctors = doctorsName;

       doctorsLastname.forEach(function (arrayItem) {

         if(resultingdoctors.some(x=>x.id == arrayItem.id)){
           return;
         }else{
           resultingdoctors.push(arrayItem);
         }

       });

       doctorsFirstAndLastName.forEach(function (arrayItem) {

         if(resultingdoctors.some(x=>x.id == arrayItem.id)){
           return;
         }else{
           resultingdoctors.push(arrayItem);
         }

       });


       doctorsRating.forEach(function (arrayItem) {

         if(resultingdoctors.some(x=>x.id == arrayItem.id)){
           return;
         }else{
           resultingdoctors.push(arrayItem);
         }

       });


       this.setState({

         doctors: resultingdoctors,

       });

       console.log(this.state.doctors);
       }


      render() {

          if(this.props.match.params.date != undefined && this.props.match.params.time != undefined && this.props.match.params.exam != undefined){

          return(
            <div className="back" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
            <img src = {doctors} className="slikadoktora"></img>
            <h1 className="nazivklinike">Doctors from clinic <b>{this.state.clinicname}</b> that are avalaible for selected exam type for date <u>{this.state.date}</u> at time <b>{this.state.time}</b> </h1>
            <input className="filter" name="filter" placeholder="Enter name,lastname or doctors rating." onChange={this.handleChangeResultFiltering}></input>
            <div className="nesto">

                        <br />
                        <ClinicDoctorsTable content={this.state.doctors} date={this.props.match.params.date}/>
                        <br />
            </div>

            </div>

          );
        }else if (this.props.match.params.date == undefined && this.props.match.params.time == undefined && this.props.match.params.exam == undefined && this.props.match.params.name !== undefined){

          console.log(this.state.select);

          return(


            <div className="back1" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
            <h1 className="nazivklinike1"><u>{this.state.clinicname}</u></h1>
            <input className="filter" name="filter" placeholder="Enter name,lastname or doctors rating." onChange={this.handleChangeResultFiltering}></input>

            <DatePicker
                 selected={ this.state.startDate}
                 //onChange={ this.handleChange}
                 onChange={this.handleChangeDate}
                 value= {this.state.inputValue}
                 name="startDate"
                 className="datepicker"
                 minDate={moment().toDate()}


               />
             <div className="type">
             <b className="examtypelabel" style={{opacity:'0.7'}}>Select appointment type :</b>{" "}

             <Select
             options={
              this.state.exams.map((type, i) => {
              return {id: i,value:type, label: type};
               })
             }
             onChange={this.handleSelectChange}
             value={this.state.select}
             className="selectedExamType"
             required
              />

              </div>


            <div className="nesto1">

                        <br />
                        <AllDoctorsFromClinicTable content={this.state.doctors}/>
                        <br />
            </div>

            </div>



          );
        }
      }

  }



  export default withRouter(ClinicProfile);
