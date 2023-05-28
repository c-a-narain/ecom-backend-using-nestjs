import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { customer } from './typeorm/entities/customer';
import { AuthModule } from './auth/auth.module';
import { GetProductsModule } from './products/products.module';
import * as dotenv from 'dotenv';
import { products } from './typeorm/entities/getProducts';
import { LoginModule } from './login/login.module';
import { CustomerModule } from './customer/customer.module';
import { customer_orders } from './typeorm/entities/customer-order';
import { AdminModule } from './admin/admin.module';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.SQL_TYPE as any,
      host: process.env.SQL_HOST,
      port: +process.env.SQL_PORT,
      username: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      entities: [customer, products, customer_orders],
      synchronize: false,
    }),
    LoginModule,
    AuthModule,
    GetProductsModule,
    CustomerModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
