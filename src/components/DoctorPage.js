import React from 'react';
import AddDoctor from './AddDoctor';
//import '../css/AddDoctor.css';
import DoctorTable from './DoctorTable';
import axios from 'axios';
//import '../css/DoctorPage.css';


class DoctorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            doctors: []
        }

        this.addDoctor = this.addDoctor.bind(this);

        axios.get("http://localhost:8081/api/doctors/alldoctors").then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );
    }

    addDoctor(doctor) {
        this.setState(prevState => ({
            doctors: [...prevState.doctors, doctor]
        }));
    }

    onSuccessHandler(resp) {
        var tempDoctors = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempDoctors.push(resp.data[i]);
        }
        this.setState({
            doctors: tempDoctors
        });
    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
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
