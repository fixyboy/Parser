import { parseJSONFile } from '../src/util/jsonParser';
import path from 'path';

describe("parseJSONFile", () =>{
    it('should return an array of objects when given a valid JSON file', async () => {

        const filePath = path.resolve(__dirname, './data/testData.json');
        const result = await parseJSONFile(filePath);

        expect(result).toBeDefined();
        expect(result).toEqual([{
            "Order ID": "2001",
            "Book Title": "Edge of Eternity",
            "Author": "Dan Brown",
            "Genre": "Science Fiction",
            "Format": "Paperback",
            "Language": "French",
            "Publisher": "Oxford Press",
            "Special Edition": "Signed Copy",
            "Packaging": "Eco-Friendly Packaging",
            "Price": "12",
            "Quantity": "5"
        }]);


    })

    it('should throw an error when given an invalid JSON file', async () => {
        const filePath = path.resolve(__dirname, './data/invalid.json');
        await expect(parseJSONFile(filePath)).rejects.toThrow();
    });
    })
