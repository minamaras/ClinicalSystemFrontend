import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import nurseicon from '../icons/nurse.svg'
import '../css/NurseTable.css'

class NurseTable extends React.Component{
    
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    renderTableData() {
        return this.props.content.map((nurse, index) => {
            const { name, lastname, email} = nurse

            return (
                <Card key={name} className="cardContainerNurse" >
                <Card.Img style={{height:'130px', width: 'auto'}} variant="top" src={nurseicon} alt='Unavailable icon' />
                    <Card.Body className = "cardBody">
                        <Card.Title className="cardTitle" >{name}</Card.Title>
                        <Card.Text className='cardText'>

                               Lastname: {lastname}
                               <br/>
                               Email: {email}                             

                        </Card.Text>

                        
                    </Card.Body>
                </Card>
                )
            })
        }

        render() {
            return (
                <div className="containerRenderCardsNurse">
                    {this.renderTableData()}
                </div>
            )
        }


}

export default NurseTable;