import {Buffer} from "node:buffer";
import {writeFile} from "node:fs";
import {asString, generateCsv, mkConfig} from "export-to-csv";

const CSV_CONFIG = mkConfig({useKeysAsHeaders: true});

type AcceptedData = number | string | boolean | null | undefined;
export function makeCsvFile<
  T extends {
    [k: string]: AcceptedData;
    [k: number]: AcceptedData;
  }
>(data: T[], file: string | null = null) {
  let csv = generateCsv(CSV_CONFIG)(data);
  let fileName =
    file !== null && typeof file === "string"
      ? `${file}.csv`
      : `${CSV_CONFIG.filename}.csv`;
  let csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

  writeFile(fileName, csvBuffer, (err) => {
    if (err) throw err;
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("file saved: ", fileName);
  });
}
