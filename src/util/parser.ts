import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse';
import { stringify as csvStringify } from 'csv-stringify';
import logger from './logger';

export async function readCSVFile(filePath: string): Promise<string[][]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        return new Promise((resolve, reject) => {
            csvParse(fileContent, { trim: true, skip_empty_lines: true }, (err, records: string[][]) => {
                return err ? reject(err) : resolve(records);
            });
        });

    } catch (error) {
        logger.error("Error reading CSV file %s: %o", filePath, error);
        throw new Error(`Error reading CSV file: ${error}`);
    }
}

export async function writeCSVFile(filePath: string, data: string[][]): Promise<void> {
    return new Promise((resolve, reject) => {
        csvStringify(data, (err, output) => {
            if (err) reject(err);
            else fs.writeFile(filePath, output).then(resolve).catch(reject);
        });
    });
}
