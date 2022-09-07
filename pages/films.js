import React from "react";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import Pagination from "@mui/material/Pagination";
import useSWR from "swr";
import FilmDetail from "../components/FilmDetail";
import { useFetchUser } from "../lib/authContext";

function FilmsList({ films }) {
  const { user, loading } = useFetchUser();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${page}&pagination[pageSize]=3`,
    fetcher,
    { fallbackData: films }
  );

  return (
    <div className="min-w-[35vw]">
      <p>FilmsList</p>
      {data.data.map((film) => (
        <FilmDetail key={film.attributes.slug} filmData={film.attributes} />
      ))}
      <div>
        <Pagination
          count={data?.meta?.pagination?.pageCount}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filmsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=3`
  );
  return {
    props: {
      films: filmsResponse,
    }, // will be passed to the page component as props
  };
}

export default FilmsList;
