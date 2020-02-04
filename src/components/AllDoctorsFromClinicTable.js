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
import StarRatings from 'react-star-ratings';


class AllDoctorsFromClinicTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
        this.renderTerms = this.renderTerms.bind(this);
        this.showRating = this.showRating.bind(this);


        this.state={
          rating:5,
        }

    }




    renderTerms(doctor){

      if(doctor.hours != undefined){
        if(this.props.date != ''){
          if(doctor.godisnji == 0){

      return(<DoctorsTerms doctor={doctor} date={this.props.date} user={this.props.user} exam={doctor.exam}/>);
    }
  }
    }else if(doctor.hours != undefined && doctor.hours.lenght == 0 ) {
          return(<label>No avaliable terms for this date.</label>);
      }else{
        return;
      }

    }


    showRating(doctor){

        return (
          <StarRatings
            rating={doctor.rating}
            starRatedColor="blue"
            numberOfStars={5}
            name='rating'
            starHoverColor ='rgb(52, 174, 235)'
            isAggregateRating= 'true'
            starRatedColor= 'rgb(55, 146, 191)'
            starDimension='25px'
            svgIconPath="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
            svgIconViewBox="0 0 32 29.6"
          />
        );
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
                          <br/>
                          {this.showRating(doctor)}

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
