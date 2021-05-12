import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { palette } from "styled-theme";

import Icon from "../../atoms/Icon";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  list-style: none;
  > :not(:first-child) {
    margin-left: 1rem;
  }
  a {
    color: ${palette("grayscale", 0)};
    &.active {
      color: ${palette("grayscale", 0)};
    }
  }
`;

const PrimaryNavigation = ({ iconSize = 25, ...props }) => {
  return (
    <Nav {...props}>
      <li>
        <Link to="/" exact activeClassName="active">
          <Icon icon="home" size={iconSize}/>
        </Link>
      </li>
      <li>
        <Link to="/" activeClassName="active">
          <Icon icon="compas" size={iconSize}/>
        </Link>
      </li>
      <li>
        <Link to="/" activeClassName="active">
          <Icon icon="map" size={iconSize}/>
        </Link>
      </li>
      <li>
        <Link to="/" activeClassName="active">
          <Icon icon="user" size={iconSize}/>
        </Link>
      </li>
    </Nav>
  );
};

PrimaryNavigation.propTypes = {
  iconSize: PropTypes.number,
  reverse: PropTypes.bool,
};

export default PrimaryNavigation;
