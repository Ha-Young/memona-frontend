import PropTypes from "prop-types";
import styled from "styled-components";
import { font, palette } from "styled-theme";
import { withProp } from "styled-tools";

const Label = styled.label`
  font-family: ${font("primary")};
  color: ${palette("grayscale", 1)};
  font-size: ${withProp("size", size => `${size}rem`)};
  line-height: 2em;
`;

Label.propTypes = {
  reverse: PropTypes.bool,
  size: PropTypes.number,
};

Label.defaultProps = {
  size: 1,
};

export default Label;
