import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/ChangePassword.css';

const UserAlert = withReactContent(Swal)

class ChangePassword extends React.Component{
    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.sendChangeRequest = this.sendChangeRequest.bind(this);

        this.state = {

            email:'',
            oldpassword:'',
            newpassword:'',
            repeat:'',
    
          }

          this.state.email = this.props.user.email;
          console.log(this.state.email)

    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }



    sendChangeRequest(event){
       event.preventDefault();

       let token = localStorage.getItem('token');

       const options = {
           headers: { 'Authorization': 'Bearer ' + token}
       };

        if(this.state.repeat === this.state.newpassword){

        console.log(this.state);
        axios.post("http://localhost:8081/api/users/changepass",this.state, options).then(
            (resp) =>  this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );

        } else {
            UserAlert.fire({
                title: "Repeated password does not match!",
                text: '',
                type: "error",
                button: true
              });
        }
    }

    onErrorHandler(resp) {
        UserAlert.fire({
              title: "Old password is incorrect.",
              text: '',
              type: "error",
              button: true
            });
  
        }
  
        onSuccessHandler(resp) {
  
          UserAlert.fire({
              title: "You changed password successfully",
              text: "",
              type: "success"
            });
  
           // console.log(this.state);
            window.location.href = "http://localhost:3000/login"
  
  
        }
  


    render() {

        return(

            <div className="changePassDiv" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
                <div className="passCard">
                <Form onSubmit={this.sendChangeRequest}>
                    <Form.Label className="changeLbl">Please change your password</Form.Label>
                    <br/>
                    
                    <Form.Label>Old Password</Form.Label>
                    <FormControl
                    type="password"

                    id="oldpassword"
                    name="oldpassword"
                    onChange={this.handleChange}
                    required></FormControl>

                    <Form.Label>New Password</Form.Label>
                    <FormControl
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    onChange={this.handleChange}
                    required></FormControl>

                    <Form.Label>Repeat New Password</Form.Label>
                    <FormControl
                    type="password"
                    id="repeat"
                    name="repeat"
                    onChange={this.handleChange}
                    required></FormControl>

                    <Button variant="outline-dark" type="submit" className="dugmeChange">Submit</Button>
                </Form>
                </div>
            </div>
        )
    }
    

}

export default withRouter(ChangePassword)