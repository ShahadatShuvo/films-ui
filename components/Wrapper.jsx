import Head from "next/head";
import React from "react";

function Wrapper({ children }) {
  return (
    <div className="w-[100vw] flex justify-center items-center my-5">
      <Head>
        <title>Film Database</title>
      </Head>
      {/* <Nav />  */}
      <main>
        <div className="bg-white p-5 rounded-lg max-w-[60vw] min-w-[40vw]">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Wrapper;
