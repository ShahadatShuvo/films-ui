import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";

function SingleFilm({ film }) {
  console.log("film:", film);
  return (
    <Layout>
      <div className="font-normal text-sm">
        <p className="text-2xl text-center uppercase">
          {film.data.attributes.title}
        </p>
        <p className="text-lg">Director: {film.data.attributes.director}</p>
        <p className="text-lg">Released: {film.data.attributes.released}</p>
        <p className="my-3 text-sm font-semibold text-center">Movie plot</p>
        <p>{film.data.attributes.plot}</p>
        <Link href="/films">
          <span className="inline-block text-xs font-bold mt-10 cursor-pointer hover:text-red-400">{`<- Previous page`}</span>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  console.log("Slug:", slug);
  const filmResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films/${slug}`
  );
  return {
    props: {
      film: filmResponse,
    }, // will be passed to the page component as props
  };
}
export default SingleFilm;
