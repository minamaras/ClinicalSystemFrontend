import React from 'react'

class ClinicalCentreAdminTable extends React.Component{

    constructor(props) {
        super(props);
        
        this.renderTableData = this.renderTableData.bind(this);
    }
    

    renderTableData() {
    return this.props.content.map((admin, index) => {
        const { name, lastname, email } = admin

        return (
            <tr>
                <td>{name}</td>
                <td>{lastname}</td>
                <td>{email}</td>
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
                            <h2 id="tablename">Clinical Centre Admins</h2>
                            <table id='ccadmins' class="table table-hover table-mc-light-blue">
                                
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
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

export default ClinicalCentreAdminTable