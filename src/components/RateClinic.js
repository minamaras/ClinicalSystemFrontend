import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import { BrowserRouter as Router,Route,Link,withRouter} from "react-router-dom";
import moment from 'moment';
import StarRatings from 'react-star-ratings';
const UserAlert = withReactContent(Swal)

class RateClinic extends React.Component {

    constructor(props) {
        super(props);


        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);



        this.state = {
            show: false,
            clinic:'',
        };



    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }




    render() {
        return (
            <div>
                <Link id="changePassButton" onClick={this.handleShow}>
                    Rate this clinic
                </Link>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    size=".modal-sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"

                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Rating <label style={{'textTransform':'capitalize'}}>{this.props.clinic.name}</label>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                    Give your honest rating
                    <br/>
                    <StarRatings
                      rating={this.props.clinic.rating}
                      starRatedColor="blue"
                      numberOfStars={5}
                      name='rating'
                      svgIconPath="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
          c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                      svgIconViewBox="0 0 32 29.6"
                      changeRating={entry => {

                        let token = localStorage.getItem('token');
                        const options = {
                          headers: { 'Authorization': 'Bearer ' + token}
                              };

                        axios.get(`http://localhost:8081/api/clinics/updaterating/${this.props.clinic.id}/${entry}`,options).then(
                            (resp) => {

                              this.setState({ redirect: this.state.redirect === false });
                              window.location.reload();

                             },
                            (resp) => alert('greska rating'),
                          );

                      }
                      }
                      starHoverColor ='rgb(52, 174, 235)'
                      isAggregateRating= 'true'
                      starRatedColor= 'rgb(55, 146, 191)'
                      starDimension='30px'
                    />
                    </div>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default (RateClinic);
