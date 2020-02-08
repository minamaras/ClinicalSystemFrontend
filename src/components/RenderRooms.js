import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import clinic from '../icons/klinika.svg'
import axios from 'axios';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import '../css/RenderRooms.css';
import ShowRoomCalendar from './ShowRoomCalendar';

const PatientAlert = withReactContent(Swal)


class RenderRooms extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
        this.tryRenderingCalendar = this.tryRenderingCalendar.bind(this);



    }

    tryRenderingCalendar(room){

        console.log(room);


       if(room  !== undefined && this.props.date !== ''){

           return(<ShowRoomCalendar room={room} date={this.props.date} request={this.props.request}/>);
       }else {
           return(<div></div>);
       }

    }



    renderTableData() {

    return this.props.rooms.map((r, index) => {
        //const { name, adress, description, clinicAdmin} = clinic
        //console.log(clinic)


        return (
            <Card key={r.name} className="cardContainerRoom" style={{margin:'0px 32px 20px 0px'}}>
            <Card.Title style={{textAlign:'center'}}>{r.name}</Card.Title>


                <Card.Body >

                    <Card.Text >
                          <label>Room number:</label> &nbsp;
                          <label style={{'text-transform':'capitalize'}} >{r.number}</label>
                          <br/>
                          <label> Exam type: </label>
                          <br/>
                          <label>{r.type.name}</label>
                          {this.tryRenderingCalendar(r)}
                          

                    </Card.Text>
                    <div>
                    </div>


                </Card.Body>
            </Card>
            )
        })
    }



    render() {
      console.log(this.props);
        return (
            <div className="containerRenderCardsClinic" style={{margin:'-50px -90px 0px -90px'}}>
                {this.renderTableData()}
            </div>
        );

    }


}

export default (RenderRooms)
