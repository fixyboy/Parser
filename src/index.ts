import { CakeBuilders } from './model/Builders/Cake.builders';
import logger from './util/logger';

async function main() {
    const cakeBuilder = new CakeBuilders();
    
    const cake = cakeBuilder.setType("Birthday")
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
        .setPackagingType("Box").build();
    logger.info("Cake created: %o", cake);
}

main();