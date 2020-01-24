import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import '../css/AllDoctorsFromAClinicTable.css';
import clinic from '../icons/klinika.svg'
import axios from 'axios';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import ClinicProfile from './ClinicProfile';


class AllDoctorsFromClinicTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
        this.check = this.check.bind(this);
    }


check(hours){

  if( hours !== undefined){
 return(<label name="avaliableterms">Avaliable terms this doctor has for date <u> {this.props.date}:</u></label>);
}else{
  return(<label name="avaliableterms"></label>);
}


}

    renderTerms(data){

      if(data != undefined){
      return data.map((term, index) => {
          return (
            <Link>
            [{term}]   &nbsp;
            </Link>


    )

        });
      }else {
        return;
      }

    }

    renderTableData() {
      console.log(this.props.content);


    return this.props.content.map((doctor, index) => {
        //const { name, adress, description, clinicAdmin} = clinic
        //console.log(clinic)



        return (
            <Card key={doctor.name} className="cardContainerDoktoraProfila" style={{height:'auto',left:'50px'}} >
            <Card.Title className="cardTitleDoktoraProfila" style={{'text-transform':'capitalize'}}><b>{doctor.name} {doctor.lastname}</b></Card.Title>


                <Card.Body className = "cardBodyDoktoraProfila">

                    <Card.Text className='cardTextDoktoraProfila'>
                          <label><b>Doctor does exam type: </b>{doctor.exam}</label>
                          <br/>
                          <label><b>Doctors rating: </b></label> &nbsp;
                          <label>{doctor.rating}</label>

                          <br/>
                          {this.check(doctor.hours)}
                          <ul className="termini">
                          {this.renderTerms(doctor.hours)}
                          </ul>
                    </Card.Text>
                    <div className="addDoktoraProfila">
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

export default (AllDoctorsFromClinicTable)
