import React from "react";
import axios from 'axios';
import { Form, Button, FormGroup, FormControl, ControlLabel,Card,Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { withRouter,useParams,Link} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import '../css/ClinicProfile.css'
import icon from '../icons/clinicphoto.png';
import clinicsicon from '../icons/doctor.svg';
import Select from 'react-select';
import "react-select/dist/react-select.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import matchSorter from "match-sorter";
var ReactTable = require('react-table-v6').default;




class  ClinicProfile extends React.Component{
  constructor(props) {
      super(props);
      this.renderDataOther = this.renderDataOther.bind(this);




      this.state =  {
          clinicname: '',
          adress : '',
          description: '',
          doctorsId: [],
          rating : '',
          doctors:[],
          filtered:[],
          examTypes:[],
          select2: undefined,
          exam: props.match.params.examtype

      }



      let token = localStorage.getItem('token');
      const options = {
          headers: { 'Authorization': 'Bearer ' + token}
      };

      axios.get(`http://localhost:8081/api/clinics/clinicabout/${this.props.match.params.name}`,options).then(
          (resp) => { this.changeState(resp)},
          (resp) => this.onErrorHandler(resp),
        );

        axios.get(`http://localhost:8081/api/doctors/aboutclinicdoctors/${this.props.match.params.name}`,options).then(
            (resp) => {
              this.setState({
                doctors : resp.data,
            });},
            (resp) => this.onErrorHandler(resp),
          );

          console.log(this.state);

      }


      componentDidMount () {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
            };

            const tempExams = [];

        axios.get('http://localhost:8081/api/examtypes/all',options).then(
              (resp) => this.Success(resp),
              (resp) => this.onErrorHandler(resp),
            );

            if(this.state.exam != undefined){

                let filtered = this.state.filtered;
                filtered.push({ id: "examType", value: this.state.exam});


              this.setState({ filtered: filtered });


            }


      }


      Success(resp) {

            var tempexams = [];

            for (var i = 0; i < resp.data.length; i++) {
                tempexams.push(resp.data[i]);
            }

            this.setState({
                examTypes : tempexams,
            });


          }


      onSuccessHandler(resp) {

        this.changeState(resp);
      }


      changeState = (resp) => {

                this.setState({
                    clinicname: resp.data.name,
                    adress :resp.data.adress,
                    description: resp.data.description,
                    doctorsId: resp.data.doctorsId,
                    rating: resp.data.rating,

        });

        console.log(this.clinicname);



      }


      onErrorHandler(response) {
          alert("Error response: Uncovered case");
        }



      renderDataOther(){

        const docs = this.state.doctors;
        if (docs.lenght === 0){

          return (

             <li>There are currently no doctors working in this clinic.</li>

          );


        }else{

        return docs.map((doctor) => {
           const {id,name,lastname} = doctor//destructuring
           return (

              <li><Link to={`/doctor/${doctor.id}`}>{doctor.name} {doctor.lastname}</Link></li>

           )
        })

      }

    }


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

        this.setState({ filtered: filtered });

    console.log(filtered);
      };



      render() {

        const columns = [

          {
            Header : "Exam",
            accessor: "examType",
            width: 50,
            Cell: e => <img style={{height:'30px',width:'30px'}} src={clinicsicon}/>,
            //Cell: ({ row }) => (<label>{row.examType.name}</label>),
            filterMethod: (filter, row) => {

              return row.examType.name.includes(filter.value);

            }

        },{
            accessor: "name",
            Header: "Doctor's name",
            Cell: ({ row }) => (<Link to={{pathname:`/doctor/${row.name}`, state :{data : row} } }>{row.name}</Link>),
          },
          {
            accessor: "lastname",
            Header: "Doctors's lastname"
          },
          {
            accessor: "rating",
            Header: "Rating"
          },
        ];


          return (
            <div className="wholepage">

            <Card className="cliniccard">

            <Form className="clinicInfo">


            <Card.Body>
              <h1 className="clinicHeader"><b>{this.state.clinicname}</b></h1>


              <br/>
                <br/>


                 <Card className="AdresaIRejting">

                 <Card.Text><b>Address:</b> {this.state.adress}</Card.Text>

                 <Card.Text><b>Rating:</b> {this.state.rating}</Card.Text>

                 </Card>
                 <br>
                 </br>

                 <Form.Row style={{width:'75%'}}>
                 <Form.Group as={Col} >

                 <b>Select appointment type :</b>{" "}
                 <Select
                 className="selectoptions"
                   onChange={entry => {
                       this.setState({ select2: entry });
                       console.log(entry);
                       if(entry == null){
                       this.onFilteredChangeCustom([],
                         "examType"
                       );

                       //this.state.price='';
                       //this.state.selectedExamType='';

                     }else{

                       this.onFilteredChangeCustom(entry.value.name,
                         "examType"
                       );
                       //this.state.price=entry.value.price;

                       //const index =entry.value.name.indexOf(' ');
                       //console.log(index);
                       //console.log(entry.value.name.lenght);
                       //var res = entry.value.name.substring(0,index);
                       //this.state.selectedExamType=res;
                     }
                   }}

                   value={this.state.select2}

                   options={
                     this.state.examTypes.map((type, i) => {
                     return {id: i,value:type, label: type.name};
                   })
                 }

                 />

                 </Form.Group>

                 <Form.Group>
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

                    <ReactTable  data={this.state.doctors}
                    style={{height:'80%'}}

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
                        console.log(row[id]);
                        console.log(filter.value);

                      // if (typeof filter.value === "object") {
                      //
                      //   //for(var i=0;i<filter.value.length;i++){
                      //       console.log(row[id]);
                      //       console.log("n");
                      //       console.log(matchSorter([row[id]], filter.value));
                      //
                      //     if(matchSorter([row[id]], filter.value).lenght !== 0){
                      //       console.log(row[id] !== undefined);
                      //       return row[id] !== undefined;
                      //     }else {
                      //       return true;
                      //     }
                      //
                      //   }
                      if (typeof filter.value === "object") {
                               return row[id] !== undefined
                                 ? filter.value.indexOf(row[id]) > -1
                                 : true;
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
                      <br>
                      </br>

                    </Card.Body>




              </Form>
              </Card>

              </div>
          );
      }

  }



  export default withRouter(ClinicProfile);
