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
class DoctorTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    deleteDoctor(doctor) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        //console.log(doctor.email);

        axios.post("http://localhost:8081/api/doctors/deletedoctor", doctor, options).then(
            console.log(doctor),
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

        return this.props.content.map((doctor, index) => {
            const { name, lastname, email, specialization, rating, start, end } = doctor//destructuring
            return (


                <tr key={name.toString()}>
                    <img src={hospitalicon} style={{ width: '20px', top: '10px', height: '20px' }} />
                    <td>{doctor.name}</td>
                    <td>{doctor.lastname}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.rating}</td>
                    <td>{doctor.start}</td>
                    <td>{doctor.end}</td>
                    <td><Button className="deleteDoctor" variant="outline-danger" onClick={this.deleteDoctor.bind(this, doctor)} >Delete</Button></td>
                </tr>



            )
        })

    }

    render() {

        const doctors = [];

        for (var i = 0; i < this.props.content.length; i++) {

            const name = this.props.content[i].name;
            const lastname = this.props.content[i].lastname;
            const email = this.props.content[i].email;
            const specialization = this.props.content[i].specialization;
            const rating = this.props.content[i].rating;
            const start = this.props.content[i].start;
            const end = this.props.content[i].end;

            console.log(this.props.content[i]);


            { doctors.push({ name: name, lastname: lastname, email: email, specialization: specialization, rating: rating, start: start, end: end }); }

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
                accessor: "email",
                Header: "Delete",
                Cell: ({ row }) => (<Button className="deleteDoctor" variant="outline-danger" onClick={this.deleteDoctor.bind(this, row)} >Delete</Button>)
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
                <ReactTable data={doctors} columns={columns}
                    minRows={0}
                    showPagination={false}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value} />
            </div>
        )

    }
}
export default DoctorTable;
