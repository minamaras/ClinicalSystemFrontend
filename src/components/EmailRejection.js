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
            emailText: ''
            
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
                    size="lg"
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

    sendEmail(){
        const {emailText} = this.state;

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.post(`http://localhost:8081/api/requests/declinerequest/${this.props.id}`, options, emailText).then(
            console.log(this.props.id),
            console.log(emailText),   
        (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
            window.location.reload()
            
          );
    }

    onErrorHandler(resp) {
        alert("Error response: Uncovered case");
    }

    onSuccessHandler(resp){
        window.location.reload();
    }


}

export default EmailRejection
