import Head from "next/head";
import Image from "next/image";
import { useFetchUser } from "../lib/authContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { user, loading } = useFetchUser();

  return (
    <div>
      <h1 className="text-2xl w-full h-full flex justify-center items-center">
        Welcome - {user || "Guest"}
      </h1>
    </div>
  );
}
