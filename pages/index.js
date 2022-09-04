import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="w-[100vw] h-[70vh] flex justify-center items-center ">
      <div className="w-[40%] h-[40%] bg-white">
        <h1 className="text-2xl w-full h-full flex justify-center items-center">
          Hello world
        </h1>
      </div>
    </div>
  );
}
