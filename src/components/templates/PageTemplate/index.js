import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import { viewType as viewTypeConstant } from "../../../constants";
import useMobileDeviceCheck from "../../../hooks/useMobileDeviceCheck";
import startAR from "../../../utils/AR";
import checkARAvaiable from "../../../utils/checkARAvaiable";
import { getCurYearSeason, getFormatDate } from "../../../utils/date";
import Modal from "../../molecules/Modal";
import AddPostModalView from "../../organisms/AddPostModalView";
import Header from "../../organisms/Header";
import MobileHeader from "../../organisms/MobileHeader";
import MobileNavigator from "../../organisms/MobileNavigator";
import { CREATE_POST } from "./query";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.75rem 0;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.genericBackgroundColor};

  @media screen and (max-width: ${size("mobileWidth")}) {
    padding: 2.75rem 0 3.75rem;
  }
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: ${palette("grayscale", 0, true)};
  border-bottom: 1px solid ${palette("grayscale", 5)};
`;

const Content = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
  max-width: ${size("maxWidth")};

  @media screen and (max-width: ${size("maxWidth")}) {
    margin: 1.5rem 0;
    justify-content: center;
  }

  @media screen and (max-width: ${size("mobileWidth")}) {
    margin: 1rem 0;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
`;

const MobileNavigatorWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: ${palette("grayscale", 0, true)};
  border-top: 1px solid ${palette("grayscale", 5)};
`;

const ImgUpload = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const PageTemplate = ({
  viewMode,
  location,
  children,
  onCreatePostSuccess,
  user,
  area,
  footer,
  ...props
}) => {
  const viewType = viewMode.viewType;
  const imageInputElement = useRef();
  const isMobileDevice = useMobileDeviceCheck();
  const [imageBlobUrl, setImageBlobUrl] = useState();
  const [createPost, { loading: createLoading, error: createError }] = useMutation(CREATE_POST, {
    onCompleted: handleCreatePostSuccess,
    onError: onCreatePostError,
  });

  function handleARConfirmBtnClick() {
    imageInputElement.current.click();
  }

  async function handleCameraBtnClick() {
    if (isMobileDevice) {
      const isARAvaiable = await checkARAvaiable();

      if (isARAvaiable) {
        return startAR({ onARConfirmBtnClick: handleARConfirmBtnClick });
      }
    }

    imageInputElement.current.click();
  }

  function onImgUpload(e) {
    const files = imageInputElement.files || e.target.files;
    const file = files[0];

    const blobUrl = window.URL.createObjectURL(file);

    setImageBlobUrl(blobUrl);
  }

  function handlePostBtnClick(postData) {
    const { year, season, date } = getCurYearSeason();
    const { content, isAnonymous, imageBlob } = postData;
    const dateString = getFormatDate(date, true);

    const locationGeoJson = {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    };

    // const imageBlob = await fetch(imageBlobUrl).then((r) => r.blob());
    imageBlob.name = `${user._id}-${dateString}`;

    createPost({
      variables: {
        createPostInput: {
          author: user._id,
          location: locationGeoJson,
          area: area?.name,
          content,
          isAnonymous,
          season,
          year,
        },
        file: imageBlob,
      },
    });
  }

  function handleModalCloseBtnClick() {
    URL.revokeObjectURL(imageBlobUrl);
    setImageBlobUrl(null);
  }

  function handleCreatePostSuccess() {
    onCreatePostSuccess();
    setImageBlobUrl("");
  }

  function onCreatePostError() {
    setImageBlobUrl("");
  }

  function handleImageUploadBtnClick() {
    imageInputElement.current.click();
  }

  return (
    <>
      {imageBlobUrl && (
        <Modal
          headless
          onClose={handleModalCloseBtnClick}
          isOpen={!!imageBlobUrl}
        >
          <AddPostModalView
            imageBlobUrl={imageBlobUrl}
            loginUser={user}
            onPostBtnClick={handlePostBtnClick}
            onCloseBtnClick={handleModalCloseBtnClick}
          />
        </Modal>
      )}
      <Wrapper {...props}>
        <ImgUpload
          ref={imageInputElement}
          accept="image/jpeg"
          type="file"
          onChange={onImgUpload}
        />
        <HeaderWrapper>
          {viewType === viewTypeConstant.MOBILE ? (
            <MobileHeader onCameraBtnClick={handleCameraBtnClick} />
          ) : (
            <Header onImageUploadBtnClick={handleImageUploadBtnClick} />
          )}
        </HeaderWrapper>
        <Content>{children}</Content>
        {viewType === viewTypeConstant.MOBILE && (
          <MobileNavigatorWrapper>
            <MobileNavigator
              onCameraBtnClick={handleCameraBtnClick}
              onImageUploadBtnClick={handleImageUploadBtnClick}
            />
          </MobileNavigatorWrapper>
        )}
        {footer && <Footer>{footer}</Footer>}
      </Wrapper>
    </>
  );
};

PageTemplate.propTypes = {
  footer: PropTypes.node,
  children: PropTypes.any.isRequired,
};

export default PageTemplate;
