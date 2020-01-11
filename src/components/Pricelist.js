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

class Pricelist extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            examtypes: []
        }
    }


    componentDidMount() {
        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };

        axios.get('http://localhost:8081/api/examtypes/all', options).then(
            (resp) => this.onSuccessHandlerExam(resp),
            (resp) => this.onErrorHandlerExam(resp),
        );
    }

    onSuccessHandlerExam(resp) {

        var tempexams = [];
      
        console.log(resp.data);
      
        for (var i = 0; i < resp.data.length; i++) {
            tempexams.push(resp.data[i]);
        }
      
        this.setState({
            examtypes : tempexams,
        });
      
      
    }

    onErrorHandlerExam(response) {
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
                accessor: "price",
                Header: "price",
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["price"] }),
                filterAll: true
            }
        ];

        return (
            <div>
                <ReactTable id="pricelistable" data={this.state.examtypes} columns={columns}
                    minRows={0}
                    showPagination={false}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value} />
            </div>
        )

    }
}

export default Pricelist
