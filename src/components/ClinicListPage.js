import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel, Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ClinicListTable from './ClinicListTable'
import '../css/ClinicListPage.css'
import headericon from '../icons/klinika.svg';
import moment from 'moment';







class  ClinicListPage extends React.Component{
  constructor(props) {
      super(props);

      this.state =  {
          clinics: []
      }

      console.log(this.props.user);

      }



      componentDidMount () {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.get("http://localhost:8081/api/clinics/allclinicsdto",options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );

     }


      onSuccessHandler(resp) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

          var tempClinics = [];

          for (var i = 0; i < resp.data.length; i++) {
            const name = resp.data[i].name;
            const adress = resp.data[i].adress;
            const rating =  resp.data[i].rating;
            const doctors = [];
            const exams = [];
            const takenterms = [];

            console.log(resp.data[i].name);

            axios.get(`http://localhost:8081/api/doctors/aboutclinicdoctors/${resp.data[i].name}`,options).then(
                (resp) => {

                          console.log(resp.data);

                        resp.data.map((doc, index) => {

                            var workTimeBegin =  moment(doc.start, 'HH:mm:ss');
                            var workTimeEnd =  moment(doc.end, 'HH:mm:ss');

                            var appointments = [];

                        doc.appointments.map((a, index) => {

                            var appointmentTimeBegin =  moment(a.startTime, 'HH:mm:ss');
                            var appointmentTimeEnd =  moment(a.endTime, 'HH:mm:ss');

                          appointments.push({date: a.start,appointmentTimeBegin:appointmentTimeBegin._i,appointmentTimeEnd:appointmentTimeEnd._i});

                        });

                        exams.push({exam: doc.examType,appointments:appointments,workTimeBegin:workTimeBegin._i,workTimeEnd:workTimeEnd._i});
                        });

                },
                (resp) => this.onErrorHandler(resp),
              );



              {tempClinics.push({name : name, adress: adress,rating: rating,exams:exams});}
              console.log(tempClinics);

          }

          this.setState({
              clinics : tempClinics,
          });

          console.log(tempClinics);
      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");
      }


      render() {
          return (


            <Card style={{ width: '60rem',left:'70px',top:'30px'}} className="clinic-card">
                <Card.Body>
                  <Card.Title style={{top:'10px',bottom:'20px',color:'#60b0f4'}}><i>Clinics in our system</i></Card.Title>
                  <Card.Text>
                  <ClinicListTable content={this.state.clinics}/>
                  </Card.Text>
                </Card.Body>
            </Card>



          );
      }

  }



  export default withRouter(ClinicListPage);
