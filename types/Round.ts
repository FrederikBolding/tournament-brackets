import { Game } from "./Game";

export interface Round {
    round: number;
    games: Game[];
}