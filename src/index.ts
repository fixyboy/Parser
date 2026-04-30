import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse';
import logger from './util/logger';

export async function readCSVFile(filePath: string): Promise<string[][]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        return new Promise((resolve, reject) => {
            csvParse(fileContent, { trim: true, skip_empty_lines: true }, (err, records: string[][]) => {
                // TODO: Fill in just 2 lines here!
                // HINT 1: If there is an `err`, how do you communicate failure back to the Promise?
                // HINT 2: If there is no error, how do you communicate success with `records`?
            });
        });

    } catch (error) {
        logger.error("Error reading CSV file %s: %o", filePath, error);
        throw new Error(`Error reading CSV file: ${error}`);
    }
}
