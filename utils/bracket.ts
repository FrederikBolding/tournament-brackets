import { Game, Round } from "../types";

const randomizeTeams = (teams: string[]) =>
  teams.sort(() => 0.5 - Math.random());

const generateInitialMatchups = (teams: string[]) => {
  return teams.reduce((acc, cur, idx, arr) => {
    if (idx === arr.length - 1 && arr.length % 2 !== 0) {
      return [...acc, [cur]];
    } else if (idx % 2 !== 0) {
      return acc;
    }
    return [...acc, [cur, arr[idx + 1]]];
  }, []);
};

const generateRemainingGames = (games: Game[], round: number) => {
  const result = games.reduce((acc, cur, idx, arr) => {
    if (idx % 2 !== 0) {
      return acc;
    }
    return [
      ...acc,
      {
        id: Math.max(...arr.map((a) => a.id)) + idx + 1,
        team1: `${cur.id}_winner`,
        team2: `${arr[idx + 1]?.id}_winner`,
        score1: 0,
        score2: 0
      },
    ];
  }, []);
  if (result.length > 1) {
    return [
      { round, games: result },
      ...generateRemainingGames(result, round + 1),
    ];
  }
  return [{ round, games: result }];
};

const linkGames = (rounds: Round[]) => {
  return rounds.map((round, idx) => {
    const nextRound = rounds[idx + 1];
    const games = round.games.map((game, idx) => ({
      ...game,
      next: nextRound && nextRound.games[Math.floor(idx / 2)]?.id,
    }));
    return { ...round, games };
  });
};

export const generateBracket = (teams: string[]) => {
  const shuffledTeams = randomizeTeams(teams);
  const initialMatchups = generateInitialMatchups(shuffledTeams);
  const initialGames = initialMatchups.map(([team1, team2], id) => ({
    id,
    team1,
    team2,
    score1: 0,
    score2: 0
  }));
  const remainingGames = generateRemainingGames(initialGames, 2);
  return linkGames([{ round: 1, games: initialGames }, ...remainingGames]);
};
