import React from "react";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";

function FilmsList({ films }) {
  console.log("films:", films);
  return (
    <Layout>
      <p>FilmsList</p>
      {films.data.map((film) => (
        <div key={film.attributes.id} className="my-3 bg-slate-100 p-2">
          <h1>Title: {film.attributes.title}</h1>
          <p className="text-sm font-normal">
            Director: {film.attributes.director}
          </p>
          <p className="text-sm font-normal">
            Released Date: {film.attributes.released}
          </p>
        </div>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const filmsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films`
  );
  console.log("filmsResponse: ", filmsResponse);
  return {
    props: {
      films: filmsResponse,
    }, // will be passed to the page component as props
  };
}

export default FilmsList;
