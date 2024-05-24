import Match, { IGroupedMatch, IMatch, IMatchInfo } from "../models/match";

export function groupMatchesById(matches: IMatch[]): IGroupedMatch[] {
  const key = "id";
  const result = matches.reduce((result, item) => {
    const matchInfo: IMatchInfo = {
      total_kills: item.total_kills,
      players: item.players,
      kills: sortDescendingByValue(item.kills),
    };
    return { ...result, [item[key]]: matchInfo };
  }, {}) as IGroupedMatch[];
  return result;
}

export function sortDescendingByValue(
  obj: Record<string, number>
): Record<string, number> {
  const sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  return Object.fromEntries(sorted);
}
