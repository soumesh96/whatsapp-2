import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "firebase";

import Login from "../../components/Login";

const login = () => {
  const router = useRouter();
  console.log(`
  Hey Developer
  Let me know if found any bug as this is still in development phase
  Contact me - https://www.linkedin.com/in/soumeshbehera/
`);
  if (firebase?.auth()?.currentUser) {
    router.replace("/");
  }
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
        <title>Login</title>
      </Head>
      <Login />
    </div>
  );
};

export default login;
