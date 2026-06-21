import { Item, ItemCategory } from "./Item.model";

// Constrained fields use literal union types (like Cake's `Type`) so only
// valid values can be passed in — this is part of "best practices".
type Genre =
    | "Science Fiction"
    | "Thriller"
    | "Biography"
    | "Mystery"
    | "Fantasy"
    | "Romance"
    | "Historical Fiction"
    | "Non-Fiction"
    | "Horror"
    | "Young Adult";

type Format = "Paperback" | "Hardcover" | "Audiobook" | "E-Book";

export class Book implements Item {

    constructor(
        private title: string,
        private author: string,
        private genre: Genre,
        private format: Format,
        private language: string,
        private publisher: string,
        private specialEdition: string,
        private packagingType: string,
    ) {}

    getCategory(): ItemCategory {
        return ItemCategory.BOOK;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getGenre(): Genre {
        return this.genre;
    }

    getFormat(): Format {
        return this.format;
    }

    getLanguage(): string {
        return this.language;
    }

    getPublisher(): string {
        return this.publisher;
    }

    getSpecialEdition(): string {
        return this.specialEdition;
    }

    getPackagingType(): string {
        return this.packagingType;
    }
}
