import React from 'react';
import ExamTypeTable from './ExamTypeTable'
import AddExamType from './AddExamType'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import AddPredefinedAppointment from './AddPredefinedAppointment';
import '../css/ExamTypePage.css'


class ExamTypePage extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            examtypes: []
        }

        this.addExamType = this.addExamType.bind(this);
        this.handler = this.handler.bind(this);


        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.get("http://localhost:8081/api/examtypes/all",options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );

        console.log(this.state.examtypes)

    }

    addExamType(examtype) {
        this.setState(prevState => ({
            examtypes: [...prevState.examtypes, examtype]
        }));
    }

    onSuccessHandler(resp) {
        var tempExams = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempExams.push(resp.data[i]);
        }
        this.setState({
            examtypes: tempExams
        });

    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    handler() {
        window.loaction.reload();
    }


    render() {
        return (
            <div className="container">
                <h1 id="manage">Manage types of exams</h1>
                <div className="row">
                    <div className="addexamtypebutton">
                    <AddExamType/>
                    </div>
                    <div className="addpredfinedbutton">
                    <AddPredefinedAppointment user={this.props.user} action={this.handler}/>
                    </div>
                    <div className="col-md-10-drcards">
                        <br />
                        <ExamTypeTable content={this.state.examtypes} />

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ExamTypePage);
