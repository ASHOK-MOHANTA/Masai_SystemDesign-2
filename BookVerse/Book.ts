export enum Category{
    Fiction = "Fiction",
    NonFiction = "Non-Fiction",
    Techonology = "Techonology",
}

export interface Book{
    getTitle():string;
    getAuthor():string;
    getCategory():Category;
    getDescription():string;
    getPrice():number;
    isDigit():boolean;
}

export abstract class BaseBook implements Book{
    protected constructor(
        private readonly title:string,
        private readonly author:string,
        private readonly Category:Category,
        private readonly price : number
    ){}

    getTitle(){return this.title;}
    getAuthor(){return this.author;}
    getCategory(){return this.Category;}
    getPrice(){return this.price;}
    getDescription(): string {
         return `${this.title} by ${this.author} (${this.Category})`
    }
    abstract isDigit(): boolean;
}

export class PhysicalBook extends BaseBook{
    isDigit(): boolean {
        return false;
    }
}

export class EBook extends BaseBook{
    isDigit(): boolean {
        return true;
    }
}