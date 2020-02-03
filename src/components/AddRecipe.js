import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../css/AddRecipe.css';

const MedRecAlert = withReactContent(Swal)

class AddRecipe extends React.Component{

    constructor(props){
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.renderMedicationList = this.renderMedicationList.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
  

        this.state = {
            show: false,

            content: '',
            doctoremail:'',
            patientemail: '',

            medicationList: [],
            medicationName: [],

            
            
        }
        //patientemail: this.props.content,
        console.log(this.props.content)


    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        const options = {
          headers: { 
              'Authorization': 'Bearer ' + token,

            }
              };

        axios.get(`http://localhost:8081/api/appointments/startappoint/${this.props.content}`, options).then(    
            (resp) => this.onSuccessHandlerApponit(resp),                
            (resp) => this.onErrorHandler(resp)
        );    



        axios.get(`http://localhost:8081/api/medication/allmedicationsnames`,options).then(    
            (resp) => this.onSuccessHandlerMedication(resp),                
            (resp) => this.onErrorHandler(resp)
        );

    }

    onErrorHandler(resp) {
        MedRecAlert.fire({
            title: "Error occured",
            text: '',
            type: "error",
            button: true
          });
      
      }

      onSuccessHandlerApponit(resp){
        console.log(resp.data)
        this.setState({
            //appointment : resp.data,
            patientemail : resp.data.patientemail,
        });

       // console.log(this.state.appointment)
        console.log(this.state.patientemail)
       // this.getAllInfo();
    }  
      
      onSuccessHandlerMedication(resp) {
      //console.log(resp.data)
        this.setState({     
            medicationList: resp.data         
        });
    
    }

    renderMedicationList(medication){
        return(
            this.state.medicationList.map(medication => {
                return(
                <div className="checkboxList">
                    <input className="checkboxSingle" type="checkbox" onChange={this.handleSelect} value={medication.name} content={medication.name}/><label>{medication.name}</label>
                </div>
                )
            })
        )
    }


    
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    handleSelect(e){
        this.setState({
            medicationName: this.state.medicationName.concat(e.target.value)
        })
        
    }

    addRecipe(e){
        e.preventDefault();

        let token = localStorage.getItem('token');
        const options = {
          headers: { 
              'Authorization': 'Bearer ' + token,
            }
              };

              let recipeInfo = {
                content: this.state.content,
                medicationName: this.state.medicationName,
                patientemail: this.state.patientemail 
            }   

            console.log(recipeInfo);
        axios.post(`http://localhost:8081/api/recipes/addrecipe`, recipeInfo, options).then(    
            (resp) => this.onSuccessHandlerRec(resp),                
            (resp) => this.onErrorHandler(resp)
        );
    }

    onSuccessHandlerRec(resp){
        MedRecAlert.fire({
            title: "Recipe is successfully added!",
            text: '',
            type: "success",
            icon: 'success',
            button: true
          });
          window.location.reload();
    }


    render(){
        return(
            <div>
                <button className="recipeAdding" onClick={this.handleShow}>
                    Add recipe
                </button>

                <Modal  
                    show={this.state.show}
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered = "true"
                    className="RecipeModalDiv"
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Add recipe
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.addRecipe}>
                        <Modal.Body>
                            <div className="allDivRec">
                            <div>
                            <label className="labelRep">Choose medications:</label>
                            <div className="MedicListDiv">
                                {this.renderMedicationList(this.state.medicationList)}
                            </div>
                            </div>

                            <div className="contentRecipeDiv">
                            <label className="labelRep">Content:</label>
                        <textarea rows='8' cols='60'
                                    className="textareaReport"
                                    id="content"
                                    name="content"
                                    onChange={this.handleChange}
                                    placeholder="Enter recipe content"
                                    
                        />
                            </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button type="submit" variant="outline-primary" style={{float: 'right', margin: '0 10px 0 0'}}>Submit</Button>
                    </Modal.Footer>
                    </Form>


                </Modal>
            </div>
        )
    }


}

export default AddRecipe