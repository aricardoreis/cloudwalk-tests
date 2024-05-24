import { IGroupedMatch, IMatch } from "../models/match";

export function groupMatchesById(matches: IMatch[]): IGroupedMatch[] {
  const key = "id";
  const result = matches.reduce((result, item) => {
    return { ...result, [item[key]]: item };
  }, {}) as IGroupedMatch[];
  return result;
}
