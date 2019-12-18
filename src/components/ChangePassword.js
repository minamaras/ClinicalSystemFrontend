import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class ChangePassword extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(

            <div>
                <Form>
                    <Form.Label>Old Password</Form.Label>
                    <FormControl></FormControl>
                    <Form.Label>New Password</Form.Label>
                    <FormControl></FormControl>
                    <Form.Label>Repeat New Password</Form.Label>
                    <FormControl></FormControl>
                </Form>
            </div>
        )
    }
    

}

export default withRouter(ChangePassword)