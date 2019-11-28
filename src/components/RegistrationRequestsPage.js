import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import RequestsTable from './RequestsTable';
import '../css/RegistrationRequestsPage.css';
import axios from 'axios';

class RegistrationRequestsPage extends React.Component{

    constructor(props) {
        super(props);
        this.state =  {
            requests: []
        }

        axios.get("http://localhost:8081/api/requests/allrequests").then(
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
                <h1 id="manage">Requests for registration</h1>
                <div className="row">

                    <div className="col-md-10">
                        <br />
                        <RequestsTable content={this.state.requests} />
                    </div>
                </div>
            </div>
        );
    }






}

export default RegistrationRequestsPage
