import { Cake, Type } from "../Cake.model";
import logger from "../../util/logger";

export class CakeBuilders {
        private type!: Type;
        private flavor!: string;
        private filling!: string;
        private size!: number;
        private layers!: number;
        private frostingType!: string;
        private frostingFlavor!: string;
        private decorationType!: string;
        private decorationColor!: string;
        private customMessage!: string;
        private shape!: string;
        private allergies!: string;
        private specialIngredients!: string;
        private packagingType!: string;

        setType(type: Type): CakeBuilders {
                this.type = type;
                return this;
        }

        setFlavor(flavor: string): CakeBuilders {
                this.flavor = flavor;
                return this;
        }

        setFilling(filling: string): CakeBuilders {
                this.filling = filling;
                return this;
        }

        setSize(size: number): CakeBuilders {
                this.size = size;
                return this;
        }

        setLayers(layers: number): CakeBuilders {
                this.layers = layers;
                return this;
        }

        setFrostingType(frostingType: string): CakeBuilders {
                this.frostingType = frostingType;
                return this;
        }

        setFrostingFlavor(frostingFlavor: string): CakeBuilders {
                this.frostingFlavor = frostingFlavor;
                return this;
        }

        setDecorationType(decorationType: string): CakeBuilders {
                this.decorationType = decorationType;
                return this;
        }

        setDecorationColor(decorationColor: string): CakeBuilders {
                this.decorationColor = decorationColor;
                return this;
        }

        setCustomMessage(customMessage: string): CakeBuilders {
                this.customMessage = customMessage;
                return this;
        }

        setShape(shape: string): CakeBuilders {
                this.shape = shape;
                return this;
        }

        setAllergies(allergies: string): CakeBuilders {
                this.allergies = allergies;
                return this;
        }

        setSpecialIngredients(specialIngredients: string): CakeBuilders {
                this.specialIngredients = specialIngredients;
                return this;
        }

        setPackagingType(packagingType: string): CakeBuilders {
                this.packagingType = packagingType;
                return this;
        }

        build(): Cake {
            // Use a defined-check (not a truthy check) so legitimately falsy
            // values like a size/layers of 0 are accepted while genuinely
            // unset fields are rejected.
            const requiredFields: Array<[string, unknown]> = [
                ["type", this.type],
                ["flavor", this.flavor],
                ["filling", this.filling],
                ["size", this.size],
                ["layers", this.layers],
                ["frostingType", this.frostingType],
                ["frostingFlavor", this.frostingFlavor],
                ["decorationType", this.decorationType],
                ["decorationColor", this.decorationColor],
                ["customMessage", this.customMessage],
                ["shape", this.shape],
                ["allergies", this.allergies],
                ["specialIngredients", this.specialIngredients],
                ["packagingType", this.packagingType],
            ];
            for (const [name, value] of requiredFields) {
                if (value === undefined) {
                    const message = `${name} is required before building the Cake object.`;
                    logger.error(message);
                    throw new Error(message);
                }
            }
            return new Cake(
                this.type,
                this.flavor,
                this.filling,
                this.size,
                this.layers,
                this.frostingType,
                this.frostingFlavor,
                this.decorationType,
                this.decorationColor,
                this.customMessage,
                this.shape,
                this.allergies,
                this.specialIngredients,
                this.packagingType
            );
        }
}