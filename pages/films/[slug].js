import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
  getUserFromLocalCookie,
} from "../../lib/auth";
import { useFetchUser } from "../../lib/authContext";
import markdownToHtml from "../../lib/markdownToHtml";
import Wrapper from "../../components/Wrapper";
import Review from "../../components/Review";

function SingleFilm({ film, jwt, plot, error, slug }) {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const [comment, setComment] = useState(film.attributes.reviews.data.length);
  const [mount, setMount] = React.useState(false);

  if (error) {
    return (
      <Wrapper>
        <p>{error}</p>
      </Wrapper>
    );
  } else {
    return (
      <div className="font-normal text-sm">
        <p className="text-2xl text-center uppercase font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
          {film.attributes.title}
        </p>
        <p className="text-lg">Director: {film.attributes.director}</p>
        <p className="text-lg">Released: {film.attributes.released}</p>
        <p className="my-3 text-sm font-semibold text-center">Movie plot</p>
        <p>{film.attributes.plot}</p>

        <Review
          key={mount}
          user={user}
          film={film}
          jwt={jwt}
          setMount={setMount}
          slug={slug}
          comment={comment}
          setComment={setComment}
        />

        <Link href="/films">
          <span className="inline-block text-xs font-bold mt-10 cursor-pointer hover:text-red-400">{`<- Previous page`}</span>
        </Link>
      </div>
    );
  }
}

// export async function getServerSideProps(context) {
//   const { slug } = context.params;
//   console.log("Slug:", slug);
//   const filmResponse = await fetcher(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}`
//   );
//   return {
//     props: {
//       film: filmResponse.data,
//     }, // will be passed to the page component as props
//   };
// }
export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const filmResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}?populate=*`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (filmResponse.data) {
    const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        film: filmResponse.data,
        plot,
        jwt: jwt ? jwt : "",
        slug,
      },
    };
  } else {
    return {
      props: {
        error: filmResponse.error.message,
      },
    };
  }
}

export default SingleFilm;
