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
;



class ClinicListTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);

    }



renderTableData() {
return this.props.content.map((clinic, index) => {
   const { name, adress } = clinic//destructuring
   return (

      <tr key={name.toString()}>
        <td><Link to={`/clinic/${clinic.name}`}>{clinic.name}</Link></td>
        <td>{adress}</td>
      </tr>



   )
})
}



render() {
    return (

        <div className="container">
            <div className="row">
                <div className="col-xs-9">
                    <div className="table-responsive-vertical shadow-z-1">
                        <h2 id="tablename">Clinics</h2>
                        <Table id='clinic' className="table table-hover table-mc-light-blue">

                            <thead>
                                <tr>
                                    <th className="header">Clinic</th>
                                    <th className="header">Adress</th>
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
