export interface Game {
    id: number;
    team1: string;
    team2: string;
    score1?: number;
    score2?: number;
    winner?: string; 
    next?: number;
}