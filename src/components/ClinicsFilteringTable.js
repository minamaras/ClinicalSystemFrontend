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
      <Link name="linkforclinic" to ={{pathname:`/clinic/${c.name.replace(/\s/g,'')}`}} >Interested? Click here to see more about making an appointment at this clinic</Link>
  );
  }
}


    renderTableData() {
      console.log(this.props.content);
    return this.props.content.map((c, index) => {
        //const { name, adress, description, clinicAdmin} = clinic
        //console.log(clinic)


        return (
            <Card key={c.name} className="cardContainer" >
            <Card.Title className="cardTitle"><b>{c.name}</b></Card.Title>


                <Card.Body className = "cardBody">

                    <Card.Text className='cardText'>
                          <label><b>Address </b></label> &nbsp;
                          <label style={{'text-transform':'capitalize'}} >{c.adress}</label>
                          <br/>
                          <label><b> Rating </b></label>&nbsp;
                          <label>{c.rating}</label>
                          <br/>
                          <label><b> Exam price: </b></label> &nbsp;
                          <label>{c.examprice}</label>
                          <br/>
                          {this.RednderLink(c)}


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

export default (ClinicsFilteringTable)
