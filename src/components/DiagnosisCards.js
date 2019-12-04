import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import '../css/DiagnosisCards.css';
import hospitalicon from '../icons/hospital.svg'
import AddAdminToClinic from './AddAdminToClinic'
import axios from 'axios';

class DiagnosisCards extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
    }

   
    renderTableData() {
    return this.props.content.map((diagnosis, index) => {
        const { name, text} = diagnosis
        console.log(diagnosis)

        return (
            <Card key={name} className="cardDContainer" >
            
                <Card.Body className = "cardDBody">
                    <Card.Title className="cardDTitle" >{name}</Card.Title>
                    <Card.Text className='cardDText'>

                            {text}
                            <br/>
                        
                    </Card.Text>

                </Card.Body>
            </Card>
            )
        })
    }

    render() {
        return (
            <div className="containerRendDiag">
                {this.renderTableData()}
            </div>
        )

    }





}

export default DiagnosisCards
