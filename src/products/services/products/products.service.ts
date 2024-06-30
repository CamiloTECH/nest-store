import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, FindOptionsWhere, Between } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dtos';
import { Category } from '../../entities/category.entity';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private products: Repository<Product>,
    @InjectRepository(Brand) private brands: Repository<Brand>,
    @InjectRepository(Category) private categories: Repository<Category>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.products.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.products.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.products.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(product: CreateProductDto) {
    const newProduct = this.products.create(product);
    if (product.brandId) {
      const brand = await this.brands.findOne({
        where: { id: product.brandId },
      });
      newProduct.brand = brand;
    }
    if (product.categoriesIds) {
      const categories = await this.categories.findBy({
        id: In(product.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return this.products.save(newProduct);
  }

  async delete(id: number) {
    const deleteProduct = await this.products.delete({ id });

    if (deleteProduct.affected === 0) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return deleteProduct;
  }

  async update(id: number, product: UpdateProductDto) {
    const { brandId, description, image, name, price, stock } = product;
    const newProduct = {
      description,
      image,
      name,
      price,
      stock,
    };
    if (brandId) {
      const brand = await this.brands.findOne({
        where: { id: brandId },
      });
      // @ts-expect-error Error inecesario
      newProduct.brand = brand;
    }
    if (product.categoriesIds) {
      const categories = await this.categories.findBy({
        id: In(product.categoriesIds),
      });
      // @ts-expect-error Error inecesario
      newProduct.categories = categories;
    }

    const updateProduct = await this.products.update({ id }, newProduct);
    if (updateProduct.affected === 0) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return updateProduct;
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.products.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      ({ id }) => id !== categoryId,
    );

    return this.products.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.products.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const categories = await this.categories.findOne({
      where: { id: categoryId },
    });
    product.categories.push(categories);

    return this.products.save(product);
  }
}
