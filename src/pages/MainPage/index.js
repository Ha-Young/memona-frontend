import { useLazyQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import Button from "../../components/atoms/Button";
import LocationInfo from "../../components/molecules/LocationInfo";
import SeasonPicker from "../../components/molecules/SeasonPicker";
import FriendsList from "../../components/organisms/FriendsList";
import Header from "../../components/organisms/Header";
import MobileHeader from "../../components/organisms/MobileHeader";
import MobileNavigator from "../../components/organisms/MobileNavigator";
import PostList from "../../components/organisms/PostList";
import PageTemplate from "../../components/templates/PageTemplate";
import Theme from "../../components/themes";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useMobileDeviceCheck from "../../hooks/useMobileDeviceCheck";
import useViewMode from "../../hooks/useViewMode";
import { locationVar } from "../../store";
import calcAddPixel from "../../utils/calcAddPixel";
import checkARAvaiable from "../../utils/checkARAvaiable";
import startAR from "../../utils/startAR";
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

const ContentTop = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;
  height: 200px;
  background-color: ${palette("grayscale", 0, true)};
  border: 1px solid ${palette("grayscale", 5)};

  @media screen and (max-width: ${size("maxWidth")}) {
    margin-bottom: 1.5rem;
    padding: 0.5rem;
  }

  @media screen and (max-width: ${size("mobileWidth")}) {
    margin-bottom: 1rem;
    padding: 0;
    height: 180px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 1;

  @media screen and (max-width: ${size("mobileWidth")}) {
    height: 24px;
    width: 28px;
    font-size: 0.6rem;
  }
`;

const Indicator = styled.div`
  position: absolute;
  bottom: -1rem;
  width: 5px;
  height: 5px;
`;

const LIMIT = 5;

const MainPage = () => {
  const [siderLeftPos, setSiderLeftPos] = useState();
  const viewMode = useViewMode();
  const isMobileDevice = useMobileDeviceCheck();
  const location = useReactiveVar(locationVar);
  const yearValueRef = useRef();
  const seasonValueRef = useRef();
  const lastElementRef = useRef();
  const [getLoadData, { called, loading, error, data, fetchMore }] = useLazyQuery(ONLOAD_QUERY);
  useInfiniteScroll(fetchPostMore, lastElementRef);
  console.log("mainpage data", data);

  useEffect(() => {
    setSiderPosition(viewMode.width);
  }, [viewMode]);

  useEffect(() => {
    if (location && !called) {
      getLoadData({ variables: { ...location, page: 1, limit: LIMIT } });
    }
  }, [called, getLoadData, location]);

  function fetchPostMore() {
    console.log("fetchPostMore", data?.posts?.hasNextPage, data?.posts?.nextPage);
    if (data?.posts?.hasNextPage) {
      console.log("before fetchMore", fetchMore);
      fetchMore({
        variables: {
          page: data.posts.nextPage,
          limit: LIMIT,
        },
      });
    }
  }

  function setSiderPosition(clientWidth) {
    const siderleftPos =
      calcAddPixel(
        clientWidth,
        Theme.sizes.postListWidth,
        `-${Theme.sizes.friendsListWidth}`
      ) / 2;
    setSiderLeftPos(siderleftPos);
  }

  function handleApplyBtnClick() {
    console.log(yearValueRef.current);
    console.log(seasonValueRef.current);
  }

  async function handleCameraBtnClick() {
    if (isMobileDevice) {
      const isARAvaiable = await checkARAvaiable();

      if (isARAvaiable) {
        startAR();
      }
    }
  }

  return (
    <>
      {(called && loading) && "Loading..."}
      <PageTemplate
        viewMode={viewMode}
        header={<Header />}
        mobileHeader={<MobileHeader onCameraBtnClick={handleCameraBtnClick} />}
        mobileNavigator={
          <MobileNavigator onCameraBtnClick={handleCameraBtnClick} />
        }
      >
        <PageContent>
          <ContentTop>
            <LocationInfo areaName={data?.myArea?.name} />
            <SeasonPicker
              yearValueRef={yearValueRef}
              seasonValueRef={seasonValueRef}
            />
            <StyledButton height={30} onClick={handleApplyBtnClick}>
              적용
            </StyledButton>
          </ContentTop>
          <PostList posts={data?.posts?.docs} areaName={data?.myArea?.name}/>
        </PageContent>
        <Sider left={siderLeftPos}>
          <FriendsList user={data?.loginUser} />
        </Sider>
        <Indicator ref={lastElementRef} />
      </PageTemplate>
    </>
  );
};

export default MainPage;
