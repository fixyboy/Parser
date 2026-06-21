import { promises as fs } from 'fs';
import logger from './logger';

export async function parseJSONFile(filePath: string): Promise<object> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);

    } catch (error) {
        logger.error("Error reading JSON file %s: %o", filePath, error);
        throw new Error(`Error reading JSON file: ${error}`);
    }
}
