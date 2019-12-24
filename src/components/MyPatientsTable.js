import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import 'react-table-6/react-table.css';
import matchSorter from 'match-sorter'
var ReactTable = require('react-table-6').default;

class MyPatientsTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    renderTableData() {
        
        return this.props.content.map((patient, index) => {
            const { name, lastname, email, socialSecurityNumber} = patient//destructuring
            return (
         
         
               <tr key={name.toString()}>
                 <td>{patient.name}</td>
                 <td>{patient.lastname}</td>
                 <td>{patient.email}</td>
                 <td>{patient.socialSecurityNumber}</td>
               </tr>
         
         
         
            )
         })
      
        }
    
        render() {

            const patients = [];

            for (var i = 0; i < this.props.content.length; i++) {

                const name = this.props.content[i].name;
                const socialSecurityNumber = this.props.content[i].socialSecurityNumber;
                const lastname =  this.props.content[i].lastname;
                const email =  this.props.content[i].email;

                //let res = reserved;

                console.log(this.props.content[i]);
              
              
               {patients.push({name : name, socialSecurityNumber: socialSecurityNumber, email: email, lastname: lastname});}
              
              }

            const columns = [

                  {
                    accessor: "name",
                    Header:"Name",
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                  filterAll: true
                  },
                  {
                    accessor: "lastname",
                    Header: "Lastname",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["lastname"] }),
                  filterAll: true
                  },
                  {
                    accessor: "socialSecurityNumber",
                    Header: "SS number",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["socialSecurityNumber"] }),
                  filterAll: true
                  },
                  {
                    accessor: "email",
                    Header: "Email",
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["email"] }),
                  filterAll: true
                  }
            ];

            return (
              <div>
                <ReactTable data={patients} columns={columns}
                  minRows={0}
                  showPagination={false}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value} />
              </div>
            )
    
        }
}
export default MyPatientsTable;
