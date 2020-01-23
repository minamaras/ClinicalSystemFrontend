import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import '../css/DoctorVistisTable.css';
import note from '../icons/notes.svg'
import axios from 'axios';


class DoctorVistisTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
    }


    renderTableData() {
      console.log(this.props.content);
    return this.props.content.map((doctorVisit, index) => {
        //const { name, adress, description, clinicAdmin} = clinic
        //console.log(clinic)

        return (
            <Card key={index} className="cardContainer" >
            <Card.Img style={{height:'50px', width: 'auto'}} className="userIcon" variant="top" src={note} alt='Unavailable icon' />
                <Card.Body className = "cardBody">

                    <Card.Text className='cardText'>
                          <label><b>Examined by doctor: </b></label>
                          <label style={{'text-transform':'capitalize'}} >{doctorVisit.doctor.name} {doctorVisit.doctor.lastname}</label>
                          <br/>
                           <label><b>Date of visit: </b></label>
                           <label>{doctorVisit.somedate}</label>
                           <br/>
                            <label><b>Description about visit: </b></label>
                            <label> {doctorVisit.visitDescription}</label>
                            <br/>


                    </Card.Text>
                    <div className="addAdmin">
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

export default DoctorVistisTable
