import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/BeginAppointMedicalRecord.css';
import editicon from '../icons/editR.svg';
import recordicon from '../icons/rcd.svg';
import AddReport from './AddReport'
import AddRecipe from './AddRecipe'
import wait from '../icons/hourglass.svg'
import checked from '../icons/checkmark.svg'

const MedRecAlert = withReactContent(Swal)

class BeginAppointMedicalRecord extends React.Component{
    constructor(props){
        super(props);

        this.renderReport = this.renderReport.bind(this);
        //this.renderMedicationNames = this.renderMedicationNames.bind(this);
        this.sendBasicInfo = this.sendBasicInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            
            additional: '',
            allergies: '',
            bloodtype: '',
            measures: '',
            eyes: '',
            patientemail: '',
            patientName: '',

            reports: [],
            recipes: [],

            editMode: false,


        }
        this.state.patientemail = 'marko@gmail.com';


    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        const options = {
          headers: { 
              'Authorization': 'Bearer ' + token,
              'Content-type' : 'text/plain'
            }
              };

        axios.post(`http://localhost:8081/api/medicalrecord/info`, this.state.patientemail, options).then(    
                    (resp) => this.onSuccessHandler(resp),                
                    (resp) => this.onErrorHandler(resp)
                  );

        axios.post(`http://localhost:8081/api/reports/info`, this.state.patientemail, options).then(    
            (resp) => this.onSuccessHandlerReport(resp),                
            (resp) => this.onErrorHandler(resp)
        ); 
        
        axios.post(`http://localhost:8081/api/recipes/patients`, this.state.patientemail, options).then(    
            (resp) => this.onSuccessHandlerRecipes(resp),                
            (resp) => this.onErrorHandler(resp)
        );  

    }

    onErrorHandler(resp) {
        MedRecAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
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

    onSuccessHandlerRecipes(resp){
        console.log(resp.data)
        this.setState({
            recipes: resp.data
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


    renderRecipes(){
        console.log(this.state.recipes)
        return(
            this.state.recipes.map(recipe => {
        return(
            <div className="divRecipe"> 
                
                        <h4>Recipe</h4>
                        {!recipe.auth && <img src={wait} style={{height:'25px', width: 'auto'}} alt='Unavailable icon'/>}
                        {!recipe.auth && <label className="authRec">Uncertified</label>}
                        {recipe.auth && <img src={checked} style={{height:'25px', width: 'auto'}} alt='Unavailable icon'/>}
                        {recipe.auth && <label className="authRec">{recipe.nurseemail}</label>}
                        <div>
                        <p className="recTextTitle">Content:</p>
                        <p className="recText">{ recipe.content }</p>
                        </div>
                        {recipe.medicationName.length !== 0 && <p className="recTextTitle">Medication:</p>}
                        <ul>
                        {this.renderMedicationNames(recipe.medicationName)}
                        </ul> 
                        
                    </div> 


        )
            })
        )

    }

    

    renderMedicationNames(medication){
        return(
            medication.map((name, i) => {
                return(
                    <li className="medicationListRec" key={i}>{name}</li>
                )
            })
        )
    }
    

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});

    }

    sendBasicInfo = event => {
        event.preventDefault();
     
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
     
        let basicInfo = { 
            additional: this.state.additional,
            allergies: this.state.allergies,
            bloodtype: this.state.bloodtype,
            measures: this.state.measures,
            eyes: this.state.eyes,
            patientemail: this.state.patientemail,
         }
         axios.post('http://localhost:8081/api/medicalrecord/change/basic', basicInfo, options).then(
           (resp) => this.onSuccessHandlerBasicInfo(resp),
           (resp) => this.onErrorHandler(resp)
         );
     
     
     }

     onSuccessHandlerBasicInfo(resp){
        MedRecAlert.fire({
            title: "Successfully updated basic information!",
            text: '',
            type: "success",
            icon: "success",
            button: true
          });
        window.location.reload();
    }



    render() {
        return(
            <div>
                <div className="topTitle">
                    <h1 className="medicalRecTitle">{this.state.patientName}'s Medical record</h1>
                </div>
                <div className="upButtons">
                <AddReport content={this.state.patientemail} />
                <AddRecipe content={this.state.patientemail} />
                </div>
                <div className="medicalRecContainer">
                    
                    <div className="basicInfoRecord">
                    <div className="basicTitle">
                        <h1>Basic information</h1>
                        <img src={editicon} onClick={()=> this.setState({ editMode: true })} title="Update info" className="editBasic" style={{height:'27px', width: 'auto'}} alt='Unavailable icon' />
                    </div>
                    <Form onSubmit={this.sendBasicInfo}>
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

                    {this.state.editMode && <Button type="submit" variant="outline-primary" className="btnEditBasic">Update</Button>}
                    {this.state.editMode && <Button onClick={()=> this.setState({ editMode: false })} variant="outline-danger" className="btnCancelBasic">Cancel</Button>}
                   
                  
                    </Form>
                 </div>

                
                <div className="appReport">
                    <h2>Medical history</h2>
                    <div className="appReportAndRec">
                   <div className="levoReport">
                    {this.renderReport()}
                    </div>
                    <div className="desnoRecipe">
                    {this.renderRecipes()}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BeginAppointMedicalRecord)