import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Input: NextPage = () => {
  const [tag, setTag] = useState("");

  return (
    <>
      <Head>
        <title>Clash Royale Tournament Display</title>
        <link rel="icon" href="/tournament.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-clash-pattern bg-cover bg-fixed transition-all">
        <div>
          <div className="rounded-t-md bg-yellow-600 p-3">
            <div className="text-center text-2xl font-bold">
              Enter Tournament Tag
            </div>
          </div>
          <div className="rounded-b-md bg-blue-600 p-3">
            <div className="inline rounded-l-md border-2 border-slate-600 p-1">
              #
            </div>
            <input
              className="inline border-2 border-l-0 border-slate-600 bg-blue-600 p-1"
              type="text"
              placeholder="2A1BCDEF"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Link
              href={`/?c=${tag}`}
              className="inline rounded-r-md border-2 border-l-0 border-slate-600 p-1"
            >
              ➡️
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default Input;
