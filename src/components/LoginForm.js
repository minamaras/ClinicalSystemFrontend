import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom'

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
            title: "Error occured",
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

          //axios.get('http://localhost:8081/auth/user', options).then(
            //(response) => {
                //self.props.changeState(response);
            //},
            //(response) => {console.log("greska");}
        //);

        UserLoggedInAlert.fire({
            title: "You logged in successfully",
            text: "",
            type: "success"
          });

          console.log(this.state);

        //this.props.history.push("/");
        //window.location.href = "http://localhost:3000/";
        //this.props.history.push('/posts/');

        //window.location.href = "http://localhost:3000/";
        //window.location.reload();


      }


render(){
  return(

    <form onSubmit={this.SendLoginRequest}>
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
    <hr/>
    <Button type="submit">Create</Button>
</form>



          );
    }

}

export default withRouter(LoginForm);
