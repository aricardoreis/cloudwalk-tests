import mapFromMatches from "./models/death_report";
import { groupMatchesById } from "./utils";
import { mapLogToMatches, readLogFile, readLogLines } from "./utils/log-parser";

const message: string = "Welcome to CloudWalk log parser";
console.info(`>>> ${message} <<<`);

const logFilePath = "./assets/qgames.log";

// TODO create a class to keep the parser logic
const content = readLogFile(logFilePath);

const lines = readLogLines(content ?? '');
console.info(`>>> There are ${lines?.length} lines in the log file <<<`);

// test execution with only a few lines
const matches = mapLogToMatches(lines);
console.info(">>> There are", matches.length, "matches <<<");

console.info(">>> Match report <<<");
console.info(groupMatchesById(matches));

// Generate a report of deaths grouped by death cause for each match.
const deathReport = mapFromMatches(matches);
console.info(">>> Death report <<<");
console.info(deathReport);

console.info(">>> END <<<");
