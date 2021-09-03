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

const generateSeededInitialMatchups = (teams: string[]) => {
  return teams.reduce((acc, cur, idx, arr) => {
    if (idx === 0 && arr.length % 2 !== 0) {
      return [...acc, [cur]];
    } else if (idx >= arr.length / 2) {
      return acc;
    }
    return [...acc, [cur, arr[arr.length - (idx + 1)]]];
  }, []);
};

const generateRemainingGames = (
  games: Game[],
  round: number,
  seeded: boolean
) => {
  const result = games.reduce((acc, cur, idx, arr) => {
    if (idx % 2 !== 0) {
      return acc;
    }
    return [
      ...acc,
      {
        id: Math.max(...arr.map((a) => a.id)) + idx + 1,
        team1: `${cur.id}_winner`,
        team2: `${arr[seeded ? arr.length - (idx + 1) : idx + 1]?.id}_winner`,
        score1: 0,
        score2: 0,
      },
    ];
  }, []);
  if (result.length > 1) {
    return [
      { round, games: result },
      ...generateRemainingGames(result, round + 1, seeded),
    ];
  }
  return [{ round, games: result }];
};

const linkGames = (rounds: Round[]) => {
  return rounds.map((round, idx) => {
    const nextRound = rounds[idx + 1];
    const games = round.games.map((game) => ({
      ...game,
      next:
        nextRound &&
        nextRound.games.find((g) =>
          [g.team1, g.team2].includes(`${game.id}_winner`)
        )?.id,
    }));
    return { ...round, games };
  });
};

const orderGames = (rounds: Round[]) => {
  return rounds.reduce((acc, round, idx, arr) => {
    const prevRound = acc[idx - 1];
    const nextRound = arr[idx + 1];
    const games = round.games.map((game) => ({
      ...game,
      order: prevRound
        ? game.next
        : nextRound.games
            .sort((a, b) => a.next - b.next)
            .findIndex((g) => g.id === game.next),
    }));
    return [...acc, { ...round, games }];
  }, []);
};

export enum BracketType {
  Random,
  Seeded,
  NoSeeding,
}
export interface BracketGenerationOptions {
  type: BracketType;
}

// @todo Fix bracket generation when not enough teams for current structure

export const generateBracket = (
  teams: string[],
  options?: BracketGenerationOptions
) => {
  const type = options?.type ?? BracketType.Random;
  const shuffledTeams =
    type === BracketType.Random ? randomizeTeams(teams) : teams;
  const initialMatchups =
    type === BracketType.Seeded
      ? generateSeededInitialMatchups(shuffledTeams)
      : generateInitialMatchups(shuffledTeams);
  const initialGames = initialMatchups.map(([team1, team2], id) => ({
    id,
    team1,
    team2,
    score1: 0,
    score2: 0,
  }));
  const remainingGames = generateRemainingGames(
    initialGames,
    2,
    type === BracketType.Seeded
  );
  const linkedGames = linkGames([
    { round: 1, games: initialGames },
    ...remainingGames,
  ]);
  return orderGames(linkedGames);
};
