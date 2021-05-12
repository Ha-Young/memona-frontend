import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";
import { font, palette } from "styled-theme";
import { prop } from "styled-tools";

const fontSize = ({ level }) => `${0.75 + 1 * (1 / level)}em`;

const styles = css`
  font-family: ${font("primary")};
  font-weight: 500;
  font-size: ${fontSize};
  margin: ${prop("margin", "0.85714em 0 0.57142em")};
  color: ${palette({ grayscale: 0 }, 1)};
`;

const Heading = styled(
  ({ level, children, reverse, palette, theme, ...props }) =>
    React.createElement(`h${level}`, props, children)
)`
  ${styles}
`;

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
};

Heading.defaultProps = {
  level: 1,
  palette: "grayscale",
};

export default Heading;
