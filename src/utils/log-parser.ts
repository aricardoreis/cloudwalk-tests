import * as fs from "fs";
import Match, { IMatch } from "../models/match";

export function readLogFile(filePath: string): string | undefined {
  if (!fs.existsSync(filePath)) {
    console.warn("There is no log file. Please provide a valid file path!");
    return undefined;
  }

  return fs.readFileSync(filePath, "utf8");
}

export function readLogLines(logContent: string): string[] {
  if (logContent) {
    return logContent.split("\n");
  } else {
    return [];
  }
}

export function mapLogToMatches(lines: string[]): IMatch[] {
  const matches: IMatch[] = [];

  let currentMatch: IMatch = new Match("");
  let incrementalMatchId = 1;

  for (const line of lines) {
    if (line.includes("InitGame:")) {
      if (currentMatch.id) {
        matches.push(currentMatch);
        incrementalMatchId++;

        console.log(`New match found: ${JSON.stringify(currentMatch)}`);
      }
      currentMatch = new Match(`game-${incrementalMatchId}`);
    }

    if (line.includes("ClientUserinfoChanged:")) {
      const player = line.split("\\")[1];
      currentMatch.addPlayer(player);
    }

    if (line.includes("Kill:")) {
      // TODO is there a better way to extract log information using regex?
      const [left, right] = line.split("killed").map((x) => x.trim());
      const leftSplitted = left.split(" ");
      const killer = leftSplitted[leftSplitted.length - 1];
      const victim = right.split(" ")[0];

      currentMatch.addKill(killer, victim);
    }
  }

  // include last match
  matches.push(currentMatch);
  console.log(`New match found: ${JSON.stringify(currentMatch)}`);

  return matches;
}