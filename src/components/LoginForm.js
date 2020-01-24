import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Card,Col } from "react-bootstrap";
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
    <div className="loginpozadina" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
    <Card className="logincard">
    <Form onSubmit={this.SendLoginRequest} className="loginform">

    <Card.Body>

    <Form.Row>
         <Form.Group as={Col} controlId="formGridEmail">

            <Form.Label className="fontPtntE">Email</Form.Label>

         </Form.Group>

         <Form.Group>

              <Form.Control type="email"
                  className="mejl"
                  id="email"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Enter email"
                  required
              />

        </Form.Group>

    </Form.Row>

    <Form.Row>
             <Form.Group as={Col} controlId="formGridEmail">

                <Form.Label className="fontPtntP">Password</Form.Label>

            </Form.Group>

             <Form.Group>

                 <Form.Control type="password"
                     className="lozinka"
                     id="password"
                     name="password"
                     onChange={this.handleChange}
                     placeholder="Enter password"
                     required
                 />
            </Form.Group>

                <p className="donthave">Don't have an account?</p> <a href="/register" className="registerA">Register</a>


    </Form.Row>

            <Button variant="outline-primary" type="submit" className="dugme">
                Login
            </Button>

        </Card.Body>

          </Form>

    </Card>

    </div>

          );
    }

}

export default withRouter(LoginForm);
