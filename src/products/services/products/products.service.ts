import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dtos';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      stock: 10,
      price: 1000,
      image: 'image',
      name: 'product',
      description: 'description',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(product: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  delete(id: number) {
    const deleteIndex = this.products.findIndex((item) => item.id === id);
    if (deleteIndex === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    this.products.splice(deleteIndex, 1);
    return { status: true };
  }

  update(id: number, product: UpdateProductDto) {
    const indexProduct = this.products.findIndex((item) => item.id === id);
    if (indexProduct === -1) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    const findProduct = this.products[indexProduct];
    this.products[indexProduct] = {
      ...findProduct,
      ...product,
    };
    return this.products[indexProduct];
  }
}
