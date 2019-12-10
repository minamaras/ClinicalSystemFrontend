import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter,useParams} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ClinicListTable from './ClinicListTable'
import '../css/ClinicInfoPage.css'



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
            <Card className="text-center-clinic" id="karta">
            <Form className="clinicInfo">

            <Card.Body>
              <h1 className="clinicHeader">Clinic's info</h1>
              <br/>

              <b><h3 className="clinicTitle">{this.state.clinicname}</h3></b>
                <br/>
                 <Form.Row>

                    </Form.Row>

                    <div className="clinicCol">

                      <Form.Group className="firstColClinic" >
                      <p className="valueNameClinic">Description: </p>
                      <p className="valueNameClinic">Adress: </p>
                      </Form.Group>

                      <Form.Group className="secondColClinic" >
                      <Form.Label className="inputDes">{this.state.description}</Form.Label>
                      <Form.Label className="inputDes">{this.state.adress}</Form.Label>
                      </Form.Group>

                    </div>
          </Card.Body>




              </Form>
              </Card>
          );
      }

  }



  export default withRouter(ClinicProfile);
