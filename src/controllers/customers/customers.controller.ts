import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dtos';
import { CustomersService } from 'src/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersSerives: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customersSerives.findAll();
  }

  @Get(':customerId')
  getCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersSerives.findOne(customerId);
  }

  @Post()
  create(@Body() customer: CreateCustomerDto) {
    return this.customersSerives.create(customer);
  }

  @Put(':customerId')
  update(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() customer: UpdateCustomerDto,
  ) {
    return this.customersSerives.update(customer, customerId);
  }

  @Delete(':customerId')
  delete(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersSerives.delete(customerId);
  }
}
