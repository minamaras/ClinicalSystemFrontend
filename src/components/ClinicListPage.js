import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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


      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get("http://localhost:8081/api/clinics/allclinics",options).then(
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


              <div className="container-clinic">
                  <div className="row-clinic">
                      <div className="col-md-2-clinic">
                      </div>
                      <div className="col-md-10-clinic">

                          <br />
                          <ClinicListTable content={this.state.clinics} />

                      </div>
                  </div>
                  
              </div>


          );
      }

  }



  export default withRouter(ClinicListPage);
