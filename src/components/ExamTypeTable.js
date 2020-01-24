import React from 'react'
import ClinicForm from './ClinicAdminForm'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import hospitalicon from '../icons/hospital.svg'
import AddAdminToClinic from './AddAdminToClinic'
import axios from 'axios';
import EditExamType from './EditExamType';
import 'react-table-6/react-table.css';
import matchSorter from 'match-sorter'
import '../css/ExamTypePage.css'

var ReactTable = require('react-table-6').default;

class ExamTypeTable extends React.Component{
    constructor(props) {
        super(props);


        this.renderTableData = this.renderTableData.bind(this);
    }

    deleteExamType(examtype) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        //console.log(doctor.email);

         axios.post("http://localhost:8081/api/examtypes/deletetype", examtype, options).then(
           
             (resp) => this.onSuccessHandler(resp),
             (resp) => this.onErrorHandler(resp)
         );
    }

    onErrorHandler(resp) {
      console.log("error");
      alert("error");

    }

    onSuccessHandler(resp) {
        window.location.reload();
    }

   
    renderTableData() {
        return this.props.content.map((type, index) => {
            const { name, price } = type//destructuring
            return (


                <tr key={name.toString()}>
                    <img src={hospitalicon} style={{ width: '20px', top: '10px', height: '20px' }} />
                    <td>{type.name}</td>
                    <td>{type.price}</td>
                    <td><Button id="deletedugme" variant="outline-danger" onClick={this.deleteExamType.bind(this, type)} >Delete</Button></td>
                    <td><EditExamType/></td>
                </tr>



            )
        })
    }

    render() {
        const types = [];

        for (var i = 0; i < this.props.content.length; i++) {

            const name = this.props.content[i].name;
            const price = this.props.content[i].price;
            const duration = this.props.content[i].duration;

            console.log(this.props.content[i]);


            { types.push({ name: name, price: price, duration: duration}); }

        }

        const columns = [

            {
                accessor: "name",
                Header: "Name",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["name"] }),
                filterAll: true
            },
            {
                accessor: "price",
                Header: "price",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["price"] }),
                filterAll: true
            },
            {
                accessor: "duration",
                Header: "Duration [mins]",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["duration"] }),
                filterAll: true
            },
            {
                accessor: "name",
                Header: "Delete",
                Cell: ({ row }) => (<Button className="deleteDoctor" variant="outline-danger" onClick={this.deleteExamType.bind(this, row)} >Delete</Button>)
            },
            {
                accessor: "name",
                Header: "Edit",
                Cell: ({ original }) => (<EditExamType content={original}/>)
             }
            
        ];

        return (
            <div>
                <ReactTable data={types} columns={columns}
                    minRows={0}
                    showPagination={false}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value} />
            </div>
        )

    }
}

export default ExamTypeTable
