import React from 'react';
import { Modal, Button, Card, InputGroup, FormControl } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios'
import Select from 'react-select';
import { Route, withRouter, Switch, Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import RoomCalendarOperation from './RoomCalendarOperation';
import CalendarOperationRooms from './CalendarOperationRooms';
import '../css/AssignRoomOperation.css';
const moment = require('moment');

class AssignRoomOperation extends React.Component{


    

    constructor(props){
        super(props);

    this.renderRooms = this.renderRooms.bind(this)
    this.tryRenderingCalendar = this.tryRenderingCalendar.bind(this)
    this.filterRooms = this.filterRooms.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
        
    this.state = {
        rooms: [],
        startingRooms: [],
        request: {},
        chosenDate: new Date(),
        dateString: '',
        inputdate: new Date(),
        //dateDay: ''

    }
    //this.chosenDate = this.state.request.start;
    var normaldate = this.state.inputdate.toISOString().substring(0,10);

        this.setState({
            dateString : normaldate,
        });

    }



    componentDidMount(){
        let token = localStorage.getItem('token');
        const options = {
             headers: { 'Authorization': 'Bearer ' + token}
        };


        axios.get(`http://localhost:8081/api/rooms/clinicsoperationrooms`,options).then(
            (resp) => {
                this.setState({
                    rooms : resp.data,
                    startingRooms: resp.data
                    
                })
                console.log(this.state.rooms)
            },
            (resp) =>{alert('greska sobe')},
          );

          axios.get(`http://localhost:8081/api/operationrequests/one/${this.props.match.params.id}`,options).then(
            (resp) => {
                var dateDay = new Date(parseInt(resp.data.start.substring(0, 4)), parseInt(resp.data.start.substring(5, 7))-1, parseInt(resp.data.start.substring(8, 11)),0,0,0);
                dateDay.setMinutes( dateDay.getMinutes() + dateDay.getTimezoneOffset() );
                console.log(dateDay)
                this.setState({
                    request : resp.data,
                    chosenDate: resp.data.start,
                    inputdate: dateDay
                })
                //console.log(this.state.request)
            },
            (resp) =>{alert('greska zahteva')},
          );
    }


    tryRenderingCalendar(room){


       if(this.state.dateString  !== undefined && this.state.dateString !== ''){
           console.log('gore usao')
           return(<CalendarOperationRooms {...room} {...this.state.request} dayDate={this.state.dateString}/>);
      }else {
          //this.setState({ chosenDate : this.state.request.start});
            console.log('dole usao')
          return(<CalendarOperationRooms {...room} {...this.state.request} dayDate={this.state.request.start}/>);
      }

    }

filterRooms(){
    let filtered = this.state.startingRooms.filter(room => {
        return this.state.search.toLowerCase() === room.name.toLowerCase() || this.state.search.toLowerCase() === room.number.toString().toLowerCase() ;
    })

    this.setState({rooms : filtered})
}

resetFilter(){
    this.setState({rooms : this.state.startingRooms})
}


handleChangeDate = date => {

    var dateString = date.toISOString().substring(0, 10);
    //console.log(dateString);

    this.setState({
        inputdate: date,
        dateString: dateString,

    });
console.log(this.state.dateString)

}



    renderRooms(){
        return this.state.rooms.map(room => {

            return(
                <div className="opRoomCard">
                    <Card>
                        <Card.Header className="opRoomHeader">
                            Operation room
                        </Card.Header>
                        <Card.Body>
                            <div className="rowOpCard">
                                <p className="leftOpRoom">Name:</p>
                                <p>{room.name}</p>
                            </div>
                            <div className="rowOpCard">
                                <p className="leftOpRoom">Number:</p>
                                <p>{room.number}</p>
                            </div>
                            {this.tryRenderingCalendar(room)}
                        </Card.Body>
                    </Card>
                </div>
            )
        })
    }


    render(){
        return(
            <div >
   
                <div className="divPretrageOp">
                <input type="text" placeholder="Enter room name or number"  name="search" className="searchRoomsOp" onChange={(e) => this.setState({...this.state, [e.target.name]: e.target.value})}/>

                <Button variant="light" className="btnFltrOp" onClick={this.filterRooms}>Filter</Button>
                <Button variant="dark" className="btnFltrOp" onClick={this.resetFilter}>Reset</Button>
                
                </div>
                <div className="dateDivOp">
                    <p>Choose other date if terms for this one are taken.</p>
                    <DatePicker
                        className="datePickerOperation"
                        name="datepicker"
                        class="datepicker"
                        selected={ this.state.inputdate}
                        onChange={this.handleChangeDate}
                        value= {this.state.inputValue}
                        minDate={moment().toDate()}
                    />
                </div>
     
                <div className="opRoomsContainer">
                    {this.renderRooms()}
                </div>
            </div>
        )
    }


}

export default withRouter(AssignRoomOperation);