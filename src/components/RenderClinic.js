import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import clinic from '../icons/klinika.svg'
import axios from 'axios';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import '../css/RenderClinic.css';

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
            <Card key={c.name} className="cardContainerKlinikaSve" >
            <Card.Title className="cardTitleKlinikaSve"><b>{c.name}</b></Card.Title>


                <Card.Body className = "cardBodyKlinikaSve">

                    <Card.Text className='cardTextKlinikaSve'>
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
