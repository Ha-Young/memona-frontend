import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { size } from "styled-theme";

import defaultImg from "../../assets/images/examplePostImage.jpeg";
import FriendsList from "../../components/organisms/FriendsList";
import Header from "../../components/organisms/Header";
import PostList from "../../components/organisms/PostList";
import PageTemplate from "../../components/templates/PageTemplate";
import Theme from "../../components/themes";
import { viewType as viewTypeConstant } from "../../constants";
import { viewModeVar } from "../../store";
import calcAddPixel from "../../utils/calcAddPixel";

const Sider = styled.div`
  position: fixed;
  left: ${({ left }) => `${left}`};

  @media screen and (max-width: ${size("maxWidth")}) {
    display: none;
  }
`;

const mockPosts = [
  {
    postDate: "2021-05-30",
    author: {
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwtCFYAlDYjooMIEVhBD8VZsJ35X164RKn034hc=s96-c",
      postImageUrl: defaultImg,
    },
    content: "테스트입니다. 테스트 posts mock 데이터입니다",
  },
  {
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
      username: "친구1",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
    },
    {
      username: "친구2",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
    },
    {
      username: "친구3",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJyu9yYaEXDkC30xWzNlO59Uhzdyt_ELAuinPyY1=s96-c",
    }
  ],
};

const MainPage = () => {
  const [siderLeftPos, setSiderLeftPos] = useState();
  const viewMode = useReactiveVar(viewModeVar);

  useEffect(() => {
    function handleResize() {
      const width = document.body.clientWidth;
      const viewType =
        width <= Theme.sizes.maxWidth
          ? viewTypeConstant.MOBILE
          : viewTypeConstant.PC;

      viewModeVar({
        width,
        viewType,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setSliderPosition(viewMode.width);
  }, [viewMode]);

  function setSliderPosition(clientWidth) {
    const left = calcAddPixel(clientWidth, Theme.sizes.postListWidth) / 2;
    setSiderLeftPos(left + "px");
  }

  return (
    <PageTemplate header={<Header />}>
      <PostList posts={mockPosts} />
      <Sider left={siderLeftPos}>
        <FriendsList user={mockUser} />
      </Sider>
    </PageTemplate>
  );
};

export default MainPage;
