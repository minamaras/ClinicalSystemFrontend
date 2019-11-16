import React from 'react';

class DoctorTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.renderTableData = this.renderTableData.bind(this);
    }
    

    renderTableData() {
    return this.props.content.map((doctor, index) => {
        const { name, lastname, email, specialization } = doctor

        return (
            <tr>
                <td>{name}</td>
                <td>{lastname}</td>
                <td>{email}</td>
                <td>{specialization}</td>
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
                            <h2 id="tablename">Clinic's Doctors</h2>
                            <table id='doctors' class="table table-hover table-mc-light-blue">
                                
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Specialization</th>
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
export default DoctorTable;