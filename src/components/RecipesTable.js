import React from 'react'
import { Button, Card  } from'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/RecipesPage.css';

const RecipeAlert = withReactContent(Swal)

class RecipesTable extends React.Component{

    constructor(props) {
        super(props);
        
        this.renderTableData = this.renderTableData.bind(this);
        this.renderMedications = this.renderMedications.bind(this);

    }

    renderTableData() {
        return this.props.content.map((recipe, index) => {
            const { content, doctoremail, patientemail, medicationName } = recipe
            return (

                <div>
                    <Card className="recipeCard">
                        <Card.Body>
                            <div className="rowOne">
                                <p className="leftRow">Content: </p>
                                <div className="divMed">
                                    <p className="contentRow">{content}</p>
                                </div>
                            </div>
                            <div className="rowOne">
                            {medicationName && <p className="leftRow">Medication:</p>}
                            <div className="divMed">
                                {medicationName && this.renderMedications(medicationName) }
                            </div>
                            </div>
                            <div className="rowOne">
                                <p className="leftRow">Patient email: </p>
                                <p className="contentRow">{patientemail}</p>
                            </div>
                            <div className="rowOne">
                                <p className="leftRow">Doctor email: </p>
                                <p className="contentRow">{doctoremail}</p>
                            </div>
                            <Button className="btnRecipe" onClick={this.verify.bind(this, recipe)} variant='outline-info'>Verify</Button>
                        </Card.Body>
                    </Card>
                </div>


            )
        })
    }

    renderMedications(medicationName){
       //console.log(this.props.content)
        //if(this.props.content.medicationName != null){
            //const medicationName = med.medicationName
           // console.log(med.medicationName)

        return medicationName.map(element => {
               //console.log(element)
               return (
               <p className="medName">{element}</p>
               )
           });
        
        
    }

    verify(recipe){
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };
        console.log(recipe.id);

         axios.get(`http://localhost:8081/api/recipes/authenticate/${recipe.id}`, options).then(
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
          }).then((isOk) => {
              if(isOk){
                  window.location.reload();
              }
          })     
    }
    

    render(){
        return(

            <div className="containerRecipes">

                {this.renderTableData()}
                

            </div>               
        )
    }

}

export default RecipesTable;