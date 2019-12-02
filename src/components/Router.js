import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom";
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import Home from './Home'
import ClinicPage from './ClinicPage'
import DoctorPage from './DoctorPage'
import ClinicalCentreAdminPage from './ClinicalCentreAdminPage'
import RegistrationRequestsPage from './RegistrationRequestsPage'


class Routes extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
        <Switch>
        <Route exact path="/" render={(props) => <Home user={this.props.user}/>}/>
        <Route exact path="/login" render={(props) => <LoginForm changeState={this.props.changeState} />}/>
        <Route exact path="/register" component={RegistrationForm} />
        

        <Route exact path="/clinics" component={ClinicPage} />
        <Route exact path="/doctors" component={DoctorPage} />

        <Route exact path="/ccadminpage" component={ClinicalCentreAdminPage} />
        <Route exact path="/requests" component={RegistrationRequestsPage} />


      </Switch>
        );

        }
  }

  export default withRouter(Routes);
