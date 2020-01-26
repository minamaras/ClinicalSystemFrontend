import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown ,Card} from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';




class AppointmentCard extends React.Component{
    constructor(props){
        super(props);

    }




    render() {

        return(
                <Card>
                <Card.title>Hello</Card.title>
                </Card>
        );
    }
}

export default withRouter(AppointmentCard);
