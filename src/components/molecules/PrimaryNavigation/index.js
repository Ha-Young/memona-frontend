import PropTypes from "prop-types";
import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { palette, size } from "styled-theme";
import { ifProp } from "styled-tools";

import useToken from "../../../hooks/useToken";
import Icon from "../../atoms/Icon";

const Nav = styled.nav`
  display: flex;
  justify-content: ${ifProp("mobileType", "space-between", "auto")};
  align-items: center;
  list-style: none;
  width: ${ifProp("mobileType", "100%", "auto")};
  max-width: ${size("maxWidth")};
  > :not(:first-child) {
    margin-left: ${ifProp("mobileType", "0", "1rem")};
  }
  a {
    color: ${palette("grayscale", 0)};
    &.active {
      color: ${palette("grayscale", 0)};
    }
  }
`;

const PointerIcon = styled(Icon)`
  cursor: pointer;
`;

const PrimaryNavigation = ({
  iconSize = 25,
  mobileType,
  onCameraBtnClick = () => {},
  onImageUploadBtnClick = () => {},
  ...props
}) => {
  const { deleteToken } = useToken();
  const history = useHistory();
  function handleLogoutBtnClick() {
    deleteToken();
    history.push("/login");
  }

  return (
    <Nav mobileType={mobileType} {...props}>
      <li>
        <Link to="/">
          <Icon icon="home" size={iconSize} />
        </Link>
      </li>
      <li>
        <Link to="/my-posts">
          <Icon icon="compas" size={iconSize} />
        </Link>
      </li>
      {mobileType && (
        <li>
          <Icon icon="camera" size={iconSize} onClick={onCameraBtnClick}/>
        </li>
      )}
      <li>
        <PointerIcon icon="imagePlus" size={iconSize} onClick={onImageUploadBtnClick}/>
      </li>
      <li>
        <Icon icon="user" size={iconSize} onClick={handleLogoutBtnClick}/>
      </li>
    </Nav>
  );
};

PrimaryNavigation.propTypes = {
  iconSize: PropTypes.number,
  reverse: PropTypes.bool,
};

export default PrimaryNavigation;
