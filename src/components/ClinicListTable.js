import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Table } from 'react-bootstrap';
import '../css/ClinicListPage.css'
import RoutedLinkContainer from './RoutedLinkContainer'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import Routes from './Router'
import ClinicProfile from './ClinicProfile';
import clinicsicon from '../icons/clinicphoto.png';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import TableHeaderColumn from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";



class ClinicListTable extends React.Component{

    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);



    }



renderTableData() {
return this.props.content.map((clinic, index) => {
   const { name, adress,rating } = clinic//destructuring
   return (


      <tr key={name.toString()}>
        <img src={clinicsicon} style={{ width: '20px',top:'10px',height:'20px'}} />
        <td><Link to={`/clinic/${clinic.name}`}>{clinic.name}</Link></td>
        <td>{clinic.adress}</td>
        <td>{clinic.rating}</td>

      </tr>



   )
})
}

colFormatter = (cell, row) => {
   return (
     <Link to='/some/route'>
       {cell}
     </Link>
   )
 }


render() {

console.log(this.props.content);

const columns = [

  {
    dataField: "icon",
    text:"",
     formatter: (cell, row) => <img style={{height:'30px',width:'30px'}} src={clinicsicon}/>,
     headerStyle: (colum, colIndex) => {
          return { width: '50px', textAlign: 'center' };
        }
  },



  {
    dataField: "name",
    text: "Clinic",
    filter: textFilter(),
     formatter: (cell, row) => <Link to={`/clinic/${row.name}`}>{cell}</Link>,
  },
  {
    dataField: "adress",
    text: "Address",
    filter: textFilter()
  },
  {
    dataField: "rating",
    text: "Rating",
    filter: textFilter()
  }
];


const clinics = [];


for (var i = 0; i < this.props.content.length; i++) {

    clinics.push({name : this.props.content[i].name, adress: this.props.content[i].adress,rating: this.props.content[i].rating});
}
console.log(clinics);
    return (

        <div className="container">
        <BootstrapTable keyField='name' data={clinics} columns= {columns} filter={ filterFactory() }>
            <TableHeaderColumn dataField="name"  isKey dataFormat={this.ColFormatter} dataSort>Clinic</TableHeaderColumn>
            <TableHeaderColumn dataField="adress">Adress</TableHeaderColumn>
            <TableHeaderColumn dataField="rating" dataSort>Rating</TableHeaderColumn>
        </BootstrapTable>

        </div>


    )
}




}


export default (ClinicListTable);
