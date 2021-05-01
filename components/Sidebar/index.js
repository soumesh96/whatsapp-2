import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import ChatUserLists from "../ChatUserLists";
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
  const [user] = useAuthState(auth);
  // check if chat exits with the new user entered
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatsSnapshot, loading, error] = useCollection(userChatRef);

  const createChatHandler = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user?.email
    ) {
      // need to add the chat into DB 'chats' collection if it doesnot already exist and is valid
      db.collection("chats").add({
        users: [user?.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    // here recipient mail is the mail with whom we want to create chat with
    // check if recipient mail is already present or not
    // !! to make the value undefined, null , '' to false
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

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
        <IconButton onClick={() => {window.open('https://www.linkedin.com/in/soumeshbehera/', "_blank")}}>
          <LinkedInIcon />
        </IconButton>
      </FooterContainer>
    </Container>
  );
};

export default Sidebar;
