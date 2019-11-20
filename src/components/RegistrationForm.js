import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Routes from './Router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";
import LoginForm from './LoginForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const PatientRegisteredAlert = withReactContent(Swal)

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);



      this.handleChange = this.handleChange.bind(this);
      this.SendRegisterRequest = this.SendRegisterRequest.bind(this);

    this.state={
      name:'',
      lastname:'',
      email:'',
      password:''
    }
  }




SendRegisterRequest = event => {
   event.preventDefault();

    axios.post("http://localhost:8081/api/patients/register",this.state).then(
      (resp) => this.onSuccessHandler(resp),
      (resp) => this.onErrorHandler(resp)
    );

}

onErrorHandler(resp) {
  PatientRegisteredAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true
    });

}

onSuccessHandler(resp) {

  PatientRegisteredAlert.fire({
      title: "Patient registered successfully",
      text: "",
      type: "success",
    });

  this.setState({ redirect: this.state.redirect === false });
  window.location.href = "http://localhost:3000/login";
  

}


handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value});
  }


  onErrorHandler(resp) {
        alert("Error!")

     }


  render() {
    return (

      <form onSubmit={this.SendRegisterRequest}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    name="name"
                                    onChange={this.handleChange}
                                    placeholder="Enter name"
                                    required
                                />
                                <br/>
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="lastname"
                                    name="lastname"
                                    onChange={this.handleChange}
                                    placeholder="Enter lastname"
                                    required
                                />
                                <br/>
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

export default RegistrationForm;
