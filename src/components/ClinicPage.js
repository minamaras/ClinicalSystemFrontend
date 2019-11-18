import React from 'react';
import ClinicForm from './ClinicForm';
import ClinicTable from './ClinicTable';
import '../css/ClinicPage.css';

class ClinicPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            clinics: []
        }
    }

    render() {
        return (
            <div>
                <h1 id="manage">Manage clinics</h1>
                <div className="row">
                    <div className="col-md-2">
                    <ClinicForm />
                    </div>
                    <div className="col-md-10">
                        <br />
                        <ClinicTable content={this.state.clinics} />
                    </div>
                </div>
            </div>




        )


    }



}

export default ClinicPage

