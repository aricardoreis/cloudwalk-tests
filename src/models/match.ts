export default interface IMatchInfo {
  id: string;
  total_kills: number;
  players: string[];
  kills: Record<string, number>;
}
