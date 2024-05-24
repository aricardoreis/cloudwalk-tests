import * as fs from "fs";
import IMatchInfo from "../models/match";

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

export function mapLogToMatches(lines: string[]): IMatchInfo[] {
  const matches: IMatchInfo[] = [];
  let currentMatch: IMatchInfo = {
    id: "",
    total_kills: 0,
    players: [],
    kills: {},
  };
  let incrementalMatchId = 1;
  for (const line of lines) {
    if (line.includes("InitGame:")) {
      if (currentMatch.id) {
        matches.push(currentMatch);
        incrementalMatchId++;

        console.log(`New match found: ${JSON.stringify(currentMatch)}`);
      }
      currentMatch = {
        id: `game-${incrementalMatchId}`,
        total_kills: 0,
        players: [],
        kills: {},
      };
      console.log(`New match found: ${currentMatch.id}`);
    }

    if (line.includes("ClientUserinfoChanged:")) {
      // TODO is there a better way to extract log information using regex?
      const player = line.split("\\")[1];
      if (!currentMatch.players.includes(player)) {
        console.log(`New player found: ${player}.`);
        currentMatch.players.push(player);
        currentMatch.kills[player] = 0;
      }
    }

    if (line.includes("Kill:")) {
      // TODO is there a better way to extract log information using regex?
      const [left, right] = line.split("killed").map((x) => x.trim());
      const leftSplitted = left.split(" ");
      const killer = leftSplitted[leftSplitted.length - 1];
      const victim = right.split(" ")[0];

      console.log(`${killer} killed ${victim}.`);

      // TODO create a constants file to keep fixed values
      if (!currentMatch.players.includes(killer)) {
        if (killer === "<world>") {
          // victim loses a kill when killed by world
          currentMatch.kills[victim]--;
        } else {
          currentMatch.kills[killer]++;
        }
      }

      currentMatch.total_kills++;
    }
  }

  // include last match
  matches.push(currentMatch);
  console.log(`New match found: ${JSON.stringify(currentMatch)}`);

  return matches;
}
