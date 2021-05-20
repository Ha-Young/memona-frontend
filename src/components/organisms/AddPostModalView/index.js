import "cropperjs/dist/cropper.css";

import React, { useState } from "react";
import Cropper from "react-cropper";
import styled from "styled-components";
import { palette } from "styled-theme";

import Avatar from "../../atoms/Avatar";
import Heading from "../../atoms/Heading";
import Label from "../../atoms/Label";
import IconButton from "../../molecules/IconButton";

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
  const [image, setImage] = useState(imageBlobUrl);
  const [cropper, setCropper] = useState();
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  function handleContentChange(e) {
    setContent(e.target.value);
  }

  function handleAnonymousOptionChange(e) {
    setIsAnonymous(e.target.checked);
  }

  function handlePostBtnClick() {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob((imageBlob) => {
        onPostBtnClick({ content, isAnonymous, imageBlob });
      }, "image/jpeg", 0.75);
      // const croppedImageBlob = cropper.getCroppedCanvas().toDataURL("image/jpeg");
    }
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
      <Cropper
        style={{ minHeight: "55vh", maxWidth: "100vw" }}
        initialAspectRatio={1}
        src={image}
        viewMode={1}
        guides={false}
        minCropBoxHeight={300}
        minCropBoxWidth={300}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
      <PostInfo>
        <Field>
          <Avatar src={loginUser.imageUrl} alt="user" />
          <TextArea
            placeholder="문구 입력..."
            value={content}
            onChange={handleContentChange}
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
