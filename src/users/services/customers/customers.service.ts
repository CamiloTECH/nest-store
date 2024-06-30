import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';
import { Customer } from 'src/users/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customers: Repository<Customer>,
  ) {}

  findAll() {
    return this.customers.find();
  }

  async findOne(id: number) {
    const findCustomer = await this.customers.findOne({ where: { id } });
    if (!findCustomer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return findCustomer;
  }

  create(customer: CreateCustomerDto) {
    const newCustomer = this.customers.create(customer);
    return this.customers.save(newCustomer);
  }

  async update(customer: UpdateCustomerDto, id: number) {
    const updateCustomer = await this.customers.update({ id }, customer);
    if (updateCustomer.affected === 0) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return updateCustomer;
  }

  async delete(id: number) {
    const deleteCustomer = await this.customers.delete({ id });
    if (deleteCustomer.affected === 0) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return deleteCustomer;
  }
}
