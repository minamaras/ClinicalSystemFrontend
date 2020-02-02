import React from 'react';
import { withRouter,Link } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../css/Exams.css';
import kalendar from '../icons/kalendar.svg';
import old from '../icons/old.svg';

const PatientAlert = withReactContent(Swal)


class Exams extends React.Component{

  constructor(props) {
      super(props);

      this.renderUpcomin = this.renderUpcoming.bind(this);
      this.showUpcoming = this.showUpcoming.bind(this);



      this.state={
        upcoming:[],
        old: []
      }

      }



componentDidMount () {

            let token = localStorage.getItem('token');
            const options = {
              headers: { 'Authorization': 'Bearer ' + token}
                  };

            axios.get('http://localhost:8081/api/appointments/all',options).then(
                      (resp) => {
                          this.setState({
                            upcoming:resp.data,
                          });},
                      (resp) => alert('greska'),);

            axios.get('http://localhost:8081/api/appointments/allold',options).then(
                    (resp) => {
                      console.log(resp.data);
                      this.setState({
                      old:resp.data,
                    });
                  },
                  (resp) => alert('greska'),
                  );


        }


renderUpcoming(){

  return this.state.upcoming.map((ap,index) => {
    console.log(ap);
    return (

      <Card className="cardContainerPregled" >
      <Card.Title className="cardTitlePregled"><b>{ap.name}</b></Card.Title>


          <Card.Body className = "cardBodyPregled">

              <Card.Text className='cardTextPregled'>
                    <label><b>Appointment type:</b></label> &nbsp;
                    <label style={{'text-transform':'capitalize'}} >{ap.type.name}</label>
                    <br/>
                    <label><b> Appointment date : </b></label>&nbsp;
                    <label>{ap.date.toString()}</label>
                    <br/>
                    <label><b> Appointment time : </b></label>&nbsp;
                    <label>{ap.startTime}</label>
                    <br/>
                    <label><b> Appointment end time : </b></label>&nbsp;
                    <label>{ap.endTime}</label>
                    <br/>
                    <label><b> Appointment room : </b></label>&nbsp;
                    <label>{ap.roomNumber}</label>
                    <br/>
              </Card.Text>
              <div className="addKlinikaPregled">
              </div>


          </Card.Body>
      </Card>
    );

  });
}

renderOld(){

  return this.state.old.map((ap,index) => {
    console.log(ap);
    return (

      <Card className="cardContainerPregled" >
      <Card.Title className="cardTitlePregled"><b>{ap.name}</b></Card.Title>


          <Card.Body className = "cardBodyPregled">

              <Card.Text className='cardTextPregled'>
                    <label><b>Appointment type:</b></label> &nbsp;
                    <label style={{'text-transform':'capitalize'}} >{ap.type.name}</label>
                    <br/>
                    <label><b> Appointment date : </b></label>&nbsp;
                    <label>{ap.date.toString()}</label>
                    <br/>
                    <label><b> Appointment time : </b></label>&nbsp;
                    <label>{ap.startTime}</label>
                    <br/>
                    <label><b> Appointment end time : </b></label>&nbsp;
                    <label>{ap.endTime}</label>
                    <br/>
                    <label><b> Appointment room : </b></label>&nbsp;
                    <label>{ap.roomNumber}</label>
                    <br/>
              </Card.Text>
              <div className="addKlinikaPregled">
              </div>


          </Card.Body>
      </Card>
    );

  });
}


showUpcoming(){

document.getElementById("druga").style.display ='block';
document.getElementById("velika").style.display ='none'
document.getElementById("treca").style.display ='none'
document.getElementById("druga").style.margin="100px 0px 0px 0px";
//this.renderUpcoming();
}

showOld(){

document.getElementById("treca").style.display ='block';
document.getElementById("velika").style.display ='none'
document.getElementById("druga").style.display ='none'
document.getElementById("treca").style.margin="100px 0px 0px 0px";
//this.renderUpcoming();
}

Back(){

document.getElementById("druga").style.display ='none'
document.getElementById("velika").style.display ='block'
document.getElementById("velika").style.margin="250px 0px 0px 250px";
//this.renderUpcoming();
}

BackTo(){

document.getElementById("druga").style.display ='none';
document.getElementById("treca").style.display ='none';
document.getElementById("velika").style.display ='block'
document.getElementById("velika").style.margin="250px 0px 0px 250px";
//this.renderUpcoming();
}

render() {

    return (



        <div>
        <Card className="velikak" id="velika" style={{display:'block'}}>

        <div className="nekiprostor"></div>
        <div>
        <Button variant="light" onClick={this.showUpcoming} className="upcoming" style={{margin:'-50px 0px 0px 50px',width:'200px',height:'100px'}}>
        See upcoming exams</Button>
        <Button variant="light"onClick={this.showOld} className="old" style={{margin:'-50px 0px 0px 50px',width:'200px',height:'100px'}}>
        See previous exams</Button>
        </div>
        </Card>
        <Card id="druga"className="drugak" style={{display:'none'}}>
        <Button variant="light" onClick={this.Back} style={{width:'100px',height:'40px',margin:'0px 0px 0px 0px'}}>Back</Button>
        <Card.Img src={kalendar} style={{heigh:'150px',width:'150px',margin:'0px 0px 0px 0px'}}></Card.Img>
        {this.renderUpcoming()}
        </Card>
        <Card id="treca" className="trecak" style={{display:'none'}}>
        <Button variant="light" onClick={this.BackTo} style={{width:'100px',height:'40px',margin:'0px 0px 0px 0px'}}>Back</Button>
        <Card.Img src={old} style={{heigh:'150px',width:'150px',margin:'0px 0px 0px 0px'}}></Card.Img>
        {this.renderOld()}
        </Card>
        </div>



    );


}





}


export default withRouter(Exams);
