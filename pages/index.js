import Head from "next/head";
import Hero2 from "./hero2";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cubason</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Hero2 />
      </main>

      <footer></footer>
    </div>
  );
}
