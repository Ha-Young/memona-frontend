import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "styled-theme";

import Avatar from "../../atoms/Avatar";
import Heading from "../../atoms/Heading";
import Img from "../../atoms/Img";
import Label from "../../atoms/Label";
import IconButton from "../IconButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.genericBackgroundColor};
  overflow-y: scroll;
`;

const StyledImg = styled(Img)`
  padding: 0;
  max-width: 100vw;
  max-height: 55vh;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.genericBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.genericBorderColor};
`;

const PostInfo = styled.div`
  width: 100%;
`;

const Field = styled.section`
  display: flex;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  background-color: ${palette("grayscale", 0, true)};
  border-top: 1px solid ${({ theme }) => theme.genericBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.genericBorderColor};
  box-sizing: border-box;
`;

const FieldAligned = styled(Field)`
  align-items: center;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  width: 80%;
  height: 3rem;
  border: none;
  resize: none;

  &:focus {
    outline: 0;
  }
`;

const StyledLabel = styled(Label)`
  margin-left: 0.3rem;
`;

const CheckBox = styled.input`
  margin-left: 1rem;
  width: 1rem;
  height: 1rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .5rem;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

const StyledIconButton = styled(IconButton)`
  background-color: transparent;
`;

const StyledHeading = styled(Heading)`
  margin: 0 1rem !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
`;

const ApplyIconButton = styled(IconButton)`
  background-color: transparent;
`;

const AddPostModalView = ({
  imageBlobUrl,
  loginUser,
  onCloseBtnClick,
  onPostBtnClick,
  ...props
}) => {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleAnonymousOptionChange(e) {
    setIsAnonymous(e.target.checked);
  }

  function handlePostBtnClick() {
    onPostBtnClick({ content, isAnonymous });
  }

  function handleKeyDown(e) {
    console.log(e.keyCode);
  }

  return (
    <Wrapper {...props}>
      <Header>
        <StyledIconButton
          icon="close"
          onClick={onCloseBtnClick}
          height={28}
          reverse
        />
        <StyledHeading level={2} reverse={props.reverse}>
          새 게시물 등록
        </StyledHeading>
        <ApplyIconButton icon="post" height={28} reverse onClick={handlePostBtnClick}/>
      </Header>
      <StyledImg src={imageBlobUrl} alt="preview" />
      <PostInfo>
        <Field>
          <Avatar src={loginUser.imageUrl} alt="user" />
          <TextArea
            placeholder="문구 입력..."
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
          />
        </Field>
        <FieldAligned>
          <StyledLabel>익명 조건</StyledLabel>
          <CheckBox
            type="checkbox"
            checked={isAnonymous}
            onChange={handleAnonymousOptionChange}
          />
        </FieldAligned>
      </PostInfo>
    </Wrapper>
  );
};

export default AddPostModalView;
