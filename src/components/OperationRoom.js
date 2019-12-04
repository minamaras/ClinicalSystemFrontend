import React from 'react';
import AddOperationRoom from './AddOperationRoom';
import OperationRoomTable from './OperationRoomTable';
import axios from 'axios';
import { withRouter } from "react-router-dom";


class OperationRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            rooms: []
        }

        this.addRoom = this.addRoom.bind(this);


        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.get("http://localhost:8081/api/rooms/all",options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );
    }

    addRoom(room) {
        this.setState(prevState => ({
            rooms: [...prevState.rooms, room]
        }));
    }

    onSuccessHandler(resp) {
        var tempRooms= [];

        for (var i = 0; i < resp.data.length; i++) {
            tempRooms.push(resp.data[i]);
        }
        this.setState({
            rooms: tempRooms
        });
    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }


    render() {
        return (
            <div className="container">
                <h1 id="manage">Manage operation rooms</h1>
                <div className="row">
                    <div className="col-md-2">
                    <AddOperationRoom/>
                    </div>
                    <div className="col-md-10">
                        <br />
                        <OperationRoomTable content={this.state.rooms} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(OperationRoom);
