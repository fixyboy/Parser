import { promises as fs } from 'fs';
import { parseString } from 'xml2js';
import logger from './logger';

export async function parseXMLFile(filePath: string): Promise<object> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        return new Promise((resolve, reject) => {
            parseString(fileContent, { explicitArray: false }, (err, result) => {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    logger.info("XML file read successfully %s: %o", filePath, result);
                    resolve(result)
                }
            });
        });

    } catch (error) {
        logger.error("Error reading XML file %s: %o", filePath, error);
        throw new Error(`Error reading XML file: ${error}`);
    }
}
