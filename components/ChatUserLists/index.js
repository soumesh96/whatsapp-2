import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { Container, UserAvatar } from "./Elements";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { auth, db } from "../../firebase";

const ChatUserLists = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChatConversation = () => {
    router.push(`/conversation/${id}`)
  }

  return (
    <Container onClick={enterChatConversation}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipient?.userName || recipientEmail}</p>
    </Container>
  );
};

export default ChatUserLists;
