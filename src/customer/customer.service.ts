import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { customer } from 'src/typeorm/entities/customer';
import { customer_orders } from 'src/typeorm/entities/customer-order';
import { products } from 'src/typeorm/entities/getProducts';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(customer)
    private customerRepository: Repository<customer>,
    @InjectRepository(customer_orders)
    private customerordersRepository: Repository<customer_orders>,
    @InjectRepository(products) private productRepository: Repository<products>,
  ) {}

  async getProduct(email: string, field: string) {
    try {
      const product_id = await this.customerordersRepository.find({
        select: {
          PRODUCT_ID: true,
        },
        where: {
          CUSTOMER_EMAIL: email,
        },
      });
      const product_details = await this.productRepository.find({
        select: {
          PRODUCT_ID: field.includes('product_id'),
          PRODUCT_NAME: field.includes('product_name'),
          PRODUCT_MODEL: field.includes('product_model'),
          PRODUCT_PRICE: field.includes('product_price'),
          AVAILABILITY: field.includes('availability'),
          RATING: field.includes('rating'),
          TYPE: field.includes('type'),
        },
        where: {
          PRODUCT_ID: +product_id[0].PRODUCT_ID,
        },
      });
      const user_detail = await this.customerRepository.find({
        select: {
          CustId: field.includes('id'),
          NAME: field.includes('name'),
        },
        where: {
          EMAIL: email,
        },
      });
      const res = {
        success: true,
        message: 'statement executed successfully',
        data: {
          user_detail: user_detail[0],
          product_details: product_details,
        },
      };
      return res;
    } catch (err) {
      return err;
    }
  }

  async findOne(email: string): Promise<customer | undefined> {
    const users = await this.customerRepository.find();
    return users.find((user) => user.EMAIL === email);
  }
}
