import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dtos';
import { Category } from 'src/products/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categories: Repository<Category>,
  ) {}

  findAll() {
    return this.categories.find();
  }

  async findOne(categoryId: number) {
    const findCategory = await this.categories.findOne({
      where: { id: categoryId },
    });
    if (!findCategory) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }
    return findCategory;
  }

  create(category: CreateCategoryDto) {
    const newProduct = this.categories.create(category);
    return this.categories.save(newProduct);
  }

  async update(category: UpdateCategoryDto, categoryId: number) {
    const updateCategory = await this.categories.update(
      { id: categoryId },
      category,
    );
    if (updateCategory.affected === 0) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }

    return updateCategory;
  }

  async delete(categoryId: number) {
    const deleteCategory = await this.categories.delete({ id: categoryId });
    if (deleteCategory.affected === 0) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }

    return deleteCategory;
  }
}
