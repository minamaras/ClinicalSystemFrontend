import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import roomicon from '../icons/surgery-room.svg'
import '../css/OperationRoom.css'


const DoctorDeletedAlert = withReactContent(Swal)
class OperationRoomTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    deleteRoom(room) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        //console.log(doctor.email);

         axios.post("http://localhost:8081/api/rooms/deleteroom", room, options).then(
             console.log(room),
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onErrorHandler(resp) {
      console.log("error");
      alert("error");

    }

    onSuccessHandler(resp) {
        window.location.reload();
    
    }

    renderTableData() {
        
        return this.props.content.map((room, index) => {
            const { name, number, isReserved} = room

            let reserve;

            if(isReserved === false) {
                reserve = 'Yes'
            } else {
                reserve = 'No'
            }

            console.log(room)
    
            return (
                <Card key={name} className="cardContainerRoom" >
                <Card.Img style={{height:'130px', width: 'auto'}} className="userIcon" variant="top" src={roomicon} alt='Unavailable icon' />
                    <Card.Body className = "cardBodyRoom">
                        <Card.Title className="cardTitleRoom" >{name}</Card.Title>
                        <Card.Text className='cardTextRoom'>
                            
                               Number: {number}
                               <br/>
                               Reserved : {reserve}
                               
                               <br/>
                            
                        </Card.Text>
                        <Button className="deleteRoom" variant="outline-danger" onClick={this.deleteRoom.bind(this, room)} >Delete</Button>
    
                    </Card.Body>
                </Card>
                )
            })
        }
    
        render() {
            return (
                <div className="rendercardsroom">
                    {this.renderTableData()}
                </div>
            )
    
        }
}
export default OperationRoomTable;
