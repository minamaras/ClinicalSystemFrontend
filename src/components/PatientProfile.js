import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import usericon from '../icons/man.png'



class PatientProfile extends React.Component{

  constructor(props) {
      super(props);
}

render() {
    return (

        <Card style={{ height:'70x', width: '400px', left: '35%', top: '30px' }} className="car">
        <Card.Body>
        <Card.Title><b>User info</b></Card.Title>
        <Card.Text>

          <ListGroup variant="flush">
        <ListGroup.Item><b>Name</b>  {this.props.user.name} </ListGroup.Item>

        <ListGroup.Item><b>Lastname</b>  {this.props.user.lastname}</ListGroup.Item>

        <ListGroup.Item><b>Email</b>  {this.props.user.email}</ListGroup.Item>


        <ListGroup.Item></ListGroup.Item>
        </ListGroup>
        </Card.Text>
        <Button variant="primary">Update</Button>
        </Card.Body>
        </Card>


    )


}




}

export default withRouter(PatientProfile);
