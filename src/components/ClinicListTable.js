import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Table } from 'react-bootstrap';
import '../css/ClinicListPage.css'
import RoutedLinkContainer from './RoutedLinkContainer'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import Routes from './Router'
import ClinicProfile from './ClinicProfile';
import clinicsicon from '../icons/clinicphoto.png';



class ClinicListTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);

    }



renderTableData() {
return this.props.content.map((clinic, index) => {
   const { name, adress,rating } = clinic//destructuring
   return (


      <tr key={name.toString()}>
        <img src={clinicsicon} style={{ width: '20px',top:'10px',height:'20px'}} />
        <td><Link to={`/clinic/${clinic.name}`}>{clinic.name}</Link></td>
        <td>{clinic.adress}</td>
        <td>{clinic.rating}</td>

      </tr>



   )
})
}



render() {
    return (

        <div className="container">
            <div className="row">
                <div className="col-xs-9">
                    <div className="table">
                        <Table id='clinic' className="tabela" style={{ width: '35rem' }}>

                            <thead>
                                <tr>
                                    <th className="header"></th>
                                    <th className="header">Clinic</th>
                                    <th className="header">Adress</th>
                                    <th className="header">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

        </div>


    )
}




}

export default (ClinicListTable);
