import { Map, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import axios from 'axios';
import { Modal, Button, Card, Form, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const mapStyles = {
    width: '45%',
    height: '50%',
    marginLeft: '29%',
    marginTop : '-7%'
  };

class MapClinic extends React.Component {
    
    constructor(props) {
        super(props);

    this.state = {

        }

    }

    render() {
        return (
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
      }


} export default GoogleApiWrapper({
    apiKey: 'AIzaSyCdVHHlG3AnSoG9uY1qjeOGWujieSqtKj4'
  })(MapClinic);