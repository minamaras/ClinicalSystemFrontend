import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel, Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ClinicListTable from './ClinicListTable'
import '../css/ClinicListPage.css'







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
          var tempClinics = [];

          for (var i = 0; i < resp.data.length; i++) {
              tempClinics.push(resp.data[i]);
          }
          this.setState({
              clinics : tempClinics,
          });

      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");
      }


      render() {
          return (


            <Card style={{ width: '40rem',left:'250px',top:'30px'}} className="clinic-card">
                <Card.Body>
                  <Card.Title style={{top:'10px',bottom:'20px'}}>Clinics</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Clinics in our system</Card.Subtitle>
                  <Card.Text>
                  <ClinicListTable content={this.state.clinics}/>
                  </Card.Text>
                </Card.Body>
            </Card>



          );
      }

  }



  export default withRouter(ClinicListPage);
