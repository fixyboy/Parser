import { Book, Genre, Format } from "../Book.model";
import logger from "../../util/logger";

export class BookBuilders {
        private title!: string;
        private author!: string;
        private genre!: Genre;
        private format!: Format;
        private language!: string;
        private publisher!: string;
        private specialEdition!: string;
        private packagingType!: string;

        setTitle(title: string): BookBuilders {
                this.title = title;
                return this;
        }

        setAuthor(author: string): BookBuilders {
                this.author = author;
                return this;
        }

        setGenre(genre: Genre): BookBuilders {
                this.genre = genre;
                return this;
        }

        setFormat(format: Format): BookBuilders {
                this.format = format;
                return this;
        }

        setLanguage(language: string): BookBuilders {
                this.language = language;
                return this;
        }

        setPublisher(publisher: string): BookBuilders {
                this.publisher = publisher;
                return this;
        }

        setSpecialEdition(specialEdition: string): BookBuilders {
                this.specialEdition = specialEdition;
                return this;
        }

        setPackagingType(packagingType: string): BookBuilders {
                this.packagingType = packagingType;
                return this;
        }

        build(): Book {
            // Use a defined-check (not a truthy check) so legitimately falsy
            // values are accepted while genuinely unset fields are rejected.
            const requiredFields: Array<[string, unknown]> = [
                ["title", this.title],
                ["author", this.author],
                ["genre", this.genre],
                ["format", this.format],
                ["language", this.language],
                ["publisher", this.publisher],
                ["specialEdition", this.specialEdition],
                ["packagingType", this.packagingType],
            ];
            for (const [name, value] of requiredFields) {
                if (value === undefined) {
                    const message = `${name} is required before building the Book object.`;
                    logger.error(message);
                    throw new Error(message);
                }
            }
            return new Book(
                this.title,
                this.author,
                this.genre,
                this.format,
                this.language,
                this.publisher,
                this.specialEdition,
                this.packagingType
            );
        }
}
