import React from 'react'
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import usericon from '../icons/user.svg';
import '../css/RegistrationTable.css';
import EMailRejection from './EmailRejection';

class RequestsTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }


    renderTableData() {
    return this.props.content.map((request, index) => {
        const { name, lastname, email, password } = request

        return (
            <div className="divCardReg">
            <Card key={email.toString()} className="cardContainerReg" >
            <Card.Img style={{height:'130px', width: 'auto'}} className="userIcon" variant="top" src={usericon} alt="Unavailable icon" />
                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >{email}</Card.Title>
                    <Card.Text className='cardText'>

                           name: {name}
                           <br/>
                            lastname: {lastname}

                    </Card.Text>
                    <Button className="acceptBtn" onClick={this.acceptRequest.bind(this, request)} variant="success">Accept</Button>
                    <div className="declineBtn">
                         <EMailRejection id={email} />
                    </div>

                </Card.Body>
            </Card>
            </div>
        )

    })
}

    render() {
        return (
            <div className="containerRenderCardsReq">
                {this.renderTableData()}
            </div>
        )
    }

    acceptRequest(request){

      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

        axios.post("http://localhost:8081/api/requests/confirmrequest", request,options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
          );
    }


    onErrorHandler(resp) {
        alert("Error response: Uncovered case");
    }

    onSuccessHandler(resp){
        window.location.reload();
    }




}

export default RequestsTable
