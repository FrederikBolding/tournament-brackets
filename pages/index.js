import Head from "next/head";
import { Bracket } from "../components/Bracket";

const row3 = {
  games: [
    {
      id: 99,
      team1: "Astralis",
      team2: "BIG",
      score1: "3",
      score2: "1",
      winner: "Astralis",
    },
  ],
};

const row2 = {
  games: [
    {
      id: 98,
      team1: "Astralis",
      team2: "Team Liquid",
      score1: "2",
      score2: "1",
      winner: "Astralis",
      next: 99,
    },
    {
      id: 97,
      team1: "BIG",
      team2: "MIBR",
      score1: "2",
      score2: "1",
      winner: "BIG",
      next: 99,
    },
  ],
};

const row1 = {
  games: [
    {
      id: 1,
      team1: "Astralis",
      team2: "Heroic",
      score1: "2",
      score2: "1",
      winner: "Astralis",
      next: 98,
    },
    {
      id: 2,
      team1: "Team Liquid",
      team2: "Fnatic",
      score1: "2",
      score2: "0",
      winner: "Team Liquid",
      next: 98,
    },
    {
      id: 3,
      team1: "OG",
      team2: "BIG",
      score1: "0",
      score2: "2",
      winner: "BIG",
      next: 97,
    },
    {
      id: 4,
      team1: "MIBR",
      team2: "NAVI",
      score1: "2",
      score2: "1",
      winner: "MIBR",
      next: 97,
    },
  ],
};

const rounds = [row1, row2, row3];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{process.browser && <Bracket rounds={rounds} />}</main>
    </div>
  );
}
