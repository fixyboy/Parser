import { Item, ItemCategory } from "./Item.model";

export type ToyType =
    | "Plush Toy"
    | "Building Blocks"
    | "Action Figure"
    | "Doll"
    | "Puzzle"
    | "Art Kit"
    | "Remote Car"
    | "Educational Toy"
    | "Board Game"
    | "RC Drone";

export type AgeGroup = "0-3" | "4-7" | "8-12" | "13+";

export type Material = "Fabric" | "Plastic" | "Wood" | "Foam" | "Metal";

export class Toy implements Item {

    constructor(
        private type: ToyType,
        private ageGroup: AgeGroup,
        private brand: string,
        private material: Material,
        // The data stores these as "Yes"/"No", but a true/false flag is the
        // correct model for a binary attribute.
        private batteryRequired: boolean,
        private educational: boolean,
    ) {}

    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }

    getType(): ToyType {
        return this.type;
    }

    getAgeGroup(): AgeGroup {
        return this.ageGroup;
    }

    getBrand(): string {
        return this.brand;
    }

    getMaterial(): Material {
        return this.material;
    }

    isBatteryRequired(): boolean {
        return this.batteryRequired;
    }

    isEducational(): boolean {
        return this.educational;
    }
}
