import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
