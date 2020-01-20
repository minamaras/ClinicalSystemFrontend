import React from 'react'
import { Button  } from'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RecipeAlert = withReactContent(Swal)

class RecipesTable extends React.Component{

    constructor(props) {
        super(props);
        
        this.renderTableData = this.renderTableData.bind(this);
    }

    renderTableData() {
        return this.props.content.map((recipe, index) => {
            const { content, doctoremail, patientemail } = recipe
    
            return (
                <tr className="contentTr" key={content}>
                    <th>{content}</th>
                    <th>{doctoremail}</th>
                    <th>{patientemail}</th>
                    <th><Button variant="outline-info" onClick={this.verify.bind(this, recipe)}>Verify</Button></th>
                </tr>
            )
        })
    }

    verify(recipe){
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };


         axios.post("http://localhost:8081/api/recipes/authenticate", recipe, options).then(
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onErrorHandler(resp) {
        RecipeAlert.fire({
            title: "Prescription cannot be verified!",
            text: '',
            type: "error",
            button: true,
            icon: 'error'
          });

    }

    onSuccessHandler(resp) {

        RecipeAlert.fire({
            title: "Prescription verified successfully",
            text: "",
            type: "success",
            icon: 'success'
          });

        window.location.reload();
    }
    

    render(){
        return(

            <div className="containerRecipes">

                <table className="tableRecipes" className="table table-mc-light-blue">
                                
                    <thead>
                        <tr className="headerTr">
                            <th>Content</th>
                            <th>Doctor's email</th>
                            <th>Patient's email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>

            </div>               
        )
    }

}

export default RecipesTable;