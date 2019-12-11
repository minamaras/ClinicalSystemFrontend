import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter,useParams,Link} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ClinicListTable from './ClinicListTable'
import '../css/ClinicProfile.css'



class  ClinicProfile extends React.Component{
  constructor(props) {
      super(props);
      this.renderData = this.renderData.bind(this);



      this.state =  {
          clinicname: '',
          adress : '',
          description: '',
          doctors: []

      }



      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get(`http://localhost:8081/api/clinics/clinicabout/${this.props.match.params.name}`,options).then(
          (resp) => { this.changeState(resp)},
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
                    doctors: resp.data.doctors
        });

        console.log(this.state);
      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");
            window.location.href =  "http://localhost:3000/";
      }

      renderData() {
        const list = this.state.doctors;
      return list.map((doctor, index) => {
         const { name, lastname} = doctor//destructuring

         return (

              <li><Link to={`/doctor/${doctor.name}`}>{doctor.name} {doctor.lastname}</Link></li>




         )
      })
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
                      <p className="valueNameClinic"><b>Description:</b> {this.state.description}</p>
                      <p className="valueNameClinic"><b>Adress:</b> {this.state.adress}</p>
                      <ul className="doktori">
                        {this.renderData()}
                      </ul>
                      </Form.Group>



                    </div>
          </Card.Body>




              </Form>
              </Card>
          );
      }

  }



  export default withRouter(ClinicProfile);
