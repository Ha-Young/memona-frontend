import { useLazyQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { size } from "styled-theme";

import Modal from "../../components/molecules/Modal";
import FriendsList from "../../components/organisms/FriendsList";
import Header from "../../components/organisms/Header";
import LocationSeason from "../../components/organisms/LocationSeason";
import MobileHeader from "../../components/organisms/MobileHeader";
import MobileNavigator from "../../components/organisms/MobileNavigator";
import PostList from "../../components/organisms/PostList";
import PageTemplate from "../../components/templates/PageTemplate";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useMobileDeviceCheck from "../../hooks/useMobileDeviceCheck";
import useViewModeWithSider from "../../hooks/useViewModeWithSider";
import { locationVar } from "../../store";
import checkARAvaiable from "../../utils/checkARAvaiable";
import startAR from "../../utils/startAR/index";
import { ONLOAD_QUERY } from "./query";

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Sider = styled.div`
  position: fixed;
  left: ${({ left }) => `${left}px`};

  @media screen and (max-width: ${size("maxWidth")}) {
    display: none;
  }
`;

const Indicator = styled.div`
  position: absolute;
  bottom: -1rem;
  width: 5px;
  height: 5px;
`;

const ImgUpload = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const LIMIT = 5;

const MainPage = () => {
  const { viewMode, siderLeftPos } = useViewModeWithSider();
  const isMobileDevice = useMobileDeviceCheck();
  const location = useReactiveVar(locationVar);
  const { infiniteTargetElementRef } = useInfiniteScroll(handleScrollEnd);
  const [yearSeason, setYearSeason] = useState({
    year: null,
    season: null,
  });
  const [
    getLoadData,
    { called, loading, error, data, fetchMore }
  ] = useLazyQuery(ONLOAD_QUERY);
  const imageInputElement = useRef();
  const [imageBlobUrl, setImageBlobUrl] = useState();

  useEffect(() => {
    if (location && !called) {
      getLoadData({ variables: { ...location, page: 1, limit: LIMIT } });
    }
  }, [called, getLoadData, location]);

  function handleScrollEnd() {
    if (data?.posts?.hasNextPage) {
      fetchMore({
        variables: {
          area: data?.myArea?.name,
          page: data?.posts?.nextPage,
          limit: LIMIT,
          year: yearSeason?.year,
          season: yearSeason?.season,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...fetchMoreResult,
            posts: {
              ...fetchMoreResult.posts,
              docs: prev.posts.docs
                ? [...prev.posts.docs, ...fetchMoreResult.posts.docs]
                : [...fetchMoreResult.posts.docs],
            },
          };
        },
      });
    }
  }

  function handleSeasonApplyBtnClick({ year, season }) {
    if (year && season) {
      fetchMore({
        variables: {
          ...location,
          page: 1,
          limit: LIMIT,
          area: data?.myArea?.name,
          year,
          season,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });

      setYearSeason({
        year,
        season,
      });
    }
  }

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
    console.log(blobUrl);

    setImageBlobUrl(blobUrl);
  }

  function handleModalClose() {
    setImageBlobUrl(null);
  }

  return (
    <>
      {called && loading && "Loading..."}
      {error && "Error..."}
      {imageBlobUrl && (
        <Modal
          title="새로운 사진 게시글"
          isOpen={!!imageBlobUrl}
          closeable
          onClose={handleModalClose}
        >
          ㅇㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹㅇㄴㄹ
        </Modal>
      )}
      <ImgUpload
        ref={imageInputElement}
        accept="image/jpeg"
        type="file"
        onChange={onImgUpload}
      />
      <PageTemplate
        viewMode={viewMode}
        header={<Header />}
        mobileHeader={<MobileHeader onCameraBtnClick={handleCameraBtnClick} />}
        mobileNavigator={
          <MobileNavigator onCameraBtnClick={handleCameraBtnClick} />
        }
      >
        <PageContent>
          <LocationSeason
            areaName={data?.myArea?.name}
            onSeasonApplyBtnClick={handleSeasonApplyBtnClick}
          />
          <PostList
            posts={data?.posts?.docs}
            fetchingOptions={{ areaName: data?.myArea?.name, ...yearSeason }}
          />
        </PageContent>
        <Sider left={siderLeftPos}>
          <FriendsList user={data?.loginUser} />
        </Sider>
        <Indicator ref={infiniteTargetElementRef} />
      </PageTemplate>
    </>
  );
};

export default MainPage;
