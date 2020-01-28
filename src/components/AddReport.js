import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/AddReport.css';

const MedRecAlert = withReactContent(Swal)

class AddReport extends React.Component{

    constructor(props){
        super(props);


        

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderDiagnosisNames = this.renderDiagnosisNames.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.addReport = this.addReport.bind(this);

        this.state = {
            show: false,

            text: '',
            diagnosisNames: [],
            diagnosisName: '',
            
            patientemail: this.props.content,

        } 

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




    componentDidMount(){
        let token = localStorage.getItem('token');
        const options = {
          headers: { 
              'Authorization': 'Bearer ' + token,
              'Content-type' : 'text/plain'
            }
              };


        axios.get(`http://localhost:8081/api/diagnosis/alldiagnosisnames`,options).then(    
            (resp) => this.onSuccessHandlerMedication(resp),                
            (resp) => this.onErrorHandler(resp)
        );

    }

    onErrorHandler(resp) {
        MedRecAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });
      
      }
           
      
      onSuccessHandlerMedication(resp) {
      //console.log(resp.data)
        this.setState({     
            diagnosisNames: resp.data         
        });
    
    }
    
    renderDiagnosisNames(){
        return(
            this.state.diagnosisNames.map(dto => {
                return(
                    <option value={dto.name}>{dto.name}</option>
                )
            })
        )
    }

    handleSelect(e){
        this.setState({diagnosisName : e.target.value})

    }


    addReport(e){
        e.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
          headers: { 
              'Authorization': 'Bearer ' + token,
            }
              };

              let reportInfo = {
                text: this.state.text,
                diagnosisName: this.state.diagnosisName,
                patientemail: this.state.patientemail 
            }   

        axios.post(`http://localhost:8081/api/reports/addreport`, reportInfo, options).then(    
            (resp) => this.onSuccessHandlerReport(resp),                
            (resp) => this.onErrorHandler(resp)
        );

    }

    onSuccessHandlerReport(resp){
        MedRecAlert.fire({
            title: "Report is successfully added!",
            text: '',
            type: "success",
            icon: 'success',
            button: true
          });
          window.location.reload();
    }



    render(){
        return(
            <div className="modalDiv">
                <button className="reportAdding" onClick={this.handleShow}>
                    Add report
                </button>
                <Modal  
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Add report for this appointment
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.addReport}>
                    <Modal.Body>
                        
                        <div>
                        <Form.Row className="formRowReport">
                        <label className="labelRep">Content:</label>
                        <textarea rows='6' cols='80'
                                    className="textareaReport"
                                    id="text"
                                    name="text"
                                    onChange={this.handleChange}
                                    placeholder="Enter report content"
                                    
                        />
                       
                        </Form.Row>

                        <Form.Row className="formRowReport">
                        <label className="labelRep">Diagnose:</label>
                        <select className="selectD" defaultValue="None" onChange={this.handleSelect}>
                        <option value="None">None</option>
                            {this.renderDiagnosisNames()}
                        </select>
                        </Form.Row>
                        
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="outline-primary" style={{float: 'right', margin: '0 10px 0 0'}}>Submit</Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }


}

export default AddReport