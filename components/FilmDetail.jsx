import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";

function FilmDetail({ filmData, id }) {
  return (
    <div className="my-3 bg-slate-100 p-2">
      <h1>Title: {filmData.title}</h1>
      <p className="text-sm font-normal">Director: {filmData.director}</p>
      <p className="text-sm font-normal">Released Date: {filmData.released}</p>
      <div className="flex justify-end mt-2">
        <Link href={`films/${id}`}>
          <Button size="small" variant="text">
            View Detail
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FilmDetail;
