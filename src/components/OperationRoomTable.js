import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button, Card } from "react-bootstrap";
import roomicon from '../icons/surgery-room.svg'
import '../css/OperationRoom.css';
import EditRoom from './EditRoom';
import 'react-table-6/react-table.css';
var ReactTable = require('react-table-6').default;



const DoctorDeletedAlert = withReactContent(Swal)
class OperationRoomTable extends React.Component {
    constructor(props) {
        super(props);

        this.renderTableData = this.renderTableData.bind(this);
    }

    deleteRoom(room) {

        let token = localStorage.getItem('token');
        const options = {
            headers: { 'Authorization': 'Bearer ' + token}
        };

        //console.log(doctor.email);

         axios.post("http://localhost:8081/api/rooms/deleteroom", room, options).then(
             console.log(room),
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
        
        return this.props.content.map((room, index) => {
            const { name, number,isReserved } = room//destructuring
            return (
         
         
               <tr key={name.toString()}>
                 <img src={roomicon} style={{ width: '20px',top:'10px',height:'20px'}} />
                 <td>{room.name}</td>
                 <td>{room.number}</td>
                 <td>{room.isReserved}</td>
                 <td><Button className="deleteRoom" variant="outline-danger" onClick={this.deleteRoom.bind(this, room)} >Delete</Button></td>
                 <td><EditRoom/></td>
               </tr>
         
         
         
            )
         })
      
        }
    
        render() {

            const rooms = [];

            for (var i = 0; i < this.props.content.length; i++) {

                const name = this.props.content[i].name;
                const number = this.props.content[i].number;
                const isReserved =  this.props.content[i].isReserved;

                console.log(this.props.content[i]);
              
              
               {rooms.push({name : name, number: number,isReserved: isReserved});}
              
              }

            const columns = [

                  {
                    accessor: "name",
                    Header:"Name"
                  },
                  {
                    accessor: "number",
                    Header: "Number"
                  },
                  {
                    accessor: "isReserved",
                    Header: "Reserved"
                  },
                  {
                    accessor: "price",
                    Header: "Delete",
                    Cell: ({ row }) => (<Button className="deleteRoom" variant="outline-danger" onClick={this.deleteRoom.bind(this, row)} >Delete</Button>)
                  },
                  {
                    accessor: "price",
                    Header: "Edit",
                    Cell: ({ original }) => (<EditRoom content={original}/>)
                  }
            ];

            return (
              <div>
                    <ReactTable data={rooms} columns={columns}
                        minRows={0}
                        showPagination={false} />
              </div>
            )
    
        }
}
export default OperationRoomTable;
