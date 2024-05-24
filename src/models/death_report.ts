import { DeathCauseName } from "./death_cause";
import { IMatch } from "./match";

export interface IDeathDetails {
  kills_by_means: Record<DeathCauseName, number>;
}

export interface IDeathReport extends Record<string, IDeathDetails | {}> {}

export class DeathReport implements IDeathReport {
  [x: string]: {} | IDeathDetails;
}

export default function mapMatchesToDeathReport(matches: IMatch[]): IDeathReport {
  const result: IDeathReport = {};
  for (const match of matches) {
    result[match.id] = {
      kills_by_means: match.kills_details.reduce(
        (result, kill) => {
          result[kill.cause] = (result[kill.cause] ?? 0) + 1;
          return result;
        },
        {} as Record<DeathCauseName, number>
      ),
    };
  }
  return result;
}
