import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


class RequestsTable extends React.Component{

    constructor(props) {
        super(props);
        
        this.renderTableData = this.renderTableData.bind(this);
    }
    

    renderTableData() {
    return this.props.content.map((request, index) => {
        const { name, lastname, email, password } = request

        return (
            <tr key={email.toString()}>
                <td>{name}</td>
                <td>{lastname}</td>
                <td>{email}</td>
                <td>{password}</td>
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
                            <h2 id="tablename"></h2>
                            <table id='requests' className="table table-hover table-mc-light-blue">
                                
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                        <th>Password</th>
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

export default RequestsTable