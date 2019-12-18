import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import '../css/EditExamType.css'

const TypeCreatedAlert = withReactContent(Swal)

class EditExamType extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.SendUpdateRequest = this.SendUpdateRequest.bind(this);

        this.state = {
            show: false,
            name: '',
            price: ''
        };
    }

    SendUpdateRequest = event => {
        event.preventDefault();
     
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
     
        this.state.name = this.props.content.name;
        console.log(this.state);
     
         axios.post("http://localhost:8081/api/examtypes/update",this.state,options).then(
           (resp) => this.onSuccessHandler(resp),
           (resp) => this.onErrorHandler(resp)
         );
     
     
     }

    onErrorHandler(resp) {
        TypeCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true,
            icon: 'error'
          });

    }

    onSuccessHandler(resp) {

        TypeCreatedAlert.fire({
            title: "Exam type updated successfully",
            text: "",
            type: "success",
            icon: 'success'
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
                <Button id="examedit" onClick={this.handleShow}>
                    Edit
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
                            Edit exam type
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.SendUpdateRequest} id="editexamform">
                            <div className="form-group">
                                <p>Name: {this.props.content.name}</p>
                                <br/>
                                <input type="number"
                                    className="form-control form-control-sm"
                                    id="price"
                                    name="price"
                                    onChange={this.handleChange}
                                    placeholder={this.props.content.price}
                                    required
                                />
                                <br/>
                            </div>
                            <hr/>
                            <Button className="dugmad" variant="secondary" className="dugme2dr" onClick={this.handleClose}>Close</Button>
                            <Button type="submit" className="editExamdugme">Edit</Button>
                            
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default EditExamType;
