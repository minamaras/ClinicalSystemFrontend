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
import DoctorsTerms from './DoctorsTerms';


class AllDoctorsFromClinicTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
    }




    renderTerms(doctor){

      if(doctor.hours != undefined){
        if(this.props.date != ''){

      return(<DoctorsTerms doctor={doctor} date={this.props.date} user={this.props.user} exam={doctor.exam}/>);
    }
    }else if(doctor.hours!= undefined && doctor.hours.lenght == 0) {
          return(<label>No avaliable terms for this date.</label>);
      }else{
        return;
      }

    }

    renderTableData() {
      console.log(this.props.content);


    return this.props.content.map((doctor, index) => {
        return (
            <Card key={doctor.name} className="cardContainerDoktoraProfila" >
            <Card.Title className="cardTitleDoktoraProfila" style={{'text-transform':'capitalize'}}><b>{doctor.name} {doctor.lastname}</b></Card.Title>


                <Card.Body className = "cardBodyDoktoraProfila">

                    <Card.Text className='cardTextDoktoraProfila'>
                          <label><b>Doctor does exam type: </b>{doctor.exam.name}</label>
                          <br/>
                          <label><b>Doctors rating: </b></label> &nbsp;
                          <label>{doctor.rating}</label>


                          <br/>
                          {this.renderTerms(doctor)}

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
