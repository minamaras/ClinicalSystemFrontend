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



class  AvaliableDoctors extends React.Component{
  constructor(props) {
      super(props);



      }



      onSuccessHandler(resp) {

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
                  Hello
                  {this.props.match.params.name}
                  </Card.Text>
                  <Card.Text>
                  {this.props.match.params.examtype}
                  </Card.Text>
                </Card.Body>
            </Card>



          );
      }

  }



  export default withRouter(AvaliableDoctors);
