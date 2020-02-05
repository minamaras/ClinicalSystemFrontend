import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import '../css/OperationRequests.css'
import { ThemeProvider, Card, Button } from 'react-bootstrap';

const MedRecAlert = withReactContent(Swal)

class OperationRequests  extends React.Component{

    constructor(props) {
        super(props);

        this.renderRequests = this.renderRequests.bind(this);

        this.state = {
            requests: [],
        }
    }


    componentDidMount(){
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };


        axios.get(`http://localhost:8081/api/operationrequests/allrequests`, options).then(    
            (resp) => this.onSuccessHandler(resp),                
            (resp) => this.onErrorHandler(resp)
        );    

    }

    onErrorHandler(resp) {
        MedRecAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });
      
      }

      onSuccessHandler(resp){

          this.setState({
            requests : resp.data

        });

        console.log(this.state.requests)
      }


    renderRequests(){



        return(
            this.state.requests.map((request,i) => {
                
                var dateSplit = request.start.split('-');

                return(
                    <div>
                        <Card key={request.id} className="requestOpCard">
                            <Card.Header className="cardHOR">
                                {request.name}
                            </Card.Header>
                            <Card.Body className="cardBodyOR">
                                <div className="cardRowOR">
                                    <p className="leftOR">Patient email: </p>
                                    <p className="rightOR">{request.patientemail}</p>
                                </div>
                                <div className="cardRowOR">
                                    <p className="leftOR">Date: </p>
                                    <p className="rightOR">{dateSplit[2]}.{dateSplit[1]}.{dateSplit[0]}.</p>
                                </div>
                                <div className="cardRowOR">
                                    <p className="leftOR">Start time: </p>
                                    <p className="rightOR">{request.startTime}</p>
                                </div>
                                <div className="cardRowOR">
                                    <p className="leftOR">End time: </p>
                                    <p className="rightOR">{request.endTime}</p>
                                </div>
                            <Button variant="outline-info" className="ORBtn">Find a room</Button>
                            </Card.Body>
                            

                        </Card>
                    </div>
                )
            })
        )
    }
        



    render(){
        return(
            <div>
                <h1 id='manage'>Requests for operation</h1>
                <div className="opRequestsContainer">
                    {this.renderRequests()}
                </div>
            </div>
        )
    }

}

export default withRouter(OperationRequests)