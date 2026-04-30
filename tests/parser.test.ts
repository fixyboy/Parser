// 1. Import what you want to test
import { readCSVFile, writeCSVFile } from '../src/util/CSV_parser';
import path from 'path';

describe('readCSVFile', () => {

    it('should return a 2D array when given a valid CSV file', async () => {

        const filePath = path.resolve(__dirname, '../data/test_data.csv');
        const result = await readCSVFile(filePath);


        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toBeInstanceOf(Array);
    });

    it('should throw an error if the file does not exist', async () => {
        const filePath = path.resolve(__dirname, '../data/non_existent_file.csv');
        await expect(readCSVFile(filePath)).rejects.toThrow();
    });

    it('checking elements in the 2D array ', async () => {
        const filePath = path.resolve(__dirname, '../data/test_data.csv');
        const result = await readCSVFile(filePath);
        expect(result[1][0]).toBe('0');
        expect(result[1][1]).toBe('Sponge');
        expect(result[1][2]).toBe('Vanilla');
        expect(result[1][3]).toBe('Cream');
        expect(result[1][4]).toBe('20');
        expect(result[1][5]).toBe('2');
        expect(result[1][6]).toBe('Buttercream');
        expect(result[1][7]).toBe('Vanilla');
        expect(result[1][8]).toBe('Sprinkles');
        expect(result[1][9]).toBe('Multi-color');
        expect(result[1][10]).toBe('Happy Birthday');
        expect(result[1][11]).toBe('Round');
        expect(result[1][12]).toBe('Nut-Free');
        expect(result[1][13]).toBe('Organic Ingredients');
        expect(result[1][14]).toBe('Standard Box');
        expect(result[1][15]).toBe('50');
        expect(result[1][16]).toBe('1');
    })
    

});
describe('writeCSVFile', () => {
    it('should write a 2D array to a CSV file', async () => {
        const data: string[][] = [
        ['id', 'type', 'flavor'],
        ['1', 'Sponge', 'Vanilla'],
        ['2', 'Chocolate', 'Chocolate'],
    ];

    const filePath = path.resolve(__dirname, 'temp_test_output.csv');
    await writeCSVFile(filePath, data);
    const result = await readCSVFile(filePath);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toBeInstanceOf(Array);
    expect(result[1][0]).toBe('1');
    expect(result[1][1]).toBe('Sponge');
    expect(result[1][2]).toBe('Vanilla');
    expect(result[2][0]).toBe('2');
    expect(result[2][1]).toBe('Chocolate');
    expect(result[2][2]).toBe('Chocolate');
    });
});
