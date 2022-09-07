import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";

function FilmDetail({ filmData }) {
  return (
    <div className="my-3 bg-slate-100 p-3 px-4 rounded-lg flex justify-between items-end">
      <div>
        <h1 className="text-xl">Title: {filmData.title}</h1>
        <p className="text-sm font-normal">Director: {filmData.director}</p>
        <p className="text-sm font-normal">
          Released Date: {filmData.released}
        </p>
      </div>
      <div className="flex justify-end">
        <Link href={`films/${filmData.slug}`}>
          <Button size="small" variant="text">
            View Detail
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FilmDetail;
