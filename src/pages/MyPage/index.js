import { useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { size } from "styled-theme";

import Loading from "../../components/molecules/Loading";
import FriendsList from "../../components/organisms/FriendsList";
import LocationSeason from "../../components/organisms/LocationSeason";
import PostList from "../../components/organisms/PostList";
import PageTemplate from "../../components/templates/PageTemplate";
import { filterMode as FILTER_MODE } from "../../constants";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useViewModeWithSider from "../../hooks/useViewModeWithSider";
import { locationVar } from "../../store";
import { MY_POSTS_QUERY } from "./query";

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

const Info = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Indicator = styled.div`
  position: absolute;
  bottom: -1rem;
  width: 5px;
  height: 5px;
`;

const LIMIT = 10;

const MyPage = () => {
  const { viewMode, siderLeftPos } = useViewModeWithSider();
  const location = useReactiveVar(locationVar);
  const { infiniteTargetElementRef } = useInfiniteScroll(handleScrollEnd);
  const [yearSeason, setYearSeason] = useState({
    year: null,
    season: null,
  });
  const { called, loading, error, data, fetchMore } = useQuery(MY_POSTS_QUERY, {
    variables: {
      ...location,
      page: 1,
      limit: LIMIT,
    },
  });

  function handleScrollEnd() {
    if (data && data?.myPosts?.hasNextPage && fetchMore) {
      fetchMore({
        variables: {
          ...location,
          page: data?.myPosts?.nextPage,
          limit: LIMIT,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...fetchMoreResult,
            myPosts: {
              ...fetchMoreResult?.myPosts,
              docs: prev?.myPosts?.docs
                ? [...prev.myPosts.docs, ...fetchMoreResult.myPosts.docs]
                : [...fetchMoreResult.myPosts.docs],
            },
          };
        },
      });
    }
  }

  return (
    <>
      {called && loading && <Loading />}
      {error && "Error..."}
      <PageTemplate
        viewMode={viewMode}
        user={data?.loginUser}
        area={data?.myArea}
        location={location}
      >
        <PageContent>
          <Info>내 페이지입니다.</Info>
          <LocationSeason
            areaName={data?.myArea?.name}
            // onSeasonApplyBtnClick={handleSeasonApplyBtnClick}
          />
          <PostList
            posts={data?.myPosts?.docs}
            fetchingOptions={{
              areaName: data?.myArea?.name,
              ...yearSeason,
            }}
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

export default MyPage;
