import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase';

import { auth, db } from "../firebase";
import Login from './login';
import Loader from '../components/Loader';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user?.email,
        userName: user?.displayName,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user?.photoURL,
        phoneNumber: user?.phoneNumber,
        emailVerified: user?.emailVerified,
      }, { merge: true });
    }
  }, [user]);

  if (loading) return <Loader />
  if (!user) return <Login />

  return <Component {...pageProps} />;
}

export default MyApp;
