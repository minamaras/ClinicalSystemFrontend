import React from "react";
import {Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Form, DropdownButton, Button, ControlLabel, Dropdown,Card } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

class BusinessReport extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }


    }

    render() {
        return( 
            <div>
            <Card className="cardAppReq" >
              <Card.Title className="cardTitleKlinikaSve">Business Report</Card.Title>
  
                
                  <Card.Body className = "cardBodyKlinikaSve">
  
                      <Card.Text className='cardTextKlinikaSve'>
                            <label><b>Clinic rating </b></label> &nbsp;
                            <br/>
                            <label><b>Average doctor rating: </b></label>&nbsp;
                            <br/>
  

                      </Card.Text>
                      <AssignRoom app = {r}/>
                     <Button id="checkbtn"onClick={ () => this.checkAvailableRooms(r) }>Check for available rooms</Button>
                     <br/>                                                                                    
  
  
                  </Card.Body>
              </Card>
            </div>
        )
    }

} export default withRouter(BusinessReport);