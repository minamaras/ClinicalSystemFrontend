import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import AddNurse from './AddNurse'

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


    }

    addNurse(nurse) {
        this.setState(prevState => ({
            nurses: [...prevState.nurses, nurse]
        }));
    }

    render(){
        return(
            <div className="containernurse">
                <h1 id="manage">Manage nurses</h1>
                <div className="row">
                    <div className="col-md-2">
                        <AddNurse />
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(NursePage);
