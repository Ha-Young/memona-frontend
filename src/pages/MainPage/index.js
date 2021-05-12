import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { palette, size } from "styled-theme";

import defaultImg from "../../assets/images/examplePostImage.jpeg";
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
import useViewMode from "../../hooks/useViewMode";
import calcAddPixel from "../../utils/calcAddPixel";

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
    padding: .5rem;
  }

  @media screen and (max-width: ${size("mobileWidth")}) {
    margin-bottom: 1rem;
    padding: 0;
    height: 180px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom : 5px;
  right: 5px;
  z-index: 1;

  @media screen and (max-width: ${size("mobileWidth")}) {
    height: 24px;
    width: 28px;
    font-size: .6rem;
  }
`;

const mockPosts = [
  {
    _id: 1,
    postDate: "2021-05-30",
    author: {
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
      postImageUrl: defaultImg,
    },
    content: "테스트입니다. 테스트 posts mock 데이터입니다",
  },
  {
    _id: 2,
    postDate: "2021-05-30",
    author: {
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
      postImageUrl: defaultImg,
    },
    content: "테스트입니다. 테스트 posts mock 데이터입니다",
  }
];

const mockUser = {
  username: "테스트유저",
  imageUrl:
    "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
  friends: [
    {
      _id: 1,
      username: "친구1",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
    },
    {
      _id: 2,
      username: "친구2입니다",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
    },
    {
      _id: 3,
      username: "친구3",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
    }
  ],
};

const MainPage = () => {
  const [siderLeftPos, setSiderLeftPos] = useState();
  const viewMode = useViewMode();

  useEffect(() => {
    setSiderPosition(viewMode.width);
  }, [viewMode]);

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

  const yearValueRef = useRef();
  const seasonValueRef = useRef();

  return (
    <PageTemplate
      viewMode={viewMode}
      header={<Header />}
      mobileHeader={<MobileHeader />}
      mobileNavigator={<MobileNavigator />}
    >
      <PageContent>
        <ContentTop>
          <LocationInfo areaName="역삼/선릉" />
          <SeasonPicker yearValueRef={yearValueRef} seasonValueRef={seasonValueRef}/>
          <StyledButton height={30} onClick={handleApplyBtnClick}>적용</StyledButton>
        </ContentTop>
        <PostList posts={mockPosts} />
      </PageContent>
      <Sider left={siderLeftPos}>
        <FriendsList user={mockUser} />
      </Sider>
    </PageTemplate>
  );
};

export default MainPage;
