import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import '../css/ClinicDoctorTable.css';
import clinic from '../icons/klinika.svg'
import axios from 'axios';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import ClinicProfile from './ClinicProfile';


class ClinicDoctorTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
    }


    renderTerms(data){

      return data.map((term, index) => {
          return (
            <Link>
            [{term}]   &nbsp;
            </Link>


    )

        });

    }

    renderTableData() {
      console.log(this.props.content);
    return this.props.content.map((doctor, index) => {
        //const { name, adress, description, clinicAdmin} = clinic
        //console.log(clinic)

        return (
            <Card key={doctor.name} className="cardContainer" style={{height:'auto',left:'50px'}} >
            <Card.Title className="cardTitle" style={{'text-transform':'capitalize'}}><b>{doctor.name} {doctor.lastname}</b></Card.Title>


                <Card.Body className = "cardBody">

                    <Card.Text className='cardText'>
                          <label><b>Doctors rating: </b></label> &nbsp;
                          <label>{doctor.rating}</label>

                          <br/>
                          <label>Avaliable terms this doctor has for date <u> {this.props.date}:</u></label>
                          <ul className="terms">
                          {this.renderTerms(doctor.hours)}
                          </ul>
                    </Card.Text>
                    <div className="addAdmin">
                    </div>


                </Card.Body>
            </Card>
            )


      })
    }



    render() {
      console.log(this.props);
        return (
            <div className="containerRenderCardsClinic">
                {this.renderTableData()}
            </div>
        );

    }


}

export default (ClinicDoctorTable)
