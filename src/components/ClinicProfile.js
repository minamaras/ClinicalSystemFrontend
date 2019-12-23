import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter,useParams,Link} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import ClinicListTable from './ClinicListTable'
import '../css/ClinicProfile.css'
import icon from '../icons/clinicphoto.png';
import bolnica from "../icons/bolnicaslika.jpeg";



class  ClinicProfile extends React.Component{
  constructor(props) {
      super(props);
      this.renderDataOther = this.renderDataOther.bind(this);




      this.state =  {
          clinicname: '',
          adress : '',
          description: '',
          doctorsId: [],
          rating : '',
          doctors:[]

      }

      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get(`http://localhost:8081/api/clinics/clinicabout/${this.props.match.params.name}`,options).then(
          (resp) => { this.changeState(resp)},
          (resp) => this.onErrorHandler(resp),
        );

        axios.get(`http://localhost:8081/api/doctors/aboutclinicdoctors/${this.props.match.params.name}`,options).then(
            (resp) => { this.setState({
                doctors : resp.data,
            });},
            (resp) => this.onErrorHandler(resp),
          );

          console.log(this.state);

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

        });

        console.log(this.clinicname);



      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");
        }



      renderDataOther(){

        const docs = this.state.doctors;
        if (docs.lenght === 0){

          return (

             <li>There are currently no doctors working in this clinic.</li>

          );


        }else{

        return docs.map((doctor) => {
           const {id,name,lastname} = doctor//destructuring
           return (

              <li><Link to={`/doctor/${doctor.id}`}>{doctor.name} {doctor.lastname}</Link></li>

           )
        })

      }

    }


      render() {

          return (
            <div className="wholepage">
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
                      <p className="valueNameClinic"><b>Rating:</b> {this.state.rating}</p>
                      <p className="valueNameClinic"><b>Doctors:</b></p>

                      <ul className="doktori">
                      {this.renderDataOther()}
                      </ul>
                      </Form.Group>



                    </div>
          </Card.Body>




              </Form>
              </Card>

              </div>
          );
      }

  }



  export default withRouter(ClinicProfile);
