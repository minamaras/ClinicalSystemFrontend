import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import RequestsTable from './RequestsTable';
import '../css/RegistrationRequestsPage.css'

class RegistrationRequestsPage extends React.Component{

    constructor(props) {
        super(props);
        this.state =  {
            requests: []
        }
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
