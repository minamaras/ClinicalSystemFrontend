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
import Codebook from './Codebook'
import ClinicInfoPage from './ClinicInfoPage'
import ClinicListPage from './ClinicListPage'
import ClinicProfile from './ClinicProfile'
import DoctroProfile from './DoctroProfile'
import NursePage from './NursePage'
import NurseProfile from './NurseProfile'
import ExamTypePage from './ExamTypePage';
import DoctorInfo from './DoctorInfo';
import ActivatedAccount from './ActivatedAccount'
import ChangePassword from './ChangePassword'
import NurseHoliday from './NurseHoliday'
import MyCalendar from './MyCalendar'
import RecipesPage from './RecipesPage'
import ExaminationRoom from './ExaminationRoom'
import MyPatients from './MyPatients'
import AvailableDoctors from './AvailableDoctors'
import PatientInfo from './PatientInfo';
import MedicalRecord from './MedicalRecord';
import ClinicsFilteringPage from './ClinicsFilteringPage';
import HolidayRequests from './HolidayRequests';
import AllClinics from './AllClinics';
import ScheduleAppointment from './ScheduleAppointment';

import { createBrowserHistory } from 'history';

class Routes extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
        <Switch>
        <Route exact path="/" history={createBrowserHistory}  render={(props) => <PhotoSlider user={this.props.user}/>}/>
        <Route exact path="/login" render={(props) => <LoginForm changeState={this.props.changeState} />}/>
        <Route exact path="/register" component={RegistrationForm} />



        <Route exact path="/clinics" render={(props) => <ClinicPage user={this.props.user}/>} />
        <Route exact path="/doctors" render={(props) => <DoctorPage user={this.props.user}/>} />
        <Route exact path="/nurses" render={(props) => <NursePage user={this.props.user}/>} />

        <Route exact path="/ccadminpage" render={(props) => <ClinicalCentreAdminPage user={this.props.user}/>} />
        <Route exact path="/requests" render={(props) => <RegistrationRequestsPage user={this.props.user}/>} />
        <Route exact path="/patientprofile" render={(props) => <PatientProfile user={this.props.user}/>} />
        <Route exact path="/profilepage" render={(props) => <ClinicAdminProfile user={this.props.user}/>} />
        <Route exact path="/rooms" render={(props) => <OperationRoom user={this.props.user}/>} />
        <Route exact path="/codebook" render={(props) => <Codebook user={this.props.user}/>} />
        <Route exact path="/manageclinic" render={(props) => <ClinicInfoPage user={this.props.user} clinicdes={this.props.user.clinicdes} clinicadress = {this.props.user.clinicadress} clinicname = {this.props.user.clinic}/>} />
        <Route exact path="/allclinics" render={(props) => <ClinicsFilteringPage user={this.props.user}/>} />
        <Route exact path="/allclinicsprofile" render={(props) => <AllClinics user={this.props.user}/>} />


        <Route exact path="/clinic/:name/:exam/:date/:time" render={(props) => <ClinicProfile user={this.props.user}/>} />
        <Route exact path="/clinic/:name" render={(props) => <ClinicProfile user={this.props.user} parameter='0'/>} />

        <Route exact path="/appointment/:id/:date/:term" render={(props) => <ScheduleAppointment user={this.props.user}/>} />


        <Route exact path="/doctorprofile" render={(props) => <DoctroProfile user={this.props.user}/>} />
        <Route exact path="/examtypes" render={(props) => <ExamTypePage user={this.props.user}/>} />
        <Route exact path="/nurseprofile" render={(props) => <NurseProfile user={this.props.user}/>} />
        <Route exact path="/doctor/:id" render={(props) => <DoctorInfo user={this.props.user}/>} />
        <Route exact path="/activated-account" render={(props) => <ActivatedAccount user={this.props.user}/>} />
        <Route exact path="/changepass" render={(props) => <ChangePassword user={this.props.user}/>} />
        <Route exact path="/holiday" render={(props) => <NurseHoliday user={this.props.user}/>} />
        <Route exact path="/calendar" render={(props) => <MyCalendar user={this.props.user}/>} />
        <Route exact path="/prescription" render={(props) => <RecipesPage user={this.props.user}/>} />
        <Route exact path="/examrooms" render={(props) => <ExaminationRoom user={this.props.user}/>} />
        <Route exact path="/patients" render={(props) => <MyPatients user={this.props.user}/>} />
        <Route exact path="/medicalrecord" render={(props) => <MedicalRecord user={this.props.user}/>} />
        <Route exact path="/allclinics" render={(props) => <ClinicsFilteringPage user={this.props.user}/>} />
        <Route exact path="/holidayrequests" render={(props) => <HolidayRequests user={this.props.user}/>} />


        <Route exact path="/patient/:id" render={(props) => <PatientInfo user={this.props.user}/>} />

      </Switch>
        );

        }
  }

  export default withRouter(Routes);
