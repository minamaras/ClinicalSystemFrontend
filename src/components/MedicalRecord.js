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


      this.state = {

          additional: '',
          allergies: '',
          bloodtype: '',
          measures: '',
          eyes: '',
          patientemail: 'nothing',
          patientName: '',

          reports: [],
          recipes: [],


      }
      

      }



componentDidMount () {

            let token = localStorage.getItem('token');
            const options = {
              headers: { 'Authorization': 'Bearer ' + token}
                  };

                  axios.post(`http://localhost:8081/api/medicalrecord/info`, this.state.patientemail, options).then(
                              (resp) => this.onSuccessHandler(resp),
                              (resp) => this.onErrorHandler(resp)
                            );

                            axios.post(`http://localhost:8081/api/reports/info`, this.state.patientemail, options).then(
                                (resp) => this.onSuccessHandlerReport(resp),
                                (resp) => this.onErrorHandler(resp)
                            );

                    }





onErrorHandler(resp) {
  PatientAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true,
      icon: "error",
    });

}




onSuccessHandler(resp) {


  this.setState({

    additional : resp.data.additional,
    allergies: resp.data.allergies,
    bloodtype: resp.data.bloodtype,
    measures: resp.data.measures,
    eyes: resp.data.eyes,
    patientName: resp.data.patientName,

  });

}

onSuccessHandlerReport(resp){
    //console.log(resp.data)
    this.setState({
        reports: resp.data
    })
}



renderReport(){
    return(
                this.state.reports.map(report => {
            return(
                <div className="divAllR">
                <div className="divReport">
                    <h4>Report</h4>
                    <div className="reportRowDiv">
                    <p className="reportRowTitle">Doctor: </p>
                    <p className="reportRowText">{ report.doctoremail }</p>
                    </div>
                    <div className="reportRowDiv">
                    <p className="reportRowTitle">Content: </p>
                    <p className="reportRowTextText">{ report.text }</p>
                    </div>
                    <div className="reportRowDiv">
                    {report.diagnosisName && <p className="reportRowTitle">Diagnose:</p>}
                    {report.diagnosisName && <p className="reportRowText">{ report.diagnosisName }</p>}
                    </div>
                </div>
                </div>
            )
        })
   )
}




render() {
    return (

      <div>
          <div className="topTitle">
              <h1 className="medicalRecTitle"><label style={{'text-transform':'capitalize'}}>{this.state.patientName}</label>'s Medical record</h1>
          </div>
          <div className="medicalRecContainer">

              <div className="basicInfoRecord">
              <div className="basicTitle">
                  <h1>Basic information</h1>
              </div>

              <div className="rowRecord">
              <Form.Label className="labelRec">Allergies: </Form.Label>
                  {!this.state.editMode && <p className="pRec">{ this.state.allergies }</p>}
                  {this.state.editMode && <input type="text" className="pRec" defaultValue={this.state.allergies} name="allergies" onChange={this.handleChange} />}
              </div>

              <div className="rowRecord">
              <Form.Label className="labelRec">Blood type: </Form.Label>
                  {!this.state.editMode && <p className="pRec">{ this.state.bloodtype }</p>}
                  {this.state.editMode && <input type="text" className="pRec" name="bloodtype" defaultValue={this.state.bloodtype} onChange={this.handleChange}/>}
              </div>

              <div className="rowRecord">
              <Form.Label className="labelRec">Measures: </Form.Label>
                  {!this.state.editMode && <p className="pRec">{ this.state.measures }</p>}
                  {this.state.editMode && <input type="text" className="pRec" name="measures" defaultValue={this.state.measures} onChange={this.handleChange}/>}
              </div>

              <div className="rowRecord">
              <Form.Label className="labelRec">Diopter: </Form.Label>
                  {!this.state.editMode && <p className="pRec">{ this.state.eyes }</p>}
                  {this.state.editMode && <input type="text" className="pRec" name="eyes" defaultValue={this.state.eyes} onChange={this.handleChange}/>}
              </div>

              <div className="rowRecord">
              <Form.Label className="labelRec">Aditional info: </Form.Label>
                  {!this.state.editMode && <p className="pRec">{ this.state.additional }</p>}
                  {this.state.editMode && <input type="text" className="pRec" name="additional" defaultValue={this.state.additional} onChange={this.handleChange}/>}
              </div>

           </div>


          <div className="appReport">
              <h2>Medical history</h2>
              <div className="appReportAndRec">
             <div className="levoReport">
              {this.renderReport()}
              </div>
              <div className="desnoRecipe">
              </div>
              </div>
          </div>
          </div>
      </div>





    );


}





}


export default withRouter(MedicalRecord);
