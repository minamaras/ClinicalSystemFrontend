import React from 'react'
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { Table } from 'react-bootstrap';
import '../css/ClinicListPage.css'
import RoutedLinkContainer from './RoutedLinkContainer'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import Routes from './Router'
import ClinicProfile from './ClinicProfile';
import clinicsicon from '../icons/clinicphoto.png';
import 'react-table-6/react-table.css';
import Select from 'react-select';
var ReactTable = require('react-table-6').default;





class ClinicListTable extends React.Component{

    constructor(props) {
        super(props);

      this.state = {
      select2: undefined,
      examTypes : []
    };

        this.renderTableData = this.renderTableData.bind(this);

    }


      componentDidMount () {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };

            const tempExams = [];

        axios.get('http://localhost:8081/api/examtypes/all',options).then(
              (resp) => this.onSuccessHandler(resp),
              (resp) => this.onErrorHandler(resp),
            );



      }


onSuccessHandler(resp) {

  var tempexams = [];

  console.log(resp.data);

  for (var i = 0; i < resp.data.length; i++) {
      tempexams.push(resp.data[i].name);
      console.log(resp.data[i]);
      console.log(resp.data[i].name);
      console.log(tempexams);
  }

  this.setState({
      examTypes : tempexams,
  });


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

 onErrorHandler(response) {
     alert("Error response: Uncovered case");
   }


render() {


const clinics = [];
const exams = [];


for (var i = 0; i < this.props.content.length; i++) {

  const name = this.props.content[i].name;
  const adress = this.props.content[i].adress;
  const rating =  this.props.content[i].rating;


 {clinics.push({name : name, adress: adress,rating: rating});}

}

console.log(this.state);



const columns = [

  {
    accessor: "doctors",
    Header:"",
    Cell: e => <img style={{height:'30px',width:'30px'}} src={clinicsicon}/>,
  },{
    accessor: "name",
    Header: "Clinic",
    Cell: ({ row }) => (<Link to={{pathname:`/clinic/${row.name}`, state :{data : row} } }>{row.name}</Link>),
  },
  {
    accessor: "adress",
    Header: "Address"
  },
  {
    accessor: "rating",
    Header: "Rating"
  },
];


    return (

        <div className="container">
        <div className="selectoptions">
        Select exam type :{" "}
        <Select
          style={{ width: "50%", marginBottom: "20px" }}
          onChange={entry => {
            this.setState({ select2: entry });
            console.log(entry);
            this.onFilteredChangeCustom(
              entry.map(o => {
                return o.value;
              }),
              "doctors"
            );
          }}

          value={this.state.select2}
          options={

            this.state.examTypes.map((type, i) => {
            return { value:type, label: type };
          })
          }
        />
        </div>

        <ReactTable  data={clinics} columns= {columns}
          minRows={0}
          showPagination={true}/>
        </div>


    )
}




}


export default (ClinicListTable);
