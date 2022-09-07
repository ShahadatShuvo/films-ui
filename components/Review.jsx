import React, { useState } from "react";
import { fetcher } from "../lib/api";
import { getUserFromLocalCookie } from "../lib/auth";

function Review({ user, film, jwt, setMount, slug, setComment, comment }) {
  const [review, setReview] = useState({
    value: "",
  });
  const [filmData, setFilmData] = useState(film);
  React.useEffect(() => {
    const fetchFilm = async () => {
      const film = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}?populate=*`,
        jwt
          ? {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          : ""
      );
      setFilmData(film.data);
    };
    fetchFilm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  const handleChange = (e) => {
    setReview({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.value.length === 0) return;
    setComment(comment + 1);

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
      setMount((prevState) => !prevState);
    } catch (error) {
      setMount((prevState) => !prevState);
    }
  };
  return (
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
            {filmData.attributes.reviews.data.length === 0 && (
              <span>No reviews yet</span>
            )}
            {filmData.attributes.reviews &&
              filmData.attributes.reviews.data.map((review) => {
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
  );
}

export default Review;
