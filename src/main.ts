import mapMatchesToDeathReport from "./models/death_report";
import { groupMatchesById } from "./utils";
import { mapLogToMatches, readLogFile, readLogLines } from "./utils/log-parser";

const message: string = "Welcome to CloudWalk log parser";
console.info(`>>> ${message} <<<`);

const logFilePath = "./assets/qgames.log";

const content = readLogFile(logFilePath);
// TODO check a better way to handle nullable values in typescript
const lines = readLogLines(content ?? '');
console.info(`>>> There are ${lines?.length} lines in the log file <<<`);

// test execution with only a few lines
const matches = mapLogToMatches(lines/*.slice(0, 96)*/);
console.info(">>> There are", matches.length, "matches <<<");

console.info(">>> Matches information <<<");
console.info(groupMatchesById(matches));

// Generate a report of deaths grouped by death cause for each match.
const deathReport = mapMatchesToDeathReport(matches);
console.info(">>> Death report <<<");
console.info(deathReport);

console.info(">>> END <<<");
