import React from 'react'
import ClinicAdminForm from './ClinicAdminForm'

class ClinicTable extends React.Component{
    constructor(props) {
        super(props);
        
        this.renderTableData = this.renderTableData.bind(this);
    }
    

    renderTableData() {
    return this.props.content.map((clinic, index) => {
        const { name, adress, description} = clinic

        return (
            <tr>
                <td>{name}</td>
                <td>{adress}</td>
                <td>{description}</td>
                
            </tr>
        )
    })
}

    render() {
        return (
            
            <div class="container">
                <div class="row">
                    <div class="col-xs-9">
                        <div class="table-responsive-vertical shadow-z-1">
                            <h2 id="tablename">Clinics</h2>
                            <table id='clinics' class="table table-hover table-mc-light-blue">
                                
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