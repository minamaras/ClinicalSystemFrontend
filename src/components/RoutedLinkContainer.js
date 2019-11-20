import React from "react";
import { NavItem } from "react-bootstrap";
import {Link} from "react-router-dom";
import '../css/Links.css';

function RoutedLinkContainer(props) {
  return (
    <Link to={`${props.link}`} className="spacing">
        <NavItem>{props.displayText}</NavItem>
      </Link>
  );
}

export default RoutedLinkContainer;