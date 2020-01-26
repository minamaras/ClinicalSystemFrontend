import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import '../css/DoctorsTerms.css';
import { BrowserRouter as Router,Route,Link,withRouter} from "react-router-dom";


class DoctorsTerms extends React.Component {

    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderTerms = this.renderTerms.bind(this);


        this.state = {
            show: false,
            terms:[],
        };


    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    renderTerms(){

      return this.props.doctor.hours.map((term, index) => {
        if(this.props.date != ''){
          return (

            <Link className="singleterm" to ={{pathname:`/appointment/${this.props.doctor.id}/${this.props.date}/${term}/`}} >
            [{term}] &nbsp;
            </Link>

    )

  }

        });

    }


    render() {
        return (
            <div>
                <button id="showingtermsbutton"onClick={this.handleShow}>
                    Avaliable terms
                </button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Avalibale terms
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="explanation">
                    <p>Found a term that works for you? Clicking on it leads you  to a page for scheduling an appointment with doctor <u>{this.props.doctor.name} {this.props.doctor.lastname}</u> at choosen time</p>
                    </div>
                    <div className="avaliableTerms">
                    &nbsp;
                    {this.renderTerms()}
                    </div>
                    <br/>

                    <Button className="closetermsbutton" variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default (DoctorsTerms);
