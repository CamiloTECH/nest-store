import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dtos';
import { Customer } from 'src/users/entities/customer.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orders: Repository<Order>,
    @InjectRepository(Customer) private customer: Repository<Customer>,
  ) {}

  findAll() {
    return this.orders.find();
  }

  async findOne(id: number) {
    const findOrder = await this.orders.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!findOrder) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return findOrder;
  }

  async create(order: CreateOrderDto) {
    const newOrder = new Order();
    if (order.customerId) {
      const customer = await this.customer.findOne({
        where: { id: order.customerId },
      });
      newOrder.customer = customer;
    }
    return this.orders.save(newOrder);
  }

  async update(order: UpdateOrderDto, id: number) {
    const updateOrder = await this.orders.findOne({ where: { id } });
    if (order.customerId) {
      const customer = await this.customer.findOne({
        where: { id: order.customerId },
      });
      updateOrder.customer = customer;
    }
    return this.orders.save(updateOrder);
  }

  async delete(id: number) {
    const deleteOrder = await this.orders.delete({ id });
    if (deleteOrder.affected === 0) {
      throw new NotFoundException(`order ${id} not found`);
    }
    return deleteOrder;
  }
}
