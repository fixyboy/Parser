import { Toy, ToyType, AgeGroup, Material } from "../Toy.model";
import logger from "../../util/logger";

export class ToyBuilders {
        private type!: ToyType;
        private ageGroup!: AgeGroup;
        private brand!: string;
        private material!: Material;
        private batteryRequired!: boolean;
        private educational!: boolean;

        setType(type: ToyType): ToyBuilders {
                this.type = type;
                return this;
        }

        setAgeGroup(ageGroup: AgeGroup): ToyBuilders {
                this.ageGroup = ageGroup;
                return this;
        }

        setBrand(brand: string): ToyBuilders {
                this.brand = brand;
                return this;
        }

        setMaterial(material: Material): ToyBuilders {
                this.material = material;
                return this;
        }

        setBatteryRequired(batteryRequired: boolean): ToyBuilders {
                this.batteryRequired = batteryRequired;
                return this;
        }

        setEducational(educational: boolean): ToyBuilders {
                this.educational = educational;
                return this;
        }

        build(): Toy {
            // Use a defined-check (not a truthy check); batteryRequired and
            // educational are booleans, so `false` is a valid set value and
            // must not be treated as "missing".
            const requiredFields: Array<[string, unknown]> = [
                ["type", this.type],
                ["ageGroup", this.ageGroup],
                ["brand", this.brand],
                ["material", this.material],
                ["batteryRequired", this.batteryRequired],
                ["educational", this.educational],
            ];
            for (const [name, value] of requiredFields) {
                if (value === undefined) {
                    const message = `${name} is required before building the Toy object.`;
                    logger.error(message);
                    throw new Error(message);
                }
            }
            return new Toy(
                this.type,
                this.ageGroup,
                this.brand,
                this.material,
                this.batteryRequired,
                this.educational
            );
        }
}
