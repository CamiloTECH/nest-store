import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dtos';
import { OrdersService } from 'src/users/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersSerives: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersSerives.findAll();
  }

  @Get(':orderId')
  getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersSerives.findOne(orderId);
  }

  @Post()
  create(@Body() customer: CreateOrderDto) {
    return this.ordersSerives.create(customer);
  }

  @Put(':orderId')
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() customer: UpdateOrderDto,
  ) {
    return this.ordersSerives.update(customer, orderId);
  }

  @Delete(':orderId')
  delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersSerives.delete(orderId);
  }
}
