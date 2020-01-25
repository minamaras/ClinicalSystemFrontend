import React from 'react';
import axios from 'axios';
import MyPatientsTable from './MyPatientsTable'
import { withRouter } from "react-router-dom";

class MyPatients extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            patients: []
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };

        axios.get('http://localhost:8081/api/patients/allfromclinic', options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp),
        );
    }

    onSuccessHandler(resp) {

        var temp = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            temp.push(resp.data[i]);
        }
      
        this.setState({
            patients : temp,
        });
    }

    onErrorHandler(resp) {
        alert("Something went wrong");  
    }
    render() {
        return (
            <div style={{ margin: '99px 0 0 0'}}>
                <MyPatientsTable content={this.state.patients}/>
            </div>
        );
    }


}

export default withRouter(MyPatients);