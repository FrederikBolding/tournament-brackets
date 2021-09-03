import Head from "next/head";
import { Bracket } from "../components/Bracket";
import { useBracket } from "../hooks/useBracket";
import { BracketType } from "../utils/bracket";

const teams = [
  "Astralis",
  "BIG",
  "MIBR",
  "NAVI",
  "OG",
  "Fnatic",
  "Team Liquid",
  "Heroic",
  "G2",
  "FaZe",
  "Vitality",
  "NiP",
  "Gambit",
  "mouz",
  "Complexity",
  "ENCE",
];

export default function Home() {
  const { rounds, updateTeamName, updateTeamScore } = useBracket(teams, {
    type: BracketType.Seeded,
  });

  return (
    <div>
      <Head>
        <title>Tournament Brackets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {process.browser && (
          <Bracket
            rounds={rounds}
            updateTeamName={updateTeamName}
            updateTeamScore={updateTeamScore}
          />
        )}
      </main>
    </div>
  );
}
