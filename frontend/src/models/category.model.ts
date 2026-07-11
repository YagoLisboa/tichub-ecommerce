export interface ICategory {
  id: string;
  title: string;
}

export class Category implements ICategory {
  constructor(
    public id: string,
    public title: string
  ) {}
}
