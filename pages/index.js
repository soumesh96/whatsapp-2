import Head from "next/head";
import {isMobile} from 'react-device-detect';

import Sidebar from "../components/Sidebar";
import MobileScreen from '../components/MobileDevice';

export default function Home() {
  if (isMobile) {
    return (<MobileScreen />)
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
        <title>Whatsapp 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  );
}
