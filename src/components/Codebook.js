import React from 'react'
import axios from 'axios'
import '../css/Codebook.css'
import { Button, Tab, Tabs } from 'react-bootstrap'
import medical from '../icons/med.svg'
import examination from '../icons/examination.svg'
import pill from '../icons/pill.svg'
import AddDiagnosis from './AddDiagnosis' 
import AddMedication from './AddMedication'
import DiagnosisCards from './DiagnosisCards'
import MedicationCards from './MedicationCards'

class Codebook extends React.Component{

    constructor(props){
        super(props)
        this.state =  {
            diagnosis: [],
            medications: [],

        }

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
   

    axios.get("http://localhost:8081/api/diagnosis/alldiagnosis", options).then(
        (resp) => this.onSuccessHandler(resp),
        (resp) => this.onErrorHandler(resp)
    );


    axios.get("http://localhost:8081/api/medication/allmedications", options).then(
        (resp) => this.onSuccessHandlerM(resp),
        (resp) => this.onErrorHandler(resp)
    );

    }

    onSuccessHandler(resp) {
        var tempDiag = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempDiag.push(resp.data[i]);
        }
        this.setState({
            diagnosis: tempDiag
        });
    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    onSuccessHandlerM(resp) {
        var tempMed = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempMed.push(resp.data[i]);
        }
        this.setState({
            medications: tempMed
        });
    }




   

    render(){
        return(
            <div className="bookContainer">
                <div className="medicalimg">
                <img src={medical} id='diagnosisBtn' style={{height:'80px', width: 'auto'}} alt='Unavailable icon' />
                </div>
                <header className="bookHeader">Codebook</header>
                <div className="listsContainer">
                    <div className="addContainer">
                        <div className="diagnosisList">
                            <h4 className="diagnosisTitle">Add diagnosis</h4>

                            <AddDiagnosis />

                        </div>
                        <div className="medicationList">                      
                            <h4 className="diagnosisTitle">Add medication</h4>
            
                            <AddMedication />

                        </div>
                    </div>
                    <br/>
                    <Tabs id="controlled-tab-example" tabKey={'1'}>
                        <Tab eventKey="diagnosis" title="Diagnosis" className="tab1">
                            <DiagnosisCards content={this.state.diagnosis} />
                        </Tab>
                        <Tab eventKey="medication" title="Medication" className="tab1">
                            <MedicationCards content={this.state.medications} />
                        </Tab>
   
                    </Tabs>
                </div>
            </div>
        );
    }



}

export default Codebook