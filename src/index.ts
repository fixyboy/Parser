import path from 'path';
import { readCSVFile } from './util/parser'
import logger from './util/logger';

const dataPath = path.resolve(__dirname, '../data/Cake orders.csv');

async function main() {
    try {
        const cakes = await readCSVFile(dataPath)
        for (const cake of cakes) {
            logger.info(cake + '\n');
        }
    } catch(error) {
        logger.error(error)
    }
}

main();