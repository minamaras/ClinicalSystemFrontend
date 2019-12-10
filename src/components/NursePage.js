import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import AddNurse from './AddNurse'
import NurseTable from './NurseTable'
import '../css/NursePage.css'

class NursePage extends React.Component{
    constructor(props) {
        super(props);
        this.state =  {
            nurses: []
        }

        this.addNurse = this.addNurse.bind(this);


        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.get("http://localhost:8081/api/nurses/all",options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );


    }

    addNurse(nurse) {
        this.setState(prevState => ({
            nurses: [...prevState.nurses, nurse]
        }));
    }

    onSuccessHandler(resp) {
        var tempNurses = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempNurses.push(resp.data[i]);
        }
        this.setState({
            nurses: tempNurses
        });

    }

    onErrorHandler(response) {
        alert("Error response: Uncovered case");
    }

    render(){
        return(
            <div className="containernurse">
                <h1 id="manage">Manage nurses</h1>
                <div className="row">
                    <div className="col-md-2">
                        <AddNurse />
                    </div>
                    <div className="col-md-10-nursecards">
                        <br />
                        <NurseTable content={this.state.nurses} />
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(NursePage);
