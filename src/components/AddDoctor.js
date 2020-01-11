import React from 'react';
import ReactDOM from 'react-dom';
//import '../css/DoctorPage.css';
import { Modal, Button } from "react-bootstrap";
//import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import '../css/AddDoctor.css'

const DoctorCreatedAlert = withReactContent(Swal)

class AddDoctor extends React.Component {

    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addDoctor = this.addDoctor.bind(this);

        this.state = {
            show: false,
            name: '',
            lastname: '',
            email: '',
            password: '',
            specialization: '',
            rating: '',
            repeat: '',
            start: '',
            end: '',
            examType:'',
            examTypes:[]

        };


    }

    componentDidMount () {

      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
          };

      axios.get('http://localhost:8081/api/examtypes/all',options).then(
            (resp) => this.Success(resp),
            (resp) => this.onErrorHandler(resp),
          );


    }


Success(resp) {

      var tempexams = [];

      for (var i = 0; i < resp.data.length; i++) {
          tempexams.push(resp.data[i]);
      }

      this.setState({
          examTypes : tempexams,
      });


    }



    onChangeStart = startTime => this.setState({ start: startTime })

    onChangeEnd = endTime => this.setState({ end: endTime })

    addDoctor(event) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        if(this.state.password === this.state.repeat){

         axios.post("http://localhost:8081/api/doctors/savedoctor", this.state,options).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
        } else {
            DoctorCreatedAlert.fire({
                title: "Repeated password does not match!",
                text: '',
                type: "error",
                button: true
              });
        }
    }

    onErrorHandler(resp) {

        console.log(this.state);

        DoctorCreatedAlert.fire({
            title: "Error occured",
            text: '',
            type: 'error',
            icon: 'error',
            button: true
          });

    }

    onSuccessHandler(resp) {

      console.log(this.state);

        DoctorCreatedAlert.fire({
            title: "Doctor added successfully",
            text: "",
            type: 'success',
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
                <Button id="doctoradding" onClick={this.handleShow}>
                    Add a Doctor
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
                            Add a Doctor
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.addDoctor} id="addDoctorForm">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="name"
                                    name="name"
                                    onChange={this.handleChange}
                                    placeholder="Enter name"
                                    required
                                />
                                <br />
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="lastname"
                                    name="lastname"
                                    onChange={this.handleChange}
                                    placeholder="Enter lastname"
                                    required
                                />
                                <br />
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    name="email"
                                    onChange={this.handleChange}
                                    placeholder="Enter email"
                                    required
                                />
                                <br />
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control form-control-sm"
                                    id="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    placeholder="Enter password"
                                    required
                                />
                                <br />
                                <label htmlFor="password">Repeat Password</label>
                                <input type="password"
                                    className="form-control form-control-sm"
                                    name="repeat"
                                    onChange={this.handleChange}
                                    placeholder="Enter repeated password"
                                    required
                                />
                                <br />
                                <label htmlFor="specialization">Specialization</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="specialization"
                                    name="specialization"
                                    onChange={this.handleChange}
                                    placeholder="Enter specialization"
                                    required
                                />
                                <br />
                                <label htmlFor="rating">Rating</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="rating"
                                    name="rating"
                                    onChange={this.handleChange}
                                    placeholder="Enter rating"
                                    required
                                />
                                <br />
                                <label htmlFor="start">Start</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="start"
                                    name="start"
                                    onChange={this.handleChange}
                                    placeholder="Enter start hh:mm:ss"
                                    required
                                />
                                <br/>
                                <label htmlFor="end">End</label>
                                <input type="text"
                                    className="form-control form-control-sm"
                                    id="end"
                                    name="end"
                                    onChange={this.handleChange}
                                    placeholder="Enter end hh:mm:ss"
                                    required
                                />
                                <br/>
                                <label>Exam type</label>
                                <Select
                                className="selectoptions"
                                  onChange={entry => {
                                      this.setState({ examType: entry.value });
                                      console.log(entry);
                                  }}
                                  value={this.state.examType.name}

                                  options={
                                    this.state.examTypes.map((type, i) => {
                                    return {id: i,value:type, label: type.name};
                                  })
                                }

                                />



                            </div>
                            <hr/>
                            <Button className="dugmad" variant="secondary" className="dugme2dr" onClick={this.handleClose}>Close</Button>
                            <Button type="submit" variant="success" className="dugme1dr">Create</Button>

                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default AddDoctor;
