import React from 'react';
import { withRouter,Link } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";
import icon from '../icons/16534.jpg'
import info from '../icons/information.svg'
import clear from '../icons/close.svg'
import filter from '../icons/filter.svg'
import less from '../icons/less.svg'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import RenderClinic from './RenderClinic';
import '../css/AllClinics.css';


const PatientAlert = withReactContent(Swal)



class AllClinics extends React.Component{

  constructor(props) {
      super(props);


      this.state={
        clinics:[],
      }

      }



componentDidMount () {

            let token = localStorage.getItem('token');
            const options = {
              headers: { 'Authorization': 'Bearer ' + token}
                  };

            axios.get('http://localhost:8081/api/clinics/allclinicsdto',options).then(
                      (resp) => {

                          this.setState({
                            clinics:resp.data,
                          });
                      }
                      ,
                      (resp) => this.onErrorHandler(resp)
                      );

                  }





onErrorHandler(resp) {
  PatientAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true
    });

}



render() {

    return (


        <div className="pozadinaSveKlinike" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>

        <div className="SveKlinike">
                    <br />
                    <RenderClinic content={this.state.clinics}/>
                    <br />
        </div>
</div>


    );


}





}


export default withRouter(AllClinics);
