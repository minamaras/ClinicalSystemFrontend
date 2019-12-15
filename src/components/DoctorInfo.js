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



class  DoctorInfo extends React.Component{
  constructor(props) {
      super(props);




      this.state =  {
          name: '',
          lastname : '',
          specialization: '',
          rating:'',
          clinic : ''

      }



      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get(`http://localhost:8081/api/doctors/doctorabout/${this.props.match.params.id}`,options).then(
          (resp) => { this.changeState(resp)},
          (resp) => this.onErrorHandler(resp),
        );



      }

      onSuccessHandler(resp) {

        this.changeState(resp);
      }


      changeState = (resp) => {

          console.log(resp);

                this.setState({
                    name: resp.data.name,
                    lastname :resp.data.lastname,
                    specialization: resp.data.specialization,
                    rating: resp.data.rating,
                    clinic: resp.data.clinic
        });

        console.log(this.state);
      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");

      }




      render() {
          return (
            <Card className="text-center-clinic" id="karta">

            <Form className="clinicInfo">

            <Card.Body>
            <Card.Img  src={icon} style={{height:'70px',width:'70px'}}/>
              <h1 className="clinicHeader">Doctor's info</h1>
              <br/>

              <b><h3 className="clinicTitle">{this.state.name} {this.state.lastname}</h3></b>
                <br/>
                 <Form.Row>

                    </Form.Row>

                    <div className="clinicCol">

                      <Form.Group className="firstColClinic" >
                      <p className="valueNameClinic"><b>Specialization:</b> {this.state.specialization}</p>
                      <p className="valueNameClinic"><b>Rating:</b> {this.state.rating}</p>
                      <p className="valueNameClinic"><b>Clinic:</b> <Link to={`/clinic/${this.state.clinic.name}`}>{this.state.clinic.name}</Link></p>

                    </Form.Group>



                    </div>
          </Card.Body>




              </Form>
              </Card>
          );
      }

  }



  export default withRouter(DoctorInfo);
