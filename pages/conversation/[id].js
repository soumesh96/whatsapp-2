import React from "react";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { db, auth } from "../../firebase";
import OpenConversation from "../../components/Conversation/OpenConversation";
import getRecipientEmail from "../../utils/getRecipientEmail";
import Loader from "../../components/Loader";

const ConversationPage = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(chat.users, user);

  const [recipientSnapshot, loading] = useCollection(
    db.collection("users").where("email", "==", recipientEmail)
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  // if (loading) return <Loader />

  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta charSet="utf-8" />
        <meta name="full-screen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <title>Chat with {recipient?.userName || recipientEmail}</title>
      </Head>

      <OpenConversation chat={chat} messages={messages} />
    </div>
  );
};

export default ConversationPage;

export async function getServerSideProps(context) {
  // gets called before the actual page loads
  const ref = db.collection("chats").doc(context.query.id);

  // PREP the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // PREP the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  // as we cannot pass complicated object over the server so stringify the response to single text
  // chat is simple object dont need to stringify
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
