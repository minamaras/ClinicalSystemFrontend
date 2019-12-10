import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import hospitalicon from '../icons/surgeon.svg'
import '../css/DoctorTable.css'


const DoctorDeletedAlert = withReactContent(Swal)
class DoctorTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    deleteDoctor(doctor) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        //console.log(doctor.email);

         axios.post("http://localhost:8081/api/doctors/deletedoctor", doctor, options).then(
             console.log(doctor),
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
        return this.props.content.map((doctor, index) => {
            const { name, lastname, email, specialization, rating} = doctor

            return (
                <Card key={name} className="cardContainerDoctor" >
                <Card.Img style={{height:'130px', width: 'auto'}} className="userIcon" variant="top" src={hospitalicon} alt='Unavailable icon' />
                    <Card.Body className = "cardBody">
                        <Card.Title className="cardTitle" >{name}</Card.Title>
                        <Card.Text className='cardText'>

                               Lastname: {lastname}
                               <br/>
                               Email: {email}
                               <br/>
                               Specialization: {specialization}
                               <br/>
                               Rating: {rating}

                        </Card.Text>

                        <Button className="deleteDoctor" variant="danger" onClick={this.deleteDoctor.bind(this, doctor)} >Delete</Button>

                    </Card.Body>
                </Card>
                )
            })
        }

        render() {
            return (
                <div className="containerRenderCardsDoctor">
                    {this.renderTableData()}
                </div>
            )

        }
}
export default DoctorTable;
