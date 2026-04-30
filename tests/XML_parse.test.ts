import { parseXMLFile } from '../src/util/XML_parser';
import path from 'path';

describe("parseXMLFile", () =>{
    it('should return an array of objects when given a valid XML file', async () => {

        const filePath = path.resolve(__dirname, '../data/test_data.xml');
        const result = await parseXMLFile(filePath);

        expect(result).toBeDefined();
        expect(result).toEqual({
            "data":{
                "row":{
                    "OrderID": "5001",
                    "Type": "Plush Toy",
                    "AgeGroup": "13+",
                    "Brand": "FunTime",
                    "Material": "Fabric",
                    "BatteryRequired": "Yes",
                    "Educational": "Yes",
                    "Price": "247",
                    "Quantity": "7"
                }
            }
        });


    })

    it('should throw an error when given an invalid XML file', async () => {
        const filePath = path.resolve(__dirname, '../data/invalid.xml');
        await expect(parseXMLFile(filePath)).rejects.toThrow();
    });
    })
