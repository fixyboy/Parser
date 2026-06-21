import { BookBuilders } from '../src/model/Builders/Book.builders';
import { Book } from '../src/model/Book.model';
import { ItemCategory } from '../src/model/Item.model';

// Returns a builder with every required field already set, so each test can
// tweak or omit a single field without repeating the full setup.
function fullBookBuilder(): BookBuilders {
    return new BookBuilders()
        .setTitle("Edge of Eternity")
        .setAuthor("Dan Brown")
        .setGenre("Science Fiction")
        .setFormat("Paperback")
        .setLanguage("French")
        .setPublisher("Oxford Press")
        .setSpecialEdition("Signed Copy")
        .setPackagingType("Eco-Friendly Packaging");
}

describe('BookBuilders', () => {
    it('builds a fully-populated Book and exposes the values via getters', () => {
        const book = fullBookBuilder().build();

        expect(book).toBeInstanceOf(Book);
        expect(book.getCategory()).toBe(ItemCategory.BOOK);
        expect(book.getTitle()).toBe("Edge of Eternity");
        expect(book.getAuthor()).toBe("Dan Brown");
        expect(book.getGenre()).toBe("Science Fiction");
        expect(book.getFormat()).toBe("Paperback");
        expect(book.getPackagingType()).toBe("Eco-Friendly Packaging");
    });

    it('returns the same builder from each setter so calls can be chained', () => {
        const builder = new BookBuilders();
        expect(builder.setTitle("Beneath the Stars")).toBe(builder);
        expect(builder.setAuthor("Jane Doe")).toBe(builder);
        expect(builder.setGenre("Thriller")).toBe(builder);
    });

    it('throws naming the missing field when a required field is not set', () => {
        const builder = fullBookBuilder();
        // Force `author` back to "unset".
        (builder as unknown as { author: undefined }).author = undefined;
        expect(() => builder.build()).toThrow('author is required');
    });

    it('throws when nothing has been set at all', () => {
        expect(() => new BookBuilders().build()).toThrow('title is required');
    });

    it('rejects incorrect data types at compile time', () => {
        const builder = new BookBuilders();
        // @ts-expect-error - title must be a string, not a number
        builder.setTitle(123);
        // @ts-expect-error - "Cookbook" is not a valid Genre
        builder.setGenre("Cookbook");
        // @ts-expect-error - "Scroll" is not a valid Format
        builder.setFormat("Scroll");
    });
});
