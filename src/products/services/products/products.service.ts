import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private products: Repository<Product>,
  ) {}

  findAll() {
    return this.products.find();
  }

  async findOne(id: number) {
    const product = await this.products.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(product: CreateProductDto) {
    const newProduct = this.products.create(product);
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
    const updateProduct = await this.products.update({ id }, product);

    if (updateProduct.affected === 0) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return updateProduct;
  }
}
