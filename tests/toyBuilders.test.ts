import { ToyBuilders } from '../src/model/Builders/Toy.builders';
import { Toy } from '../src/model/Toy.model';
import { ItemCategory } from '../src/model/Item.model';

// Returns a builder with every required field already set, so each test can
// tweak or omit a single field without repeating the full setup.
function fullToyBuilder(): ToyBuilders {
    return new ToyBuilders()
        .setType("Plush Toy")
        .setAgeGroup("13+")
        .setBrand("FunTime")
        .setMaterial("Fabric")
        .setBatteryRequired(true)
        .setEducational(true);
}

describe('ToyBuilders', () => {
    it('builds a fully-populated Toy and exposes the values via getters', () => {
        const toy = fullToyBuilder().build();

        expect(toy).toBeInstanceOf(Toy);
        expect(toy.getCategory()).toBe(ItemCategory.TOY);
        expect(toy.getType()).toBe("Plush Toy");
        expect(toy.getAgeGroup()).toBe("13+");
        expect(toy.getBrand()).toBe("FunTime");
        expect(toy.getMaterial()).toBe("Fabric");
        expect(toy.isBatteryRequired()).toBe(true);
        expect(toy.isEducational()).toBe(true);
    });

    it('returns the same builder from each setter so calls can be chained', () => {
        const builder = new ToyBuilders();
        expect(builder.setType("Doll")).toBe(builder);
        expect(builder.setMaterial("Plastic")).toBe(builder);
        expect(builder.setBatteryRequired(false)).toBe(builder);
    });

    // Regression guard: a boolean `false` is a valid set value and must not be
    // mistaken for an unset field by build()'s validation.
    it('builds when batteryRequired and educational are false', () => {
        const toy = fullToyBuilder()
            .setBatteryRequired(false)
            .setEducational(false)
            .build();
        expect(toy.isBatteryRequired()).toBe(false);
        expect(toy.isEducational()).toBe(false);
    });

    it('throws naming the missing field when a required field is not set', () => {
        const builder = fullToyBuilder();
        // Force `brand` back to "unset".
        (builder as unknown as { brand: undefined }).brand = undefined;
        expect(() => builder.build()).toThrow('brand is required');
    });

    it('throws when a boolean flag is never set', () => {
        const builder = new ToyBuilders()
            .setType("Plush Toy")
            .setAgeGroup("13+")
            .setBrand("FunTime")
            .setMaterial("Fabric")
            .setBatteryRequired(true);
        // educational was never set
        expect(() => builder.build()).toThrow('educational is required');
    });

    it('rejects incorrect data types at compile time', () => {
        const builder = new ToyBuilders();
        // @ts-expect-error - batteryRequired must be a boolean, not a string
        builder.setBatteryRequired("yes");
        // @ts-expect-error - "Teenager" is not a valid AgeGroup
        builder.setAgeGroup("Teenager");
        // @ts-expect-error - "Glass" is not a valid Material
        builder.setMaterial("Glass");
    });
});
