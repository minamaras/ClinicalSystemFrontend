import React from 'react';
import { Modal, Button, Card, InputGroup, FormControl } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import { Route, withRouter, Switch, Link } from "react-router-dom";
import '../css/OperationDoctors.css'

const PatientAlert = withReactContent(Swal)

class OperationDoctors extends React.Component{

    constructor(props){
        super(props);

        this.renderDoctorsList = this.renderDoctorsList.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        //this.sendOperationInfo = this.sendOperationInfo.bind(this);

        this.state = {

            requestId : this.props.match.params.id,
            dateOperation : this.props.match.params.date,
            timeOperation : this.props.match.params.time,
            roomOperation : this.props.match.params.room,
            doctors : [],
            doctorNames : [],

        }
        console.log(this.state)
    }


    componentDidMount(){
        let token = localStorage.getItem('token');
        const options = {
             headers: { 'Authorization': 'Bearer ' + token}
        };

        let operationInfo = {
            requestId : this.props.match.params.id,
            dateOperation : this.props.match.params.date,
            timeOperation : this.props.match.params.time,
            roomOperation : this.props.match.params.room,
        }   

        axios.post(`http://localhost:8081/api/doctors/operation/free`, operationInfo, options).then(
            (resp) => {
                console.log(resp.data)
               this.setState({
                    doctors : resp.data                    
                })

                
            },
            (resp) =>{alert('greska doktora')},
          );
    }


    renderDoctorsList(){
        return(
            this.state.doctors.map(doctor => {
                return(
                <div className="checkboxList">
            <input className="checkboxSingle" type="checkbox" onChange={this.handleSelect} value={doctor.email} content={doctor.name}/><label>{doctor.name} {doctor.lastname}</label>
                </div>
                )
            })
        )
    }

    handleSelect(e){
        this.setState({
            doctorNames: this.state.doctorNames.concat(e.target.value)
        })   
        console.log(this.state.doctorNames)     
    }


    sendOperationInfo = () => {


        let token = localStorage.getItem('token');
        const options = {
             headers: { 'Authorization': 'Bearer ' + token}
        };

        let finalInfo = {
            id : this.props.match.params.id,
            start : this.props.match.params.date,
            startTime : this.props.match.params.time,
            roomNumber : this.props.match.params.room,
            doctorNames : this.state.doctorNames
        }  
        console.log(finalInfo)

        axios.post(`http://localhost:8081/api/operationrequests/schedule`, finalInfo, options).then(
            (resp) => {
                PatientAlert.fire({
                    title: "Operation is successfully scheduled!",
                    text: "",
                    type: "success",
                    icon: "success",
                    confirmButtonText:"Ok"
                  }).then((isOk) => {

                    if(isOk){
                        window.location.href=`/operationrequests`;
            
                    }
                })

                
            },
            (resp) =>{
                PatientAlert.fire({
                    title: "Error occured in operation scheduling",
                    text: '',
                    type: "error",
                    button: true
                  });
              
                });


    }


    render(){
        return(
            <div>
                <div className="leftOpInfo">
                    <h3 className="titleOinfo">Operation info</h3>
                    <div className="rowOInfo">
                        <p className="leftOinfo">Date: </p>
                        <p>{this.state.dateOperation}</p>
                    </div>
                    <div className="rowOInfo">
                        <p className="leftOinfo">Start time: </p>
                        <p>{this.state.timeOperation}</p>
                    </div>
                    <div className="rowOInfo">
                        <p className="leftOinfo">Room number: </p>
                        <p>{this.state.roomOperation}</p>
                    </div>
                </div>
                <div className="doctorNamesList">
                <p className="titleListDoc">List of available doctors for this operation:</p>
                    <div className="doctorNamesRender">
                    {this.renderDoctorsList()}
                    </div>
                    <Button className="buttonSubmitOperation" onClick={this.sendOperationInfo.bind(this)} variant="outline-info">Schedule this operation</Button>
                </div>


            </div>
        )
    }

}

export default withRouter(OperationDoctors)