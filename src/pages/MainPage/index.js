import { useLazyQuery, useReactiveVar } from "@apollo/client";
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

const LIMIT = 5;

const MainPage = () => {
  const { viewMode, siderLeftPos } = useViewModeWithSider();
  const location = useReactiveVar(locationVar);
  const { infiniteTargetElementRef } = useInfiniteScroll(handleScrollEnd);
  const [yearSeason, setYearSeason] = useState({
    year: null,
    season: null,
  });
  const [
    getLoadData,
    { called, loading, error, data, fetchMore }
  ] = useLazyQuery(ONLOAD_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const [filterMode, setFilterMode] = useState(FILTER_MODE.RANDOM);

  useEffect(() => {
    if (location && !called) {
      getLoadData({
        variables: { filter: filterMode, ...location, page: 1, limit: LIMIT },
      });
    }
  }, [called, filterMode, getLoadData, location]);

  function handleScrollEnd() {
    if (
      data && (filterMode === FILTER_MODE.RANDOM || data?.posts?.hasNextPage) &&
      fetchMore
    ) {
      fetchMore({
        variables: {
          filter: filterMode,
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
              ...fetchMoreResult?.posts,
              docs: prev?.posts?.docs
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
          filter: filterMode,
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

  function handleCreatePostSuccess() {
    if (data?.posts?.length <= 5) {
      fetchMore({
        variables: {
          filter: filterMode,
          ...location,
          page: 1,
          limit: LIMIT,
          area: data?.myArea?.name,
          year: yearSeason?.year,
          season: yearSeason?.season,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    }
  }

  return (
    <>
      {called && (loading) && <Loading />}
      {(error) && "Error..."}
      <PageTemplate
        viewMode={viewMode}
        user={data?.loginUser}
        area={data?.myArea}
        location={location}
        onCreatePostSuccess={handleCreatePostSuccess}
      >
        <PageContent>
          <LocationSeason
            areaName={data?.myArea?.name}
            onSeasonApplyBtnClick={handleSeasonApplyBtnClick}
          />
          <PostList
            posts={data?.posts?.docs}
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

export default MainPage;
