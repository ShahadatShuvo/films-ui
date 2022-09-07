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

function SingleFilm({ film, jwt, plot, error }) {
  const { user, loading } = useFetchUser();

  console.log("film:", film);

  const router = useRouter();
  const [review, setReview] = useState({
    value: "",
  });

  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            review: review.value,
            reviewer: await getUserFromLocalCookie(),
            film: film.id,
          },
        }),
      });
      router.reload();
    } catch (error) {
      console.error("error with request", error);
    }
  };

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

        <div>
          {user && (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tighter mb-4 mt-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2 text-lg block">
                  Reviews
                </span>
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="w-full text-sm px-3 py-2 text-gray-700  border-2 border-teal-400 rounded-lg focus:outline-none"
                    rows="4"
                    value={review.value}
                    onChange={handleChange}
                    placeholder="Add your review"
                  ></textarea>
                  <button
                    className="text-sm rounded py-2 text-black bg-purple-200 p-2"
                    type="submit"
                  >
                    Add Review
                  </button>
                </form>
              </h2>
              <ul>
                {film.attributes.reviews.length === 0 && (
                  <span>No reviews yet</span>
                )}
                {film.attributes.reviews &&
                  film.attributes.reviews.data.map((review) => {
                    return (
                      <li key={review.id} className="my-2">
                        <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                          {review.attributes.reviewer}
                        </span>
                        <span className="mx-2">said</span> &quot;
                        {review.attributes.review}&quot;
                      </li>
                    );
                  })}
              </ul>
            </>
          )}
        </div>

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
