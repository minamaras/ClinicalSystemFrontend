import React from 'react';
import { withRouter,Link } from "react-router-dom";
import { Modal, Button, Card, ListGroup,Form,Col } from "react-bootstrap";
import icon from '../icons/16534.jpg'
import info from '../icons/information.svg'
import clear from '../icons/close.svg'
import '../css/ClinicsFilteringPage.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import ClinicsFilteringTable from './ClinicsFilteringTable';
import Select from 'react-select';
import "react-select/dist/react-select.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import TimePicker from "react-time-picker";

const PatientAlert = withReactContent(Swal)


const filteringParameter = [
  { label: "By name", value: "name" },
  { label: "By address", value: "adress" },
  { label: "By rating", value: "rating" },
];

class ClinicsFilteringPage extends React.Component{

  constructor(props) {
      super(props);

      this.SendFilters = this.SendFilters.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.ClearInput= this.ClearInput.bind(this);
      this.handleChangeResultFiltering = this.handleChangeResultFiltering.bind(this);


      this.state={
        clinics:[],
        filter:undefined,
        parameter:undefined,
        alltheclinics:[],
        startDate: new Date(),
        time: undefined,
        exams:[],
        selecetedexam:undefined,
        dateString:'',
        paramexam:'',
        resultfilter:''
      }

      var time =  moment(this.state.time, 'HH:mm:ss');
      var time2 =  moment('16:00:00', 'HH:mm:ss');
      console.log(time._i);

      if(time2 > time){

        console.log("uspeh");
      }




      }



componentDidMount () {

            let token = localStorage.getItem('token');
            const options = {
              headers: { 'Authorization': 'Bearer ' + token}
                  };

            axios.get('http://localhost:8081/api/clinics/allclinicsdto',options).then(
                      (resp) => {this.onSuccessHandler(resp)

                          this.setState({
                            alltheclinics:resp.data,
                          });
                      }
                      ,
                      (resp) => this.onErrorHandler(resp)
                      );


                      axios.get('http://localhost:8081/api/examtypes/all',options).then(
                            (resp) => {

                              this.setState({

                                exams:resp.data

                              });

                            },
                            (resp) => this.onErrorHandler(resp),
                          );


                  }





onErrorHandler(resp) {
  PatientAlert.fire({
      title: "Error occured",
      text: '',
      type: "error",
      button: true
    });

}




onSuccessHandler(resp) {

  console.log(resp);

  this.setState({

    clinics: resp.data,

  });

  //window.location.reload();

  console.log(this.state);



}



//renderTableData() {
  //console.log(this.state.diseases);

//return lista.map((d, index) => {

    //return (
      //<li>
      //{d}
      //</li>
        //)
    //})
//}

handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value});

  }

  ClearInput = event => {

    this.setState({

      clinics: this.state.alltheclinics,
    });

    document.getElementsByName("resultfilter")[0].value ='';



  }


  handleChangeResultFiltering(e) {

    this.setState({...this.state, [e.target.name]: e.target.value});

    if(e.target != undefined){
    console.log(e.target.value);
  }

  console.log(document.getElementsByName("resultfilter")[0].value);
        if(document.getElementsByName("resultfilter")[0].value ==''){

          console.log("its undef");

        this.setState({
          clinics: this.state.alltheclinics,
        });
        return;
        }

        var resultingClinics =[];
        var clinicsName=[];
        var clinicsAdress=[];
        var clinicsRating=[];

        this.state.clinics.forEach(function (arrayItem) {

          if(arrayItem.name.toLowerCase().includes(e.target.value.toLowerCase())){
            clinicsName.push(arrayItem);
        }

        if(arrayItem.adress.toLowerCase().includes(e.target.value.toLowerCase())){
          clinicsAdress.push(arrayItem);
      }


      if(arrayItem.rating.toString().startsWith(e.target.value)){
          clinicsRating.push(arrayItem);
    }

});

    resultingClinics = clinicsName;
      clinicsAdress.forEach(function (arrayItem) {

        if(resultingClinics.some(x=>x.name == arrayItem.name)){
          return;
        }else{
          resultingClinics.push(arrayItem);
        }

      });


      clinicsRating.forEach(function (arrayItem) {

        if(resultingClinics.some(x=>x.name == arrayItem.name)){
          return;
        }else{
          resultingClinics.push(arrayItem);
        }

      });


              //console.log(this.state.clinics[i]);

              //if(this.state.clinics[i].name.toLowerCase().startsWith(e.target.value.toLowerCase())){
              //resultingClinics.push(this.state.clinics[i]);
            //}

            //if(this.state.clinics[i].adress.toLowerCase().startsWith(e.target.value.toLowerCase())){
            //resultingClinics.push(this.state.clinics[i]);
          //}
          //if(typeof(e.target.value) == Number){

          //if(this.state.clinics[i].rating.startsWith(e.target.value.toLowerCase())){
          //resultingClinics.push(this.state.clinics[i]);
        //}
      //}
            //}
          this.setState({

            clinics: resultingClinics,

          });


    }


SendFilters = event => {
   event.preventDefault();

   let token = localStorage.getItem('token');
   const options = {
       headers: { 'Authorization': 'Bearer ' + token}
   };

   console.log(this.state);
   console.log(this.props.user);



     if(this.state.startDate == undefined || this.state.selecetedexam == undefined || this.state.time == undefined || this.state.dateString == ''){

       PatientAlert.fire({
           title: "We can not filter without time,date and exam type.Please try again.",
           text: '',
           type: "error",
           button: true
         });

      return;

     }

     const index =this.state.selecetedexam.indexOf(' ');

     var res = this.state.selecetedexam.substring(0,index);

     this.setState({

       paramexam: res,

     });

console.log(this.state.date);
   var obj ={filter: this.state.filter,parameter:this.state.parameter,date:this.state.dateString,time:this.state.time,examtype:this.state.selecetedexam};
    axios.post('http://localhost:8081/api/clinics/filterclinics',obj,options).then(
      (resp) => {

        console.log(resp.data);

        this.onSuccessHandler(resp);

          console.log(this.state);
      //window.location.reload();
    },
      (resp) => this.onErrorHandler(resp)
    );


}

showInformation = event => {

  PatientAlert.fire({
      title: "This is a page for filtering.You can choose exam type and pick a date and time and will show you all the clinics that have avaliable doctors that are specialized for given exam type.Also you can enter name,rating and address in the input filed as additional filters.",
      text: '',
      type: "error",
      button: true
    });
}

onChangeTime = time => {

  this.setState({ time});
}




handleChangeDate = date => {


      //var dateString = date.getFullYear() + '-' + 0 +(date.getMonth() + 1) + '-' + date.getDate();
      var dateString =date.toISOString().substring(0,10);
      console.log(date);

       this.setState({
         startDate: date,
         dateString:dateString,

       });


   }




render() {
  console.log(this.state);

  if(this.state.clinics.lenght === 0){
    return(

      <div>

      <label>Sorry currently we don't have any clinic with this name/rating/adress.</label>
      <br/>
      <Link to='http://localhost:3000/allclinics'>Back</Link>

      </div>


    );
  }
    return (


        <div className="pozadina" style={{top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}}>
        <h1 id="naslovpravi">Clinics in our system</h1>

        <div>

        <label className="naslov"></label>

        <div className="filters">
          <br/>
          <label className="filterlabel">Search for clinic:</label>
          <br/>
          <input name="filter" className="filterinput" onChange={this.handleChange} ></input>

           <DatePicker
                selected={ this.state.startDate}
                //onChange={ this.handleChange}
                onChange={this.handleChangeDate}
                value= {this.state.inputValue}
                name="startDate"
                className="datepicker"
                minDate={moment().toDate()}


              />

              <TimePicker
                 onChange={this.onChangeTime}
                 value={this.state.time}
                 locale="sv-sv"
                 className="timepicker"
               />
               <br/>
               <b className="examtypelabel">Select appointment type :</b>{" "}
               <Select
               options={
                this.state.exams.map((type, i) => {
                return {id: i,value:type.name, label: type.name};
                 })
               }
               onChange={entry => {

                   if(entry == null){
                     this.setState({
                       selecetedexam: '',
                       clinics: this.state.alltheclinics,
                   });
                 }else{

                 this.setState({ selecetedexam: entry.value});
               }
               }
               }
               value={this.state.selecetedexam}
               className="selectedExamType"
               required
                />


         <Button style={{background:'#575f6e'}} onClick={this.SendFilters} className="filterbutton">Filter</Button>
         <button className="infobutton" onClick={this.showInformation}><img src={info} style={{width:'20px',height:'25px'}}></img></button>

        </div>
        <label className="filterresultslabel">If you only want to filter clinics by name/adress/rating you can enter your search here.
        Also you can use this filed after you found clinics that have doctors who can do choosen appointment type and are free,to further filter trough them.
        </label>
        <br/>
        <input className="filterresults" name="resultfilter" onChange={this.handleChangeResultFiltering}></input>
        <button className="clearButton" onClick={this.ClearInput}><img src ={clear} style={{height:'20px',width:'20px'}}></img></button>
        <div className="nesto">
                    <br />
                    <ClinicsFilteringTable content={this.state.clinics} exam={this.state.paramexam} time={this.state.time} date={this.state.dateString}/>
                    <br />
        </div>


        </div>



</div>


    );


}





}


export default withRouter(ClinicsFilteringPage);
