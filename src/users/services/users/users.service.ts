import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';
import { User } from 'src/users/entities/user.entity';
import { CustomersService } from '../customers/customers.service';
import { ProductsService } from 'src/products/services/products/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private customersService: CustomersService,
    private productsService: ProductsService,
  ) {}

  findAll() {
    return this.users.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const findUser = await this.users.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return findUser;
  }

  findByEmail(email: string) {
    return this.users.findOne({ where: { email } });
  }

  async create(user: CreateUserDto) {
    const newUser = this.users.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (user.customerId) {
      const customer = await this.customersService.findOne(user.customerId);
      newUser.customer = customer;
    }
    return this.users.save(newUser);
  }

  async update(user: UpdateUserDto, id: number) {
    const updateUser = await this.users.update({ id }, user);
    if (updateUser.affected === 0) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return updateUser;
  }

  async delete(id: number) {
    const deleteUser = await this.users.delete({ id });
    if (deleteUser.affected === 0) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return deleteUser;
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
