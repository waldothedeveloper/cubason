import Head from "next/head";
import Hero2 from "./hero2";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Cubason</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <Hero2 />
      </main>

      <footer className=""></footer>
    </div>
  );
}
