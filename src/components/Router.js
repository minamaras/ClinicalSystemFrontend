import React from 'react'
import {Route, withRouter, Switch } from "react-router-dom";
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'

class Routes extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
            return (<Switch>
                <Route path="/login"                render={(props) => <LoginForm />} />
                <Route path="/register"             render={(props) => <RegistrationForm />} />
            </Switch>
            );
        }
  }

  export default withRouter(Routes);
