import Nav from "../components/Nav";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";
import Wrapper from "../components/Wrapper";

function MyApp({ Component, pageProps }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <Nav />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Layout>
  );
}

export default MyApp;
