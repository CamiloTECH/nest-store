import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/product.dtos';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private products: Repository<Product>,
    private brandsServices: BrandsService,
  ) {}

  findAll() {
    return this.products.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.products.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(product: CreateProductDto) {
    const newProduct = this.products.create(product);
    if (product.brandId) {
      const brand = await this.brandsServices.findOne(product.brandId);
      newProduct.brand = brand;
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
      brand: null,
      description,
      image,
      name,
      price,
      stock,
    };
    if (brandId) {
      const brand = await this.brandsServices.findOne(brandId);
      newProduct.brand = brand;
    }

    const updateProduct = await this.products.update({ id }, newProduct);
    if (updateProduct.affected === 0) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return updateProduct;
  }
}
