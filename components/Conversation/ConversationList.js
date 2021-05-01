import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

import {
  ConversationListContainer,
  Sender,
  Reciever,
  Timestamp,
} from "./Elements";
import { auth } from "../../firebase";

const ConversationList = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <ConversationListContainer>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </ConversationListContainer>
  );
};

export default ConversationList;
