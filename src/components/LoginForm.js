import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Routes from './Router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import RoutedLinkContainer from './RoutedLinkContainer';
import { LinkContainer } from "react-router-bootstrap";


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


        axios.post("http://localhost:8081/api/users/login",this.state).then(
            (response) => {
                alert("Successful login!")
            },
            (response) => {
                alert("Not successful")
            }
        );

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

export default LoginForm;
