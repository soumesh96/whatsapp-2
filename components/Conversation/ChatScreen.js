import React, { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import CloseIcon from "@material-ui/icons/Close";
import firebase from "firebase";
import TimeAgo from "timeago-react";

import {
  ChatScreenContainer,
  Header,
  HeaderInformation,
  HeaderIcons,
  MessageContainer,
  EndOfMessage,
  InputContainer,
  Input,
  UserAvatarContainer,
  ProfileContainer,
  ProfileImageContainer,
  ProfileDetailsSection,
  TextWrapper,
  CloseButtonWrapper,
  UserAvatar,
} from "./Elements";
import { auth, db } from "../../firebase";
import ConversationList from "./ConversationList";
import getRecipientEmail from "../../utils/getRecipientEmail";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [chatInput, setChatInput] = useState("");
  const [isProfilePageActive, setIsProfilePageActive] = useState(false);
  const endOfMessagesRef = useRef(null);
  const router = useRouter();

  const recipientEmail = getRecipientEmail(chat.users, user);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <ConversationList
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <ConversationList
          key={message.id}
          user={message.user}
          message={message}
        />
      ));
    }
  };

  const onChangeChatInput = (event) => {
    setChatInput(event.target.value);
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (event) => {
    event.preventDefault();

    // update the last seen...
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: chatInput,
      user: user.email,
      photoURL: user.photoURL,
      userName: user.displayName,
      phoneNumber: user?.phoneNumber,
    });

    setChatInput("");
    scrollToBottom();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsProfilePageActive(open);
  };

  const profileDetails = () => (
    <ProfileContainer role="presentation">
      <CloseButtonWrapper onClick={toggleDrawer(false)}>
        <CloseIcon />
      </CloseButtonWrapper>
      <ProfileImageContainer>
        {recipient?.photoURL ? (
          <img src={recipient?.photoURL} alt="noProfile" />
        ) : (
          <UserAvatar src={recipientEmail[0]} />
        )}
      </ProfileImageContainer>
      <ProfileDetailsSection>
        {recipient ? (
          <React.Fragment>
            <TextWrapper uppercase fs="20px" lh="22px" bold>
              {recipient?.displayName}
            </TextWrapper>
            <TextWrapper>{recipient?.email}</TextWrapper>
            <TextWrapper>{recipient?.phoneNumber}</TextWrapper>
          </React.Fragment>
        ) : (
          <TextWrapper fs="16px" lh="19px" bold>
            No Details Found !!!
          </TextWrapper>
        )}
      </ProfileDetailsSection>
    </ProfileContainer>
  );

  return (
    <ChatScreenContainer>
      <SwipeableDrawer
        anchor="right"
        open={isProfilePageActive}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {profileDetails()}
      </SwipeableDrawer>
      <Header>
        <UserAvatarContainer
          onClick={() => {
            setIsProfilePageActive(true);
          }}
        >
          {recipient ? (
            <Avatar src={recipient?.photoURL} />
          ) : (
            <Avatar src={recipientEmail[0]} />
          )}
        </UserAvatarContainer>

        <HeaderInformation>
          <h3>{recipient?.userName || recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active {"  "}{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input
          placeholder="Start Typing ..."
          value={chatInput}
          onChange={onChangeChatInput}
        />
        <button
          hidden
          disabled={!chatInput}
          type="submit"
          onClick={sendMessage}
        >
          Send Message
        </button>
        <MicIcon />
      </InputContainer>
    </ChatScreenContainer>
  );
};

export default ChatScreen;
