import React from "react";
import {isMobile} from 'react-device-detect';

import { Container, ChatContainer } from "./Elements";
import Sidebar from "../Sidebar";
import ChatScreen from "./ChatScreen";
import MobileScreen from '../MobileDevice';

const OpenConversation = ({ chat, messages }) => {
  if (isMobile) {
    return (<MobileScreen />)
  }

  return (
    <Container>
      <Sidebar />

      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default OpenConversation;
