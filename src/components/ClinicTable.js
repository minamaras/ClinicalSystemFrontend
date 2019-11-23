import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button } from "react-bootstrap";

class ClinicTable extends React.Component{
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }


    renderTableData() {
    return this.props.content.map((clinic, index) => {
        const { name, adress, description} = clinic

        return (
            <tr key={name}>
                <td>{name}</td>
                <td>{adress}</td>
                <td>{description}</td>
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
                            <h2 id="tablenameclinic">Clinics</h2>
                            <table id='clinics' className="table table-hover table-mc-light-blue">

                                <thead>
                                    <tr>
                                        <th>Clinic name</th>
                                        <th>Adress</th>
                                        <th>Description</th>
                                        <th>Clinic Admin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }




}

export default ClinicTable
