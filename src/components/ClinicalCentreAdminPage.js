import React from 'react'
import AddClinicalCentreAdmin from './AddClinicalCentreAdmin';
import ClinicalCentreAdminTable from './ClinicalCentreAdminTable';
import '../css/ClinicalCentreAdminPage.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter } from "react-router-dom";


class ClinicalCentreAdminPage extends React.Component{

    constructor(props) {
        super(props);
        this.state =  {
            ccadmins: []
        }

        this.addClinicalCentreAdmin = this.addClinicalCentreAdmin.bind(this);

        axios.get("http://localhost:8081/api/clinicalcentreadmins/all").then(
            (resp) => this.onSuccessHandlerccAdmin(resp),
            (resp) => this.onErrorHandlerccAdmin(resp)
        );
    }

    
    addClinicalCentreAdmin(ccadmin) {
        this.setState(prevState => ({
            ccadmins: [...prevState.ccadmins, ccadmin]
        }));
    }

    onSuccessHandlerccAdmin(resp) {
        var tempccAdmins = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempccAdmins.push(resp.data[i]);
        }
        this.setState({
            ccadmins: tempccAdmins
        });
    }

    onErrorHandlerccAdmin(response) {
        alert("Error response: Uncovered case");
    }


    
    render() {
        return (
            <div className="container">
                <h1 id="manage">Manage doctors</h1>
                <div className="row">
                    <div className="col-md-2">
                    <AddClinicalCentreAdmin />
                    </div>
                    <div className="col-md-10">
                        <br />
                        <ClinicalCentreAdminTable content={this.state.ccadmins} />
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(ClinicalCentreAdminPage);