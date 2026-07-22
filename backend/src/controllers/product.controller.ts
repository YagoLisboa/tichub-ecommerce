import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';

import {
  createProductSchema,
  productParamsSchema,
  productQueryPaginationSchema,
  updateProductSchema,
} from '../schemas/product.schema';

export class ProductController {
  constructor(private productService: ProductService) {}

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page, size } =
        productQueryPaginationSchema.parse(req.query);

      const products =
        await this.productService.getAll(page, size);

      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, price, stock, categoryId } =
        createProductSchema.parse(req.body);

      const product =
        await this.productService.create(
          name,
          price,
          stock,
          categoryId
        );

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } =
        productParamsSchema.parse(req.params);

      const { name, price, stock, categoryId } =
        updateProductSchema.parse(req.body);

      const product =
        await this.productService.update(
          id,
          name,
          price,
          stock,
          categoryId
        );

      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } =
        productParamsSchema.parse(req.params);

      await this.productService.delete(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}