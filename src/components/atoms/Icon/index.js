import PropTypes from "prop-types";
import React from "react";
import { RiCloseCircleLine, RiCompass3Line, RiHome4Fill, RiMap2Line, RiUser3Fill } from "react-icons/ri";
import styled from "styled-components";
import { palette } from "styled-theme";
import { ifProp } from "styled-tools";

const fontSize = ({ width, height }) => {
  const size = width || height;
  return size ? `${size / 16}rem` : "1.25em";
};

const Wrapper = styled.span`
  display: inline-block;
  font-size: ${fontSize};
  color: ${ifProp("palette", palette({ grayscale: 0 }, 1), "currentcolor")};
  width: 1em;
  height: 1em;
  margin: 0.1em;
  box-sizing: border-box;

  & > svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
    stroke: currentcolor;
  }
`;

const Icon = ({ icon, ...props }) => {
  let svg;

  switch (icon) {
    case "home":
      svg = <RiHome4Fill />;
      break;
    case "compas":
      svg = <RiCompass3Line />;
      break;
    case "map":
      svg = <RiMap2Line />;
      break;
    case "user":
      svg = <RiUser3Fill />;
      break;
    default:
      svg = <RiCloseCircleLine />;
      break;
  }
  return <Wrapper {...props}>{svg}</Wrapper>;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
};

export default Icon;
