import React from 'react'
import ReactDOM from 'react-dom';
import { Modal, Button } from "react-bootstrap";
import pharmacy from '../icons/pharmacy.svg'
import '../css/ActivatedAccount.css'

class ActivatedAccount extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div className="divActivated">
                <img style={{height:'100px', width: 'auto'}} className="phIcon" variant="top" src={pharmacy} alt='Unavailable icon' />
                <h2 className="activatedTitle">Your account has been activated successfully!</h2>
                <a href="/login" className="activatedLink" >Log in</a>

            </div>
        )
    }


} 
export default ActivatedAccount