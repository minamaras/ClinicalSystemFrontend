import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import '../css/Login.css';

const UserLoggedInAlert = withReactContent(Swal)

class  LoginForm  extends React.Component{
  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.SendLoginRequest = this.SendLoginRequest.bind(this);


      this.state = {

        email:'',
        password:'',
        role:'',

      }
  }

  handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }



    SendLoginRequest(event){
       event.preventDefault();


        axios.post("http://localhost:8081/auth/login",this.state).then(
            (resp) =>  this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );

    }

    onErrorHandler(resp) {
      UserLoggedInAlert.fire({
            title: "Error occured. Please check if you have activated your account.",
            text: '',
            type: "error",
            button: true
          });

      }

      onSuccessHandler(resp) {

          let self = this;
          localStorage.setItem('token', resp.data.accessToken)

          const options = {
              headers: { 'token': resp.data.accessToken}
          };

          window.location.href = "http://localhost:3000/"



        UserLoggedInAlert.fire({
            title: "You logged in successfully",
            text: "",
            type: "success"
          });

          console.log(this.state);



      }


render(){
  return(

    <form onSubmit={this.SendLoginRequest} className="loginform">
    <div className="form-group">
        <label htmlFor="email">Email</label>

        <input type="email"
            className="form-control form-control-sm"
            id="email"
            name="email"
            onChange={this.handleChange}
            placeholder="Enter email"
            required
        />

        <br/>
        <label htmlFor="password">Password</label>
        <input type="password"
            className="form-control form-control-sm"
            id="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Enter password"
            required
        />
    </div>
    <br/>
    <Button type="submit">Login</Button>
</form>



          );
    }

}

export default withRouter(LoginForm);
