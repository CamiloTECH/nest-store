import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';
import { User } from 'src/users/entities/user.entity';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private customersService: CustomersService,
  ) {}

  findAll() {
    return this.users.find({
      relations: ["customer"],
    });
  }

  async findOne(id: number) {
    const findUser = await this.users.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return findUser;
  }

  async create(user: CreateUserDto) {
    const newUser = this.users.create(user);
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
}
