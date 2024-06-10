import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dtos';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      lastName: 'Montoya',
      name: 'Camilo',
      phone: 121515151,
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(customerId: number) {
    const findCustomer = this.customers.find(({ id }) => id === customerId);
    if (!findCustomer) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }
    return findCustomer;
  }

  create(customer: CreateCustomerDto) {
    this.counterId++;
    const newCustomer = {
      id: this.counterId,
      ...customer,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(customer: UpdateCustomerDto, customerId: number) {
    const updateIndex = this.customers.findIndex(({ id }) => id === customerId);
    if (updateIndex === -1) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }
    const customerUpdate = this.customers[updateIndex];
    this.customers[updateIndex] = {
      ...customerUpdate,
      ...customer,
    };
    return this.customers[updateIndex];
  }

  delete(customerId: number) {
    const deleteIndex = this.customers.findIndex(({ id }) => id === customerId);
    if (deleteIndex === -1) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }

    this.customers.splice(deleteIndex, 1);
    return true;
  }
}
