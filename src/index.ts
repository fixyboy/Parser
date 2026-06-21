import path from 'path';
import { parseJSONFile } from './util/jsonParser'
import logger from './util/logger';

const dataPath = path.resolve(__dirname, '../data/book orders.json');

async function main() {
    try {
        const books = await parseJSONFile(dataPath)
        logger.info(JSON.stringify(books, null, 2))
    } catch(error) {
        logger.error(error)
    }
}

main();