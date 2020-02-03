import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import 'react-table-6/react-table.css';
import '../css/AppointmentRequestTable.css'
import AssignRoom from './AssignRoom';
import {Route, withRouter, Switch, Link } from "react-router-dom";
const moment = require('moment');
//var ReactTable = require('react-table-6').default;

class AppointmentReqTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }

        this.renderTableData = this.renderTableData.bind(this);
        



    }

   
    renderTableData() {
        console.log(this.props.content);

      return this.props.content.map((r, index) => {
          console.log(r);
          var datestr = r.start.toString().substring(0,10);
          let datum = moment(r.start);
          let formatDate =datum.format().toString().substring(0,10);

          return (
              <Card key={r.doctorEmail} className="cardAppReq" >
              <Card.Title className="cardTitleKlinikaSve"></Card.Title>


                  <Card.Body className = "cardBodyKlinikaSve">

                      <Card.Text className='cardTextKlinikaSve'>
                            <label><b>Exam type: </b></label> &nbsp;
                            <label style={{'text-transform':'capitalize'}} >{r.examTypeName}</label>
                            <br/>
                            <label><b> Date: </b></label>&nbsp;
                            <label>{formatDate}</label>
                            <br/>
                            <label><b> Doctor: </b></label>&nbsp;
                            <label>{r.doctorEmail}</label>
                            <br/>
                            <label><b> Duration: </b></label> &nbsp;
                            <label>{r.startTime + "-" + r.endTime}</label>
                            <br/>


                      </Card.Text>
                     
                     <br/>

                     <Link to={{pathname:`/room/${r.id}`, state :{data : r} } }>Assign a room to this appointment</Link>
                  </Card.Body>
                  
              </Card>
              )
          })
      }

    render() {
        return (
            <div className="containerRenderCards">
                {this.renderTableData()}
            </div>
        )
    }
} export default AppointmentReqTable;
