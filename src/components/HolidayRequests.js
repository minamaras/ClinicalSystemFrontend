import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import HolidayRequestsTable from './HolidayRequestsTable'
import '../css/HolidayRequests.css'

class HolidayRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.get("http://localhost:8081/api/holiday/all",options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );

    }

    onSuccessHandler(resp) {
        var tempRequests = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempRequests.push(resp.data[i]);
        }
        this.setState({
            requests: tempRequests
        });
    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    render() {
        return (
            <div className="container">
                <h1 id="manage">Requests for holiday</h1>
                <div className="row">

                    <div className="col-md-10">
                        <br />
                        <HolidayRequestsTable content={this.state.requests} />
                    </div>
                </div>
            </div>
        );
    }

}
export default HolidayRequests;