import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import '../css/ClinicsFilteringTable.css';
import clinic from '../icons/klinika.svg'
import axios from 'axios';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import ClinicProfile from './ClinicProfile';
import StarRatings from 'react-star-ratings';
import dna from '../icons/dna.svg'


const PatientAlert = withReactContent(Swal)


class ClinicsFilteringTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
        this.RednderLink = this.RednderLink.bind(this);


    }


    RednderLink(c) {

      var number;

      if(this.props.date !== undefined && this.props.time !== undefined && this.props.exam !== undefined){

          number = 1;

        return(
        <Link name="linkforclinic"   to ={{pathname:`/clinic/${c.name.replace(/\s/g,'')}/${this.props.exam}/${this.props.date}/${this.props.time}`}} >Interested? Click here to see more about making an appointment at this clinic</Link>
    );
    }else{

        number = 0;


      return(
      <div className="ClinicProfileLink">
      <Link name="linkforclinic" to ={{pathname:`/clinic/${c.name.replace(/\s/g,'')}`}} >Visit {c.name}'s profile</Link>
      </div>
  );
  }
}


    renderTableData() {
      console.log(this.props.content);
    return this.props.content.map((c, index) => {
        //const { name, adress, description, clinicAdmin} = clinic
        //console.log(clinic)


        return (
            <Card key={c.name} className="cardContainerKlinika"
            style={{ backgroundColor:'aliceblue',border:'none',textAlign:'center'}}>

                <Card.Body className = "cardBodyKlinika">
                <Card.Img src={dna} style={{height:'28px',width:'28px',marginTop:'-50px'}}></Card.Img>
                <br/>
                  <label className="cardTitleKlinika"><b>{c.name}</b></label>
                    <Card.Text className='cardTextKlinika'>
                          <label><b>Address </b></label> &nbsp;
                          <label style={{'text-transform':'capitalize'}} >{c.adress}</label>
                          <br/>
                          <label><b> Rating </b></label>
                          <div>
                            <StarRatings
                              rating={c.rating}
                              starRatedColor="blue"
                              numberOfStars={5}
                              name='rating'
                              starHoverColor ='rgb(52, 174, 235)'
                              isAggregateRating= 'true'
                              starRatedColor= 'rgb(55, 146, 191)'
                              starDimension='30px'
                              svgIconPath="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z"
                              svgIconViewBox="0 0 20 20"
                            />
                            </div>
                          <br/>
                          <label><b> Exam price: </b></label> &nbsp;
                          <label>{c.examprice}</label>
                          <br/>
                          {this.RednderLink(c)}


                    </Card.Text>
                    <div className="addKlinika">
                    </div>


                </Card.Body>
            </Card>
            )
        })
    }



    render() {
      console.log(this.props);
        return (
            <div className="containerRenderCardsKlinika">
                {this.renderTableData()}
            </div>
        );

    }


}

export default (ClinicsFilteringTable)
