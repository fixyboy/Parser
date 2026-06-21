import { Item } from './Item.model';

export interface Order {
    getItems(): Item;
    getPrice(): number;
    getQuantity(): number;
    getId(): string;
}