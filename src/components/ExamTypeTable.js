import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import '../css/ClinicTable.css';
import hospitalicon from '../icons/hospital.svg'
import AddAdminToClinic from './AddAdminToClinic'
import axios from 'axios';
import EditExamType from './EditExamType';

class ExamTypeTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
    }

    deleteExamType(examtype) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        //console.log(doctor.email);

         axios.post("http://localhost:8081/api/examtypes/deletetype", examtype, options).then(
           
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
    return this.props.content.map((examtype, index) => {
        const { name, price} = examtype

        return (
            <Card key={name} className="cardContainer" >
            <Card.Img style={{height:'130px', width: 'auto'}} className="userIcon" variant="top" src={hospitalicon} alt='Unavailable icon' />
                <Card.Body className = "cardBody">
                    <Card.Title className="cardTitle" >{name}</Card.Title>
                    <Card.Text>
                        Price: {price}
                    </Card.Text>
                    <div className="addAdmin">
                    <Button className="deleteExamType" variant="danger" onClick={this.deleteExamType.bind(this, examtype)} >Delete</Button>
                    </div>
                    <EditExamType content={examtype}/>
                   

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

export default ExamTypeTable
