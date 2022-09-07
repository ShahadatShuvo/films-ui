import Head from "next/head";
import React from "react";
import { UserProvider } from "../lib/authContext";

function Layout({ user, loading = false, children }) {
  return (
    <UserProvider value={(user, loading)}>
      <Head>
        <title>Film Database</title>
      </Head>
      {/* <Nav />  */}
      <main>
        <div>{children}</div>
      </main>
    </UserProvider>
  );
}

export default Layout;
