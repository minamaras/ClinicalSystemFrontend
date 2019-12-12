import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import '../css/ClinicTable.css';
import hospitalicon from '../icons/hospital.svg'
import AddAdminToClinic from './AddAdminToClinic'
import axios from 'axios';
import ClinicAdminForm from './ClinicAdminForm'

class ClinicTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
    }

   
    renderTableData() {
    return this.props.content.map((clinic, index) => {
        const { name, adress, description, clinicAdmin} = clinic
        console.log(clinic)

        return (
            <Card key={name} className="cardContainer" >
            <Card.Img style={{height:'130px', width: 'auto'}} className="userIcon" variant="top" src={hospitalicon} alt='Unavailable icon' />
                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >{name}</Card.Title>
                    <Card.Text className='cardText'>
                        
                           Adress: {adress}
                           <br/>
                            Description: {description}
                            <br/>
                        
                    </Card.Text>
                    <div className="addAdmin">
                      <ClinicAdminForm id={name} />
                    </div>
                   

                </Card.Body>
            </Card>
            )
        })
    }

    render() {
        return (
            <div className="containerRenderCardsClinic">
                {this.renderTableData()}
            </div>
        )

    }





}

export default ClinicTable
