import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dtos';
import { Brand } from 'src/products/entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brands: Repository<Brand>) {}

  findAll() {
    return this.brands.find();
  }

  async findOne(id: number) {
    const findBrand = await this.brands.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!findBrand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return findBrand;
  }

  create(brand: CreateBrandDto) {
    const newBrand = this.brands.create(brand);
    return this.brands.save(newBrand);
  }

  async update(brand: UpdateBrandDto, id: number) {
    const updateBrand = await this.brands.update({ id }, brand);
    if (updateBrand.affected === 0) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    return updateBrand;
  }

  async delete(id: number) {
    const deleteBrand = await this.brands.delete({ id });
    if (deleteBrand.affected === 0) {
      throw new NotFoundException(`Brand ${id} not found`);
    }

    return deleteBrand;
  }
}
