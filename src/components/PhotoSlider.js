import React from 'react';
import { withRouter } from "react-router-dom";
import { Modal, Button, Card, Carousel } from "react-bootstrap";
import bolnica from '../icons/bolnica.jfif'
import doktor from '../icons/doktor.jfif'
import lekovi from '../icons/lekovi.jfif'
import '../css/PhotoSlider.css';


class PhotoSlider extends React.Component{

  constructor(props) {
      super(props);
}

render() {
    return ( <div>


        <Carousel style={{ height:'50px', width: 'auto'}}>
            <Carousel.Item>
                  <img
                  className="d-block w-100" src={bolnica} alt="First slide"/>

                  <Carousel.Caption className="text">

                  <h1>Welcome to the Clinical System!</h1>
                  <p>
                    This system is designed for doctors, nurses and patients.
                    We're here to help you!
                    </p>
                    <font size="10" ><i>Hello {this.props.user.name}</i></font>

                  </Carousel.Caption>


            </Carousel.Item>

            <Carousel.Item>
                <img
                className="d-block w-100" src={doktor} alt="Third slide"/>

                <Carousel.Caption className="text">

                <h1>Welcome to the Clinical System!</h1>
                <p>
                  This system is designed for doctors, nurses and patients.
                  We're here to help you!
                  </p>
                  <font size="10" ><i>Hello {this.props.user.name}</i></font>


                </Carousel.Caption>

            </Carousel.Item>

            <Carousel.Item>
                  <img
                  className="d-block w-100" src={lekovi} alt="Third slide"/>

                  <Carousel.Caption className="text">

                  <h1>Welcome to the Clinical System!</h1>
                  <p>
                    This system is designed for doctors, nurses and patients.
                    We're here to help you!
                    </p>
                    <font size="10" ><i>Hello {this.props.user.name}</i></font>

                  </Carousel.Caption>

            </Carousel.Item>
        </Carousel>


      </div>
    )


}


}

export default withRouter(PhotoSlider);
