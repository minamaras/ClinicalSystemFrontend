import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import hospitalicon from '../icons/surgeon.svg'
import '../css/DoctorTable.css'
import 'react-table-6/react-table.css';
import matchSorter from 'match-sorter'
var ReactTable = require('react-table-6').default;


const DoctorDeletedAlert = withReactContent(Swal)
class DoctorList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doctors: []
        }
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };

        axios.get('http://localhost:8081/api/doctors/alldoctors', options).then(
            (resp) => this.onSuccessHandlerDoctor(resp),
            (resp) => this.onErrorHandlerDoctor(resp),
        );
    }

    
    onSuccessHandlerDoctor(resp) {

        var tempdoctors = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            tempdoctors.push(resp.data[i]);
        }
      
        this.setState({
            doctors : tempdoctors,
        });
      
      
    }

    onErrorHandlerDoctor(response) {
        alert("Error response: Uncovered case");
    }

    render() {

        const columns = [

            {
                accessor: "name",
                Header: "Name",
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
                accessor: "email",
                Header: "Email",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["email"] }),
                filterAll: true
            },
            {
                accessor: "specialization",
                Header: "Specialization",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["specialization"] }),
                filterAll: true
            },
            {
                accessor: "rating",
                Header: "Rating",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["rating"] }),
                filterAll: true
            },
            {
                accessor: "start",
                Header: "Start time",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["start"] }),
                filterAll: true
            },
            {
                accessor: "end",
                Header: "End time",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["end"] }),
                filterAll: true
            }
        ];

        return (
            <div>
                <ReactTable data={this.state.doctors} columns={columns}
                    minRows={0}
                    showPagination={false}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value} />
            </div>
        )

    }
}
export default DoctorList;
