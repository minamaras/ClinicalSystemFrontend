import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Button, FormGroup, Card, ControlLabel } from "react-bootstrap";
import 'react-table-6/react-table.css';
import AssignRoom from './AssignRoom';
var ReactTable = require('react-table-6').default;

class AppointmentReqTable extends React.Component {

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    renderTableData() {
        console.log(this.props.content);
      return this.props.content.map((r, index) => {
  
  
          return (
              <Card key={r.doctorEmail} className="cardContainerKlinikaSve" >
              <Card.Title className="cardTitleKlinikaSve"><b>{r.doctorEmail}</b></Card.Title>
  
  
                  <Card.Body className = "cardBodyKlinikaSve">
  
                      <Card.Text className='cardTextKlinikaSve'>
                            <label><b>Exam type: </b></label> &nbsp;
                            <label style={{'text-transform':'capitalize'}} >{r.examTypeName}</label>
                            <br/>
                            <label><b> Date: </b></label>&nbsp;
                            <label>{r.date}</label>
                            <br/>
                            <label><b> Doctor: </b></label>&nbsp;
                            <label>{r.doctorEmail}</label>
                            <br/>
                            <label><b> Duration: </b></label> &nbsp;
                            <label>{r.startTime + "-" + r.endTime}</label>
                            <br/>
  
                      </Card.Text>
                      <div className="addKlinikaSve">
                      </div>

                     <AssignRoom/>                                                                                     
  
  
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