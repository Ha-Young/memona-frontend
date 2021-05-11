import React from "react";
import styled from "styled-components";
import { prop } from "styled-tools";

import Img from "../Img";

const StyledImg = styled(Img)`
  border-radius: 50%;
  width: ${prop("size", "32px")};
  height: ${prop("size", "32px")};
`;

const Avatar = ({ ...props }) => {
  return <StyledImg {...props} />;
};

export default Avatar;
