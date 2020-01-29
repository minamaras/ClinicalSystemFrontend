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
        this.renderDiagnosisNames = this.renderDiagnosisNames.bind(this);
        this.sendBasicInfo = this.sendBasicInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.editReport = this.editReport.bind(this);

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
            diagnosisNames: [],
            selectedReport: '',
            editValues: [],

            editMode: false,
            reportEditMode: false,

            editedText: '',


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


        axios.get(`http://localhost:8081/api/diagnosis/alldiagnosisnames`,options).then(    
            (resp) => this.onSuccessHandlerDi(resp),                
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
            reports: resp.data,
            editValues: [].fill.call({ length: resp.data.length }, false)
        })

        console.log(this.state.editValues);
    }

    onSuccessHandlerRecipes(resp){
        console.log(resp.data)
        this.setState({
            recipes: resp.data
        })
    }

    onSuccessHandlerDi(resp) {
        //console.log(resp.data)
          this.setState({     
              diagnosisNames: resp.data         
          });
      
      }

    renderDiagnosisNames(){
        return(
            this.state.diagnosisNames.map(dto => {
                return(
                    <option value={dto.name}>{dto.name}</option>
                )
            })
        )
    }

    
    handleSelect(e){
        this.setState({ selectedReport : e.target.value})

    }

    handleEditButton(i, diagnosisName, content){
        let temp = this.state.editValues;
        temp[i] = true;

        this.setState({editValues : temp, selectedReport : diagnosisName, editedText: content});
    }

    handleCloseEdit(i){
        let temp = this.state.editValues;
        temp[i] = false;

        this.setState({editValues : temp});
    }

    editReport(e, id){
        e.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
          headers: { 
              'Authorization': 'Bearer ' + token,
            }
              };

        let reportInfo = {
            id: id,
            text: this.state.editedText,
            diagnosisName: this.state.selectedReport,
        }   
        console.log(reportInfo)
        axios.post(`http://localhost:8081/api/reports/editreport`, reportInfo, options).then(    
            (resp) => this.onSuccessHandlerEditR(resp),                
            (resp) => this.onErrorHandler(resp)
        );
    }

    onSuccessHandlerEditR(resp){
        MedRecAlert.fire({
            title: "Report is successfully edited!",
            text: '',
            type: "success",
            icon: 'success',
            button: true
          });
          window.location.reload();
    }

    renderReport(){
        return(
                    this.state.reports.map( (report, i) => {
                return(
                    <div className="divAllR">
                    <div className="divReport">
                        <div className="basicTitle">
                            <h4>Report</h4>
                           {report.editable && <img src={editicon} onClick={() => this.handleEditButton(i, report.diagnosisName, report.text)} title="Update report" className="editReport" style={{height:'27px', width: 'auto'}} alt='Unavailable icon' />}
                        </div>
                        
                        
                        <div className="reportRowDiv">
                        <p className="reportRowTitle">Doctor: </p>
                        <p className="reportRowText">{ report.doctoremail }</p>
                        </div>
                     {!(this.state.editValues[i] && report.editable) &&   
                     <div>
                        <div className="reportRowDiv">
                        <p className="reportRowTitle">Content: </p>
                        <p className="reportRowTextText">{ report.text }</p>
                        </div>
                        <div className="reportRowDiv">
                        {report.diagnosisName && <p className="reportRowTitle">Diagnose:</p>}
                        {report.diagnosisName && <p className="reportRowText">{ report.diagnosisName }</p>}
                        </div> 
                        </div>
                    }
                    {(this.state.editValues[i] && report.editable) &&
                    <div>
                        <Form onSubmit={(e) => this.editReport(e, report.id)}>
                        <div className="rowRecord">
                        <Form.Label className="labelRec">Content: </Form.Label>
                           <textarea rows="7" cols="40" className="editReportContent" defaultValue={report.text} name="editedText" onChange={this.handleChange} />
                        </div>
    
                        <div className="rowRecord">
                        <Form.Label className="labelRec">Diagnose: </Form.Label>
                            <select className="selectChangeR" defaultValue={report.diagnosisName} onChange={this.handleSelect}>
                            <option value="None">None</option>
                                {this.renderDiagnosisNames()}
                            </select>
                        </div>
                        <Button type="submit" variant="outline-primary" className="btnEditReport">Update</Button>
                        <Button onClick={()=> this.handleCloseEdit(i)} variant="outline-danger" className="btnCancelBasic">Cancel</Button>

                        </Form>
                        </div>

                    }
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
            medication.map(name => {
                return(
                    <li className="medicationListRec" key={name}>{name}</li>
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
                <AddRecipe content={this.state.patientemail} />
                <AddReport content={this.state.patientemail} />                
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