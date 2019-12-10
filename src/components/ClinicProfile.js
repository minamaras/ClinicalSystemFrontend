import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter,useParams} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ClinicListTable from './ClinicListTable'
import '../css/ClinicListPage.css'



class  ClinicProfile extends React.Component{
  constructor(props) {
      super(props);



      this.state =  {
          clinicname: '',
          adress : '',
          description: ''

      }



      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get(`http://localhost:8081/api/clinics/clinicabout/${this.props.match.params.name}`,options).then(
          (resp) => this.onSuccessHandler(resp),
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
                    description: resp.data.description
        });
      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");
      }


      render() {
          return (
              <div>
            
              </div>
          );
      }

  }



  export default withRouter(ClinicProfile);
