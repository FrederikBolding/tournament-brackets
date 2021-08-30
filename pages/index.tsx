import Head from "next/head";
import { useState } from "react";
import { Bracket } from "../components/Bracket";
import { generateBracket } from "../utils/bracket";

const teams = [
  "Astralis",
  "BIG",
  "MIBR",
  "NAVI",
  "OG",
  "Fnatic",
  "Team Liquid",
  "Heroic",
];

export default function Home() {
  const [rounds, setRounds] = useState(generateBracket(teams));

  return (
    <div>
      <Head>
        <title>Tournament Brackets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{process.browser && <Bracket rounds={rounds} />}</main>
    </div>
  );
}
