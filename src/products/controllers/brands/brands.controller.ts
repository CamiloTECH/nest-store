import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brand.dtos';
import { BrandsService } from 'src/products/services/brands/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsService.findAll();
  }

  @Get(':brandId')
  getBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsService.findOne(brandId);
  }

  @Post()
  create(@Body() brand: CreateBrandDto) {
    return this.brandsService.create(brand);
  }

  @Put(':brandId')
  update(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() brand: UpdateBrandDto,
  ) {
    return this.brandsService.update(brand, brandId);
  }

  @Delete(':brandId')
  delete(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsService.delete(brandId);
  }
}
