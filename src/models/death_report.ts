import { sortDescendingByValue } from "../utils";
import { DeathCauseName } from "./death_cause";
import { IMatch } from "./match";

export interface IDeathDetails {
  kills_by_means: Record<DeathCauseName, number>;
}

export interface IDeathReport extends Record<string, IDeathDetails | {}> {}

export class DeathReport implements IDeathReport {
  [x: string]: {} | IDeathDetails;
}

export default function mapFromMatches(
  matches: IMatch[]
): IDeathReport {
  const result: IDeathReport = {};
  for (const match of matches) {
    const killCounter = match.kills_details.reduce((result, kill) => {
      result[kill.cause] = (result[kill.cause] ?? 0) + 1;
      return result;
    }, {} as Record<DeathCauseName, number>);

    result[match.id] = {
      kills_by_means: sortDescendingByValue(killCounter),
    }
  }
  return result;
}
