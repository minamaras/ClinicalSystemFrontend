import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import clinic from '../icons/klinika.svg'
import axios from 'axios';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import '../css/RenderClinic.css';
import StarRatings from 'react-star-ratings';

const PatientAlert = withReactContent(Swal)


class RenderClinic extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
        this.RednderLink = this.RednderLink.bind(this);


    }


    RednderLink(c) {

      return(
      <Link name="linkforclinic" to ={{pathname:`/clinic/${c.name.replace(/\s/g,'')}`}} >Visit {c.name}'s profile</Link>
  );

}


    renderTableData() {
      console.log(this.props.content);
    return this.props.content.map((c, index) => {
        //const { name, adress, description, clinicAdmin} = clinic
        //console.log(clinic)


        return (
            <Card  style={{outline: 'none',border: 'none'}} key={c.name} className="cardContainerKlinikaSve">
            <Card.Title className="cardTitleKlinikaSve"><b>{c.name}</b></Card.Title>


                <Card.Body className = "cardBodyKlinikaSve">

                    <Card.Text className='cardTextKlinikaSve'>
                          <label><b>Address </b></label> &nbsp;
                          <label style={{'text-transform':'capitalize'}} >{c.adress}</label>
                          <br/>
                          <label><b> Rating </b></label>
                          <br/>
                          <StarRatings
                            rating={c.rating}
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
                          <br/>

                          <br/>
                          {this.RednderLink(c)}


                    </Card.Text>
                    <div className="addKlinikaSve">
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

export default (RenderClinic)
