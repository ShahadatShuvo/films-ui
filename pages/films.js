import React from "react";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import FilmDetail from "../components/FilmDetail";

function FilmsList({ films }) {
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${page}&pagination[pageSize]=2`,
    fetcher,
    { fallbackData: films }
  );
  console.log("data:", data);

  return (
    <Layout>
      <p>FilmsList</p>
      {data.data.map((film) => (
        <FilmDetail
          key={film.attributes.id}
          filmData={film.attributes}
          id={film.id}
        />
      ))}
      <div>
        <Pagination
          count={data?.meta?.pagination?.pageCount}
          page={page}
          onChange={handleChange}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const filmsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=2`
  );
  console.log("filmsResponse: ", filmsResponse);
  return {
    props: {
      films: filmsResponse,
    }, // will be passed to the page component as props
  };
}

export default FilmsList;
