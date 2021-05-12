import React from "react";
import styled from "styled-components";
import { prop } from "styled-tools";

import Button from "../../atoms/Button";
import Label from "../../atoms/Label";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: ${prop("width", "auto")};
  height: ${prop("height", "auto")};
  box-sizing: border-box;
`;

const StyledLabel = styled(Label)`
  margin-bottom: 20px;
  font-size: .9em;
`;

const AddToHomeForm = ({
  onAddToHomeBtnClick,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <StyledLabel>앱을 홈화면에 바로가기로 등록하세요</StyledLabel>
      <Button onClick={onAddToHomeBtnClick} padding={"20px 50px"} width={"80px"} fontSize={".9rem"}>
        홈화면에<br />등록하기
      </Button>
    </Wrapper>
  );
};

export default AddToHomeForm;
