import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function RoutedLinkContainer(props) {
  return (
    <LinkContainer to={props.link}>
      <NavItem>{props.displayText}</NavItem>
    </LinkContainer>
  );
}

export default withRouter(RoutedLinkContainer);