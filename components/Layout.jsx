import Head from "next/head";
import React from "react";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Film Database</title>
      </Head>
      {/* <Nav />  */}
      <main className="px-4">
        <div
          className="
          flex
          justify-center
          items-center
          bg-white
          mx-auto
          w-2/4
          rounded-lg
          my-16
          p-10
        "
        >
          <div className="w-full text-2xl font-medium">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
