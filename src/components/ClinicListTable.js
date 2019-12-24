import React from 'react'
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import { Table ,Form,Col} from 'react-bootstrap';
import '../css/ClinicListPage.css'
import RoutedLinkContainer from './RoutedLinkContainer'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Link,Switch,useParams,withRouter } from "react-router-dom";
import Routes from './Router'
import ClinicProfile from './ClinicProfile';
//import clinicsicon from '../icons/clinicphoto.png';
import clinicsicon from '../icons/klinika.svg';
import 'react-table-6/react-table.css';
import Select from 'react-select';
import "react-select/dist/react-select.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import matchSorter from "match-sorter";
var ReactTable = require('react-table-v6').default;






class ClinicListTable extends React.Component{

    constructor(props) {
        super(props);

      this.state = {
      select2: undefined,
      examTypes : [],
      startDate: new Date(),
       filtered: [],
       clinics: this.props.content
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



  for (var i = 0; i < resp.data.length; i++) {
      tempexams.push(resp.data[i]);
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


   handleChange = date => {
       this.setState({
         startDate: date
       });
     };

onFilteredChangeCustom = (value, accessor) => {

  let filtered = this.state.filtered;
    let insertNewFilter = 1;

    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) filtered.splice(i, 1);
          else filter["value"] = value;

          insertNewFilter = 0;
        }
      });
    }

    if (insertNewFilter) {
      filtered.push({ id: accessor, value: value});
    }
    console.log(value);
    this.setState({ filtered: filtered });

  };



render() {

  console.log(this.props.content)

  this.props.content.map((clinic, i) => {
  console.log(clinic.exams);
})


const columns = [

  {
    accessor: "exams",
    //Header:"Exams",
    width: 50,
    //render: ({value}) =>{
			//const tagList = value.map(x=>x).join(", ")
			//return <span>{tagList}</span>
		//},
    Cell: e => <img style={{height:'30px',width:'30px'}} src={clinicsicon}/>,
    filterMethod: (filter, row) => {

      return row.exams.some(x=>x.includes(filter.value));


}

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
        <Form className="container-options-picker">
        <Form.Row className="red">
        <Form.Group as={Col} className="grupa1">

        <b>Select appointment type :</b>{" "}
        <Select
        // multi={true}
        className="selectoptions"
          onChange={entry => {
              this.setState({ select2: entry });
              console.log(entry);
              if(entry == null){
              this.onFilteredChangeCustom([],
                //entry.map(o => {
                  //return o.value;
                //}),
                "exams"
              );
            }else{

              this.onFilteredChangeCustom(entry.value,
                //entry.map(o => {
                  //return o.value;
                //}),
                "exams"
              );
            }
          }}

          value={this.state.select2}

          options={
            this.state.examTypes.map((type, i) => {
            return {id: i,value:type.name, label: type.name};
          })
        }

        />
        </Form.Group>

        <Form.Group as={Col}className="grupa">
        <b>Select appointment date:</b>{" "}
        <br></br>
        <DatePicker
             selected={ this.state.startDate }
             onChange={ this.handleChange }
             name="startDate"
             className="picker"
           />
           </Form.Group>
           </Form.Row>
           </Form>

        <ReactTable  data={this.props.content}

        columns= {columns}
        filterable
        filtered={this.state.filtered}
          minRows={0}
          showPagination={true}
          onFilteredChange={(filtered, column, value) => {
            this.onFilteredChangeCustom(value, column.id || column.accessor);
          }}

          defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id;
            console.log(row);
            console.log(filter.value);
          if (typeof filter.value === "object") {

            //for(var i=0;i<filter.value.length;i++){
                console.log(row[id]);
                console.log("n");
                console.log(matchSorter([row[id]], filter.value));

              if(matchSorter([row[id]], filter.value).lenght !== 0){
                console.log(row[id] !== undefined);
                return row[id] !== undefined;
              }else {
                return true;
              }

            }
           else {

             if( typeof row[id] === 'number'){
              return row[id] !== undefined
                ? String(row[id]).startsWith(filter.value.toLowerCase())
                : true;

            }else {
            return row[id] !== undefined
              ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
              : true;
            }
          }
        }}

            />

        </div>



    )
}




}


export default (ClinicListTable);
