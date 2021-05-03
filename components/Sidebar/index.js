import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import ChatUserLists from "../ChatUserLists";
import AddNewContact from "./AddNewContact";
import SelfProfile from "./SelfProfile";
import {
  Container,
  Header,
  TextWrapper,
  IconsContainer,
  Search,
  SearchInput,
  SidebarButton,
  FooterContainer,
} from "./Elements";
import { auth, db } from "../../firebase";

const Sidebar = () => {
  const [isProfilePageActive, setIsProfilePageActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [user] = useAuthState(auth);

  // check if chat exits with the new user entered
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatsSnapshot, loading, error] = useCollection(userChatRef);

  const createChatHandler = () => {
    setIsModalActive(true);
  };

  const onModalCloseHandler = () => {
    setIsModalActive(false);
  };

  const userProfileClickHandler = () => {
    // display the profile details
    auth.signOut();
  };

  return (
    <Container>
      <Header>
        <SelfProfile
          isProfilePageActive={isProfilePageActive}
          setIsProfilePageActive={setIsProfilePageActive}
          userDetails={user}
          src={user?.photoURL}
          onSignOut={userProfileClickHandler}
        />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChatHandler}>
        Start a new chat
      </SidebarButton>

      {/* List of chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <ChatUserLists key={chat.id} id={chat.id} users={chat.data().users} />
      ))}

      <FooterContainer>
        <TextWrapper>© 2021 Developed By SRB</TextWrapper>
        <IconButton
          onClick={() => {
            window.open("https://www.linkedin.com/in/soumeshbehera/", "_blank");
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </FooterContainer>
      {isModalActive && (
        <AddNewContact
          isModalActive={isModalActive}
          onModalClose={onModalCloseHandler}
          chatsSnapshot={chatsSnapshot}
        />
      )}
    </Container>
  );
};

export default Sidebar;
