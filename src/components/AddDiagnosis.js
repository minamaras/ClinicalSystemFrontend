import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import addicon from '../icons/add.svg'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const DiganosisAlert = withReactContent(Swal)

class AddDiagnosis extends React.Component{

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addDiagnosis = this.addDiagnosis.bind(this);
        


        this.state = {
            show: false,
            diagnosis: []
            
        };
    }

    
    addDiagnosis(event) {
        event.preventDefault();


         axios.post("http://localhost:8081/api/diagnosis/adddiagnosis", this.state).then(
             (resp) => this.onSuccessHandlerccAdmin(resp),
             (resp) => this.onErrorHandlerccAdmin(resp)
         );

    }

    onErrorHandlerccAdmin(resp) {
        DiganosisAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandlerccAdmin(resp) {

        DiganosisAlert.fire({
            title: "Diagnosis added successfully",
            text: "",
            type: "success",
          });

        this.setState({ redirect: this.state.redirect === false });
        window.location.reload();
        this.handleClose();
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


        return (
            <div>
                 <img src={addicon} id='diagnosisBtn' onClick={this.handleShow} className="addDiagBtn" style={{height:'50px', width: 'auto', margin: '4px'}} alt='add' />
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Enter diagnosis information
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.addDiagnosis} id="addDiagnosis">
                        <Modal.Body>
                            <h5>Name: </h5>
                            <textarea
                            cols="62"
                            rows="1"
                            id="name"
                            name="name"
                            onChange={this.handleChange} 
                            placeholder="Enter name"
                            required
                            />
                            <br/>
                            <br />
                            <h5>Details: </h5>
                            <textarea  rows="8" cols="62"
                            id="text"
                            name="text"
                            onChange={this.handleChange} 
                            placeholder="Enter details"
                            required />                          
                        
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="dugme1diag" variant="success" type="submit" >Add</Button>
                            <Button className="dugme2diag" variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>

        );
    }

}

export default AddDiagnosis