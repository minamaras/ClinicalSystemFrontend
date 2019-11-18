import React from 'react'
import AddClinicalCentreAdmin from './AddClinicalCentreAdmin';
import ClinicalCentreAdminTable from './ClinicalCentreAdminTable';
import '../css/ClinicalCentreAdminPage.css'

class ClinicalCentreAdminPage extends React.Component{

    constructor(props) {
        super(props);
        this.state =  {
            admins: []
        }
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
                        <ClinicalCentreAdminTable content={this.state.admins} />
                    </div>
                </div>
            </div>
        );
    }

}

export default ClinicalCentreAdminPage