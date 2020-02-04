import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import RecipesTable from './RecipesTable'
import presc from '../icons/prescription.svg'
import '../css/RecipesPage.css'

class RecipesPage extends React.Component{
    constructor(props) {
        super(props);

        this.state =  {
            recipes: []
        }
        
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        axios.get("http://localhost:8081/api/recipes/allunauth",options).then(
            (resp) => this.onSuccessHandler(resp),
            (resp) => this.onErrorHandler(resp)
        );

    }

    onSuccessHandler(resp) {
        
        var tempRec = [];

        for (var i = 0; i < resp.data.length; i++) {
            tempRec.push(resp.data[i]);
        }
        this.setState({
            recipes: tempRec
        });

        console.log(this.state.recipes)
    }

    onErrorHandler(resp) {
        alert("Error response: Uncovered case");
    }



    render(){
        return(
            <div>
                <div className="prescimg">
                    <img src={presc} style={{height:'70px', width: 'auto'}} alt='Unavailable icon' />
                </div>
                <h2 className="prescTitle">Unverified prescriptions</h2>
                <RecipesTable content={this.state.recipes} /> 
            </div>
        )
    }

}

export default withRouter(RecipesPage)