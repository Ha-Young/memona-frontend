import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { size } from "styled-theme";

import defaultImg from "../../assets/images/examplePostImage.jpeg";
import FriendsList from "../../components/organisms/FriendsList";
import Header from "../../components/organisms/Header";
import MobileHeader from "../../components/organisms/MobileHeader";
import MobileNavigator from "../../components/organisms/MobileNavigator";
import PostList from "../../components/organisms/PostList";
import PageTemplate from "../../components/templates/PageTemplate";
import Theme from "../../components/themes";
import useViewMode from "../../hooks/useViewMode";
import calcAddPixel from "../../utils/calcAddPixel";

const Sider = styled.div`
  position: fixed;
  left: ${({ left }) => `${left}px`};

  @media screen and (max-width: ${size("maxWidth")}) {
    display: none;
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

  return (
    <PageTemplate
      viewMode={viewMode}
      header={<Header />}
      mobileHeader={<MobileHeader />}
      mobileNavigator={<MobileNavigator />}
    >
      <PostList posts={mockPosts} />
      <Sider left={siderLeftPos}>
        <FriendsList user={mockUser} />
      </Sider>
    </PageTemplate>
  );
};

export default MainPage;
