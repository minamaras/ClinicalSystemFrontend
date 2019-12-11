import React from 'react';
import ClinicForm from './ClinicForm';
import ClinicTable from './ClinicTable';
import '../css/ClinicPage.css';
import axios from 'axios';
import ClinicAdminForm from './ClinicAdminForm';
import ClinicAdminTable from './ClinicAdminTable';
import '../css/ClinicPage.css'
import { withRouter } from "react-router-dom";


class ClinicPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clinics: [],
            clinicadmins: []
        }

        this.addClinic = this.addClinic.bind(this);
        this.addClinicAdmin = this.addClinicAdmin.bind(this);


        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };


        axios.get("http://localhost:8081/api/clinics/allclinics",options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );


        axios.get("http://localhost:8081/api/clinicadmin/all",options).then(
            (resp) => this.onSuccessHandlerClinicAdmin(resp),
            (resp) => this.onErrorHandlerClinicAdmin(resp)
        );

        


    }

    addClinic(clinic) {
        this.setState(prevState => ({
            clinics: [...prevState.clinics, clinic]
        }));

    }

    addClinicAdmin(clinicadmin) {
        this.setState(prevState => ({
            clinicadmins: [...prevState.clinicadmins, clinicadmin]
        }));
    }

    onSuccessHandler(resp) {
        var tempClinics = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempClinics.push(resp.data[i]);
        }
        this.setState({
            clinics: tempClinics
        });
    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    onSuccessHandlerClinicAdmin(resp) {
        var tempClinicAdmins = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempClinicAdmins.push(resp.data[i]);
        }
        this.setState({
            clinicadmins: tempClinicAdmins
        });
    }

    onErrorHandlerClinicAdmin(response) {
        alert("Error response: Uncovered case");
    }

    render() {
        return (
            <div>
                <h1 id="manage">Manage clinics</h1>
                <div className="row">
                    <div className="col-md-2clinic">
                    <ClinicForm />
                    </div>
                    <div className="col-md-10clinic">
                        <br />
                        <ClinicTable content={this.state.clinics}/>
                        <br />


                    </div>
                </div>
            </div>




        )


    }



}

export default withRouter(ClinicPage);
