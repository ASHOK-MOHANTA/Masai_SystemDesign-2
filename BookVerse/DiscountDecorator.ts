import type { Book, Category } from "./Book";

export abstract class BookDiscountDecorator implements Book{
    protected constructor(protected readonly inner:Book){}

    getTitle(): string {
        return this.inner.getTitle();
    }
    getAuthor(): string {
        return this.inner.getAuthor();
    }
    getCategory(): Category {
        return this.inner.getCategory();
    }
    getDescription(): string {
        return this.inner.getDescription();
    }
    isDigit(): boolean {
        return this.inner.isDigit();
    }
    abstract getPrice(): number;
}

export class PercentageDiscount extends BookDiscountDecorator{
    constructor(inner:Book,private readonly percentOff:number){
        super(inner);
    }
    getPrice(): number {
        const factor = Math.max(0,Math.min(100,this.percentOff));
        const discount = this.inner.getPrice()*(1-factor/100);
        return Number(discount.toFixed(2));
    }
}