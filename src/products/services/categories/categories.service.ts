import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/category.dtos';
import { Category } from 'src/products/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Phone',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(categoryId: number) {
    const findCategory = this.categories.find(({ id }) => id === categoryId);
    if (!findCategory) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }
    return findCategory;
  }

  create(category: CreateCategoryDto) {
    this.counterId++;
    const newCategory = {
      id: this.counterId,
      ...category,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(category: UpdateCategoryDto, categoryId: number) {
    const updateIndex = this.categories.findIndex(
      ({ id }) => id === categoryId,
    );
    if (updateIndex === -1) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }
    const categoryUpdate = this.categories[updateIndex];
    this.categories[updateIndex] = {
      ...categoryUpdate,
      ...category,
    };
    return this.categories[updateIndex];
  }

  delete(categoryId: number) {
    const deleteIndex = this.categories.findIndex(
      ({ id }) => id === categoryId,
    );
    if (deleteIndex === -1) {
      throw new NotFoundException(`Category ${categoryId} not found`);
    }

    this.categories.splice(deleteIndex, 1);
    return true;
  }
}
