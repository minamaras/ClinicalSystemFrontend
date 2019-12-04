import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import addicon from '../icons/add.svg'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MedicationAlert = withReactContent(Swal)

class AddMedication extends React.Component{

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addMedication = this.addMedication.bind(this);
        


        this.state = {
            show: false,
            medication: []
            
        };
    }

    
    addMedication(event) {
        event.preventDefault();


         axios.post("http://localhost:8081/api/medication/addmedication", this.state).then(
             (resp) => this.onSuccessHandlerccAdmin(resp),
             (resp) => this.onErrorHandlerccAdmin(resp)
         );

    }

    onErrorHandlerccAdmin(resp) {
        MedicationAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });

    }

    onSuccessHandlerccAdmin(resp) {

        MedicationAlert.fire({
            title: "Medication added successfully",
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
                 <img src={addicon} id='medicationBtn' onClick={this.handleShow} className="addMedicBtn" style={{height:'50px', width: 'auto', margin: '4px'}} alt='add' />
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Enter medication information
                        </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.addMedication} id="addMedication">
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
                            <Button className="dugme1" variant="success" type="submit" >Add</Button>
                            <Button className="dugme2" variant="secondary" onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>

        );
    }

}

export default AddMedication