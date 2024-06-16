import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
