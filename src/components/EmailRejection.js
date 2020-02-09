import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import '../css/AddClinicalCentreAdmin.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CCAdminCreatedAlert = withReactContent(Swal)


class EmailRejection extends React.Component{
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        


        this.state = {
            show: false,
            request: { },
            emailText: '',
            
        };
        this.state.request = this.props;
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(e) {      
        this.setState({...this.state, [e.target.name]: e.target.value})
    }


    sendEmail(emailText){
        //const {emailText} = this.state.emailText;


        console.log(this.props.content)

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        let rejection = {
            name : this.props.content.name,
            lastname : this.props.content.lastname,
            id : this.props.content.id,
            email : this.props.content.email,
            password : this.props.content.password,
            role : this.props.content.role,
            declineReason : this.state.emailText
        }

        
        console.log(rejection)
        axios.post(`http://localhost:8081/api/requests/declinerequest`, rejection, options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
            
          );
    }

    onErrorHandler(resp) {
        CCAdminCreatedAlert.fire({
            title: "Error occured!",
            text: 'Maybe someone has already handled this request.',
            type: "error",
            button: true,
            icon: 'error'
          });
    }

    onSuccessHandler(resp){
        CCAdminCreatedAlert.fire({
            title: "Request has been handled successfully!",
            text: '',
            type: "success",
            button: true,
            icon: 'success'
          }).then((isOk) => {

            if(isOk){
                window.location.reload();
    
            }
        })
    }



    render() {
        const {emailText} = this.state;

        return (
            <div>
                <Button id="declineBtn" onClick={this.handleShow}>
                    Decline
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Explanation:
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                       <textarea  rows="8" cols="62"
                       id="emailText"
                       name="emailText"
                       onChange={this.handleChange} 
                       placeholder="Write an explanation"
                       required />                          
                       
                       
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="dugme1" variant="success" onClick={this.sendEmail.bind(this, this.emailText)}>Send</Button>
                        <Button className="dugme2" variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }




}

export default EmailRejection;
