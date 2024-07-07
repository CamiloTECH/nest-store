import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './entities/user.entity';

import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { Customer } from './entities/customer.entity';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { ProductsModule } from 'src/products/products.module';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrderItemController } from './controllers/order-item/order-item.controller';
import { OrderItemService } from './services/order-item/order-item.service';
import { ProfileController } from './controllers/profile/profile.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemController,
    ProfileController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
  exports: [UsersService],
})
export class UsersModule {}
