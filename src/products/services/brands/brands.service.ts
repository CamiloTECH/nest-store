import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dtos';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      image: 'image',
      name: 'apple',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(brandId: number) {
    const findBrand = this.brands.find(({ id }) => id === brandId);
    if (!findBrand) {
      throw new NotFoundException(`Brand ${brandId} not found`);
    }
    return findBrand;
  }

  create(brand: CreateBrandDto) {
    this.counterId++;
    const newBrand = {
      id: this.counterId,
      ...brand,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(brand: UpdateBrandDto, brandId: number) {
    const updateIndex = this.brands.findIndex(({ id }) => id === brandId);
    if (updateIndex === -1) {
      throw new NotFoundException(`Brand ${brandId} not found`);
    }
    const brandUpdate = this.brands[updateIndex];
    this.brands[updateIndex] = {
      ...brandUpdate,
      ...brand,
    };
    return this.brands[updateIndex];
  }

  delete(brandId: number) {
    const deleteIndex = this.brands.findIndex(({ id }) => id === brandId);
    if (deleteIndex === -1) {
      throw new NotFoundException(`Brand ${brandId} not found`);
    }

    this.brands.splice(deleteIndex, 1);
    return true;
  }
}
