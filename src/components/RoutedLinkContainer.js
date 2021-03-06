import React from "react";
import {Link} from "react-router-dom";
import { NavItem } from "react-bootstrap";
import '../css/Links.css';

function RoutedLinkContainer(props) {
  return (
    <Link to={`${props.link}`} className="spacing">
        <NavItem>{props.displayText}</NavItem>
      </Link>
  );
}

export default RoutedLinkContainer;
