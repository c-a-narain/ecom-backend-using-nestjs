import { Module } from '@nestjs/common';
import { GetProductsService } from './products.service';
import { GetProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { products } from 'src/typeorm/entities/getProducts';

@Module({
  imports: [TypeOrmModule.forFeature([products])],
  controllers: [GetProductsController],
  providers: [GetProductsService],
})
export class GetProductsModule {}
