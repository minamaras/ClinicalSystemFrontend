import React from 'react'
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import usericon from '../icons/user.svg';
import '../css/RegistrationTable.css';

class RequestsTable extends React.Component{

    constructor(props) {
        super(props);
            
        this.renderTableData = this.renderTableData.bind(this);
    }
    

    renderTableData() {
    return this.props.content.map((request, index) => {
        const { name, lastname, email, password } = request

        return (
            <Card key={email.toString()} className="cardContainer" >
            <Card.Img style={{height:'130px', width: 'auto'}} className="userIcon" variant="top" src={usericon} />
                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >{email}</Card.Title>
                    <Card.Text className='cardText'>
                        
                           name: {name}
                           <br/>
                            lastname: {lastname}
                        
                    </Card.Text>
                    <Button className="acceptBtn" onClick={this.acceptRequest.bind(this, email)} variant="success">Accept</Button>
                    <Button className="declineBtn" onClick={this.declineRequest.bind(this, email)} variant="danger">Decline</Button>
                </Card.Body>
            </Card>
        )
        
    })
}

    render() {
        return (
            <div className="containerRenderCards">
                {this.renderTableData()}
            </div>
        )
    }

    acceptRequest(email){
        axios.post("http://localhost:8081/api/requests/confirmrequest", email).then(
            console.log(email),
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
          );
    }

    declineRequest(email){
        axios.post("http://localhost:8081/api/requests/declinerequest", email).then(
            console.log(email),
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
          );
    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    onSuccessHandler(response){
        //window.location.reload();
    }




}

export default RequestsTable