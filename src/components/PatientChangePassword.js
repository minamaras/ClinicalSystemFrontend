import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import { BrowserRouter as Router,Route,Link,withRouter} from "react-router-dom";
import moment from 'moment';
const UserAlert = withReactContent(Swal)

class PatientChangePassword extends React.Component {

    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changePassword = this.changePassword.bind(this);



        this.state = {
            show: false,
            oldpassword:'',
            newpassword:'',
            repeat:'',
            email: this.props.patient.email,
        };


    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(e) {
          this.setState({...this.state, [e.target.name]: e.target.value});
      }

      changePassword(event){

        event.preventDefault();

        let token = localStorage.getItem('token');

        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

         if(this.state.repeat === this.state.newpassword){

         console.log(this.state);
         axios.post("http://localhost:8081/api/users/changepass",this.state, options).then(
             (resp) =>  {},
             (resp) => {
               UserAlert.fire({
                   title: "Oops something went wrong :(",
                   text: "",
                   type: "error",
                   icon:'error;'
                 });
             }
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

    render() {
        return (
            <div>
                <Button id="changePassButton" onClick={this.handleShow} variant="link">
                    Change password
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size=".modal-sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"

                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Changing <label style={{'textTransform':'capitalize'}} >{this.props.patient.name}</label>'s password
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.changePassword}>
                    Enter old password
                    <br/>
                    <input name="oldpassword" type="password"  onChange={this.handleChange}></input>
                    <br/>
                    Enter new password
                    <br/>
                    <input name="newpassword"  type="password" onChange={this.handleChange}></input>
                    <br/>
                    Repeat new password
                    <br/>
                    <input name="repeat" type="password"  onChange={this.handleChange}></input>
                    <br/>
                    <Button style={{margin:'0px 0px 0px 0px'}} variant="link" type="submit">Change</Button>
                    </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default (PatientChangePassword);
