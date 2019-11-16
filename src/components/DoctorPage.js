import React from 'react';
import AddDoctor from './AddDoctor';
import '../css/AddDoctor.css';
import DoctorTable from './DoctorTable';

class DoctorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            doctors: []
        }
    }

    
    render() {
        return (
            <div className="container">
                <h1 id="manage">Manage doctors</h1>
                <div className="row">
                    <div className="col-md-2">
                    <AddDoctor/>
                    </div>
                    <div className="col-md-10">
                        <br />
                        <DoctorTable content={this.state.doctors} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DoctorPage;