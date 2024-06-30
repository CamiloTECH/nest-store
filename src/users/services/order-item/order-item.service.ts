import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderItemDto } from 'src/users/dtos/order-item.dtos';
import { OrderItem } from 'src/users/entities/order-item.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(Product) private product: Repository<Product>,
    @InjectRepository(OrderItem) private orderItem: Repository<OrderItem>,
  ) {}

  async create(orderItem: CreateOrderItemDto) {
    const order = await this.order.findOne({
      where: { id: orderItem.orderId },
    });
    const product = await this.product.findOne({
      where: { id: orderItem.productId },
    });
    const item = new OrderItem();

    item.order = order;
    item.product = product;
    item.quantity = orderItem.quantity;

    return this.orderItem.save(item);
  }
}
