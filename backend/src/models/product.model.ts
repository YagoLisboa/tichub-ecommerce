import { ICategory } from './category.model';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  category: ICategory;
}

export class Product implements IProduct {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public category: ICategory
  ) {}
}