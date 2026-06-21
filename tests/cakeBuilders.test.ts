import { CakeBuilders } from '../src/model/Builders/Cake.builders';
import { Cake } from '../src/model/Cake.model';
import { ItemCategory } from '../src/model/Item.model';

// Returns a builder with every required field already set, so each test can
// tweak or omit a single field without repeating the full setup.
function fullCakeBuilder(): CakeBuilders {
    return new CakeBuilders()
        .setType("Birthday")
        .setFlavor("Chocolate")
        .setFilling("Vanilla")
        .setSize(8)
        .setLayers(2)
        .setFrostingType("Buttercream")
        .setFrostingFlavor("Chocolate")
        .setDecorationType("Sprinkles")
        .setDecorationColor("Rainbow")
        .setCustomMessage("Happy Birthday!")
        .setShape("Round")
        .setAllergies("None")
        .setSpecialIngredients("None")
        .setPackagingType("Box");
}

describe('CakeBuilders', () => {
    it('builds a fully-populated Cake and exposes the values via getters', () => {
        const cake = fullCakeBuilder().build();

        expect(cake).toBeInstanceOf(Cake);
        expect(cake.getCategory()).toBe(ItemCategory.CAKE);
        expect(cake.getType()).toBe("Birthday");
        expect(cake.getFlavor()).toBe("Chocolate");
        expect(cake.getSize()).toBe(8);
        expect(cake.getLayers()).toBe(2);
        expect(cake.getPackagingType()).toBe("Box");
    });

    it('returns the same builder from each setter so calls can be chained', () => {
        const builder = new CakeBuilders();
        expect(builder.setType("Wedding")).toBe(builder);
        expect(builder.setFlavor("Vanilla")).toBe(builder);
        expect(builder.setSize(10)).toBe(builder);
    });

    it('accepts a falsy-but-valid size of 0', () => {
        const cake = fullCakeBuilder().setSize(0).setLayers(0).build();
        expect(cake.getSize()).toBe(0);
        expect(cake.getLayers()).toBe(0);
    });

    it('throws naming the missing field when a required field is not set', () => {
        const builder = fullCakeBuilder();
        // Force `flavor` back to "unset".
        (builder as unknown as { flavor: undefined }).flavor = undefined;
        expect(() => builder.build()).toThrow('flavor is required');
    });

    it('throws when nothing has been set at all', () => {
        expect(() => new CakeBuilders().build()).toThrow('type is required');
    });

    it('rejects incorrect data types at compile time', () => {
        const builder = new CakeBuilders();
        // @ts-expect-error - size must be a number, not a string
        builder.setSize("big");
        // @ts-expect-error - "Funeral" is not a valid cake Type
        builder.setType("Funeral");
    });
});
