import type { ICategory } from './category.model';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ICategory;
}

export class Product implements IProduct {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public image: string,
    public category: ICategory
  ) {}
}
