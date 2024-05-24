import { groupMatchesById } from "./utils";
import { mapLogToMatches, readLogFile, readLogLines } from "./utils/log-parser";

const message: string = "Welcome to CloudWalk log parser";
console.log(`>>> ${message} <<<`);

const logFilePath = "./assets/qgames.log";

const content = readLogFile(logFilePath);
// TODO check a better way to handle nullable values in typescript
const lines = readLogLines(content ?? '');
console.log(`>>> There are ${lines?.length} lines in the log file <<<`);

// test execution with only a few lines
const matches = mapLogToMatches(lines.slice(0, 96));
console.log(">>> There are", matches.length, "matches <<<");

// TODO print grouped information for each match following the example on README

console.log(JSON.stringify(groupMatchesById(matches)));
console.log(">>> END <<<");
