import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { admin } from 'src/typeorm/entities/admin';
import { customer_orders } from 'src/typeorm/entities/customer-order';
import { products } from 'src/typeorm/entities/getProducts';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(admin)
    private adminRepository: Repository<admin>,
    @InjectRepository(customer_orders)
    private customerordersRepository: Repository<customer_orders>,
    @InjectRepository(products) private productRepository: Repository<products>,
  ) {}

  async getProduct(field: string) {
    try {
      const product_id = await this.customerordersRepository.find({
        select: {
          PRODUCT_ID: true,
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
      });

      const res = {
        success: true,
        message: 'statement executed successfully',
        data: {
          product_details: product_details,
        },
      };
      return res;
    } catch (err) {
      return err;
    }
  }

  async getShipped(field: string) {
    try {
      const product_id = await this.customerordersRepository.find({
        select: {
          PRODUCT_ID: true,
        },
        where: {
          STATUS: 1,
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
      });

      const res = {
        success: true,
        message: 'statement executed successfully',
        data: {
          product_details: product_details,
        },
      };
      return res;
    } catch (err) {
      return err;
    }
  }

  async findAdminEmail(EMAIL: string): Promise<admin> {
    const users = await this.adminRepository.find();
    return users.find((user) => user.EMAIL === EMAIL);
  }
}
