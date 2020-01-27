import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";
import icon from '../icons/hospitalisation.svg'
import '../css/MedicalRecord.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import DoctorVistisTable from './DoctorVistisTable';

const PatientAlert = withReactContent(Swal)

class MedicalRecord extends React.Component{

  constructor(props) {
      super(props);

      this.renderTableData = this.renderTableData.bind(this);

      this.state={
        patient:'',
        doctorVisits:[],
        medicalHistory:'',
        doctors:[],
        diseases:[]
      }


      }



componentDidMount () {

            let token = localStorage.getItem('token');
            const options = {
              headers: { 'Authorization': 'Bearer ' + token}
                  };

            axios.get('http://localhost:8081/api/medicalrecord/getrecord',options).then(
                      (resp) => this.onSuccessHandler(resp),
                      (resp) => this.onErrorHandler(resp)
                      );
                    }





onErrorHandler(resp) {
  PatientAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true
    });

}




onSuccessHandler(resp) {

  //console.log(resp);

  this.setState({

    medicalHistory : resp.data.medicalHistory,
    doctorVisits: resp.data.doctorVisits,
    patient: resp.data.patient,
    diseases: resp.data.diseases,



  });


  console.log(this.state);



}



renderTableData() {
  console.log(this.state.diseases);
  const lista = this.state.diseases;
return lista.map((d, index) => {

    return (
      <li>
      {d}
      </li>
        )
    })
}





render() {
    return (


        <div>
        <div>
        <Card className="karticaBolesti">
          <Card.Title> Your disease history:</Card.Title>
        <Card.Img style={{height:'50px', width: 'auto'}} className="userIcon" variant="top" src={icon} alt='Unavailable icon' />
            <Card.Body className = "cardBody">

            <Card.Text className='cardText'>
                <ul>
                  {this.renderTableData()}
                </ul>
            </Card.Text>

                <div className="addAdmin">
                </div>


            </Card.Body>
        </Card>


        </div>


        <label className="naslov" style={{'text-transform':'capitalize'}}> {this.state.patient.name},  </label>
        <label className="naslov"> this is the history of the appointments you had:</label>

        <div className="nesto">
                    <br />
                    <DoctorVistisTable content={this.state.doctorVisits}/>
                    <br />
        </div>


        </div>






    );


}





}


export default withRouter(MedicalRecord);
