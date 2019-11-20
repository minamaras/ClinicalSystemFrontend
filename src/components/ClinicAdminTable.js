import React from 'react'
import ClinicAdminForm from './ClinicAdminForm'

class ClinicAdminTable extends React.Component{
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }


    renderTableData() {
    return this.props.content.map((clinicadmin, index) => {
        const { name, lastname, email, password} = clinicadmin

        return (
            <tr key={email.toString()}>
                <td>{name}</td>
                <td>{lastname}</td>
                <td>{email}</td>

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
                            <h2 id="tablenameclinicadmin">Clinic admins</h2>
                            <table id='clinicadmins' className="table table-hover table-mc-light-blue">

                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Clinic</th>
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

export default ClinicAdminTable
