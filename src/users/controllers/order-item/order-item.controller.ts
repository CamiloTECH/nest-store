import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from 'src/users/dtos/order-item.dtos';
import { OrderItemService } from 'src/users/services/order-item/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private itemsServices: OrderItemService) {}

  @Post()
  create(@Body() item: CreateOrderItemDto) {
    return this.itemsServices.create(item);
  }
}
