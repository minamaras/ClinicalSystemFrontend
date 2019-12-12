import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card, Form } from "react-bootstrap";
import usericon from '../icons/user.svg'
import '../css/CCAdminCardInfo.css'

const AdminAlert = withReactContent(Swal)

class CCAdminInfo extends React.Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.SendUpdateRequest = this.SendUpdateRequest.bind(this);  


        this.state={
            name:'',
            lastname:'',
            email:'',
            password:''
          }

    }


    SendUpdateRequest = event => {
        event.preventDefault();
     
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
     
        this.state.email = this.props.content.email;
     
        console.log(this.state);
     
         axios.post("http://localhost:8081/api/clinicalcentreadmins/update",this.state, options).then(
           (resp) => this.onSuccessHandler(resp),
           (resp) => this.onErrorHandler(resp)
         );     
     
     }

     onErrorHandler(resp) {
        AdminAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });
      
      }

      changeState = (resp) => {

        this.setState({
            isLoggedIn: true,
            name: resp.data.name,
            lastname: resp.data.lastname,
            email: resp.data.email,
            id: resp.data.id,
            password: resp.data.password,
            role: resp.data.role

        });
    }

    onSuccessHandler(resp) {

        AdminAlert.fire({
            title: "You updated your info successfully",
            text: "",
            type: "success",
          });
      
        this.changeState(resp)
        window.location.reload();
      
      }
      
      
      handleChange(e) {
            this.setState({...this.state, [e.target.name]: e.target.value});
        }
      




    render(){
        console.log(this.state);
        return(

            <Card className="ccacardC">
                <Form onSubmit={this.SendUpdateRequest}>
                    <Card.Img style={{height:'100px', width: 'auto'}} className="userIconCCA" variant="top" src={usericon} alt='Unavailable icon' />
                    <Card.Body>
                        <Card.Text>
                        <Form.Label className="myinfocca">Your info</Form.Label>
                        <br/>
                        <Form.Label>Email:</Form.Label>
                        <br/>
                        <Form.Label>{this.props.content.email}</Form.Label>
                        <br/>
                        <br/>

                        <Form.Label>Name:</Form.Label>       
                        <Form.Control type="text" id="name" name="name" defaultValue={this.props.content.name} onChange={this.handleChange}/>
                        <br/>

                        <Form.Label>Lastname:</Form.Label>
                        <Form.Control type="text" id="lastname" name="lastname" defaultValue={this.props.content.lastname} onChange={this.handleChange}/>
                        </Card.Text>
                        <br/>

                        <Button className="btnUpdateCCA" variant="outline-primary" type="submit">
                            Update
                        </Button>
                    </Card.Body>
                </Form>
            </Card>
        );
    }

}

export default CCAdminInfo