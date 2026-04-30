// src/util/parser.ts

// ─── IMPORTS ─────────────────────────────────────────────────────────────────

// 'fs' is Node.js's built-in File System module.
// It gives us tools to read and write files on the hard drive.
import fs from 'fs';

// Our custom logger (Winston) — used to log errors to the console and log files.
import logger from './logger';


// ─── FUNCTION: parseCSV ───────────────────────────────────────────────────────

// This function reads a CSV file from the hard drive and returns its contents
// as a 2D array of strings. "2D array" means an array of arrays, like a table:
//
//   [
//     ["Name", "Age", "City"],       ← Row 0: the header row
//     ["Alice", "30", "Paris"],      ← Row 1
//     ["Bob",   "25", "London"],     ← Row 2
//   ]
//
// The function signature tells us:
//   - Input:  filePath (string) — the full path to the CSV file on disk
//   - Output: Promise<string[][]> — it returns a PROMISE (because reading a file
//             takes time and we don't want to freeze the entire program while waiting)

export const parseCSV = (filePath: string): Promise<string[][]> => {

    // We return a 'new Promise'. A Promise is an object that represents a value
    // that doesn't exist yet but will be available in the future.
    //
    // The Promise constructor takes one function (called the "executor") with two
    // arguments:
    //   - resolve(value): call this when the work is DONE successfully → the Promise "fulfills"
    //   - reject(error):  call this when something WENT WRONG → the Promise "rejects"
    return new Promise((resolve, reject) => {

        // This array will accumulate all the parsed rows as we read the file.
        const results: string[][] = [];

        // Instead of reading the ENTIRE file into memory at once, we create a "Stream".
        // Think of it like a water pipe: data flows through it piece by piece ("chunks"),
        // rather than being poured all at once into a bucket.
        //
        // { encoding: 'utf-8' } tells Node.js to give us text (strings) not raw binary data.
        const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });


        // ── EVENT: 'data' ────────────────────────────────────────────────────
        // Every time a new "chunk" of data arrives from the file, this callback fires.
        // A chunk is just a piece of the file (not necessarily a complete line!).
        readStream.on('data', (chunk: string) => {

            // Step 1: Split the chunk by newline characters ('\n') to get individual lines.
            //         .filter(...) removes any empty lines (e.g., blank lines at end of file).
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            // Step 2: For each line, split it into columns using the comma (',') as a separator.
            lines.forEach((line) => {

                // .split(',')  → turns "Alice,30,Paris" into ["Alice", "30", "Paris"]
                // .map(...)    → runs a function on EACH element of the array
                //   .trim()   → removes leading/trailing spaces: "  Alice  " → "Alice"
                //   .replace(/^"(.*)"$/, '$1') → removes surrounding quotes if present:
                //               '"Alice"' → 'Alice'   (regex: match a string that starts
                //               with " and ends with ", and capture what's in between)
                const columns = line.split(',').map(value => value.trim().replace(/^"(.*)"$/, '$1'));

                // Push the finished row (array of column values) into our results table.
                results.push(columns);
            });
        });


        // ── EVENT: 'end' ─────────────────────────────────────────────────────
        // This fires when the stream has finished reading the ENTIRE file.
        // At this point, 'results' contains all rows, so we can resolve the Promise.
        readStream.on('end', () => {
            resolve(results); // ✅ Success! Hand the 2D array back to whoever called parseCSV().
        });


        // ── EVENT: 'error' ───────────────────────────────────────────────────
        // This fires if something goes wrong (e.g., file not found, permission denied).
        readStream.on('error', (error) => {
            // Log the error with the logger so it goes into our log files.
            // %s = string placeholder (inserts filePath)
            // $o = object placeholder (inserts the error object) — NOTE: should be %o, not $o!
            logger.error("Error while reading the stream of file %s, $o", filePath, error);

            reject(error); // ❌ Something went wrong — reject the Promise with the error.
        });

    });
};