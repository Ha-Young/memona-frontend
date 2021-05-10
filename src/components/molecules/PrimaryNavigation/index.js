import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette } from "styled-theme";

import Icon from "../../atoms/Icon";

const Nav = styled.nav`
  display: flex;
  list-style: none;
  > :not(:first-child) {
    margin-left: 1rem;
  }
  a {
    font-weight: 300;
    color: ${palette("grayscale", 0)};
    font-size: 1.25rem;
    &.active {
      color: ${palette("grayscale", 0)};
    }
  }
`;

const PrimaryNavigation = (props) => {
  return (
    <Nav {...props}>
      <li>
        <Link to="/" exact activeClassName="active">
          <Icon icon="home" />
        </Link>
      </li>
      <li>
        <Link to="/" activeClassName="active">
          <Icon icon="compas" />
        </Link>
      </li>
      <li>
        <Link to="/" activeClassName="active">
          <Icon icon="map" />
        </Link>
      </li>
      <li>
        <Link to="/" activeClassName="active">
          <Icon icon="user" />
        </Link>
      </li>
    </Nav>
  );
};

PrimaryNavigation.propTypes = {
  reverse: PropTypes.bool,
};

export default PrimaryNavigation;
