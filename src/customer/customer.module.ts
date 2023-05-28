import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { customer } from 'src/typeorm/entities/customer';
import { customer_orders } from 'src/typeorm/entities/customer-order';
import { products } from 'src/typeorm/entities/getProducts';

@Module({
  imports: [
    TypeOrmModule.forFeature([customer, customer_orders, products]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
