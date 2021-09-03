import { useState } from "react";
import { Game, Round } from "../types";
import { BracketGenerationOptions, generateBracket } from "../utils/bracket";

export const useBracket = (teams: string[], options?: BracketGenerationOptions) => {
  const [rounds, setRounds] = useState(generateBracket(teams, options));

  const getRoundByGame = (id: number) => {
    const round = rounds.find((r) => r.games.find((g) => g.id === id));
    const game = round.games.find((g) => g.id === id);
    return { round, game };
  };

  const updateWinners = (rounds: Round[]) => {
    return rounds.map((round, _, roundArr) => ({
      ...round,
      games: round.games.reduce((acc, cur) => {
        const prevRound = roundArr.find((r) =>
          r.games.find((g) => g.next === cur.id)
        );
        const prevGames =
          prevRound && prevRound.games.filter((g) => g.next === cur.id);
        if (!prevGames || prevGames.length === 0) {
          return [...acc, cur];
        }
        const team1 = prevGames[0].winner ?? cur.team1;
        const team2 = prevGames[1].winner ?? cur.team2;
        const updatedGame = { ...cur, team1, team2 };
        const winner = calculateWinner(updatedGame)
        return [...acc, { ...updatedGame, winner }];
      }, []),
    }));
  };

  const updateGame = (updatedGame: Game) => {
    const id = updatedGame.id;
    const { round, game } = getRoundByGame(id);
    const winner = calculateWinner(updatedGame)
    const winnerChange = game.winner !== winner;
    const updatedGames = [
      ...round.games.filter((g) => g.id !== id),
      { ...updatedGame, winner },
    ].sort((a, b) => a.id - b.id);
    const updatedRound = { ...round, games: updatedGames };
    const updatedRounds = [
      ...rounds.filter((r) => r.round !== round.round),
      updatedRound,
    ].sort((a, b) => a.round - b.round);
    setRounds(winnerChange ? updateWinners(updatedRounds) : updatedRounds);
  };

  const updateTeamName = (id: number, team: number, newName: string) => {
    const { game } = getRoundByGame(id);
    const update = team === 1 ? { team1: newName } : { team2: newName };
    updateGame({ ...game, ...update });
  };

  const calculateWinner = (game: Game) => {
    if (game.score1 > game.score2) {
      return game.team1;
    } else if (game.score1 < game.score2) {
      return game.team2;
    }
    return undefined;
  };

  const updateTeamScore = (id: number, team: number, newScore: string) => {
    const { game } = getRoundByGame(id);
    const update =
      team === 1
        ? { score1: parseInt(newScore) }
        : { score2: parseInt(newScore) };
    updateGame({ ...game, ...update });
  };

  return { rounds, updateTeamName, updateTeamScore };
};
