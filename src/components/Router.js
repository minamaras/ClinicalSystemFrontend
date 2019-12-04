import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom";
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Home from './Home'
import ClinicPage from './ClinicPage'
import DoctorPage from './DoctorPage'
import ClinicalCentreAdminPage from './ClinicalCentreAdminPage'
import RegistrationRequestsPage from './RegistrationRequestsPage'
import PatientProfile from './PatientProfile'
import PhotoSlider from './PhotoSlider'
import ClinicAdminProfile from './ClinicAdminProfile'
import OperationRoom from './OperationRoom'



class Routes extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
        <Switch>
        <Route exact path="/" render={(props) => <PhotoSlider user={this.props.user}/>}/>
        <Route exact path="/login" render={(props) => <LoginForm changeState={this.props.changeState} />}/>
        <Route exact path="/register" component={RegistrationForm} />



        <Route exact path="/clinics" render={(props) => <ClinicPage user={this.props.user}/>} />
        <Route exact path="/doctors" render={(props) => <DoctorPage user={this.props.user}/>} />

        <Route exact path="/ccadminpage" render={(props) => <ClinicalCentreAdminPage user={this.props.user}/>} />
        <Route exact path="/requests" render={(props) => <RegistrationRequestsPage user={this.props.user}/>} />
        <Route exact path="/patientprofile" render={(props) => <PatientProfile user={this.props.user}/>} />
        <Route exact path="/profilepage" render={(props) => <ClinicAdminProfile user={this.props.user}/>} />
        <Route exact path="/rooms" render={(props) => <OperationRoom user={this.props.user}/>} />


      </Switch>
        );

        }
  }

  export default withRouter(Routes);
