import React from "react";
import {Link} from "react-router-dom";
import { NavItem } from "react-bootstrap";

function RoutedLinkContainer(props) {
  return (

      <Link to={`${props.link}`}>
        <NavItem>{props.displayText}</NavItem>
      </Link>
  );
}

export default RoutedLinkContainer;
