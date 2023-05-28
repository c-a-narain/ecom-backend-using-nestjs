import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterAll } from 'src/typeorm/entities/filterAll';
import { products } from 'src/typeorm/entities/getProducts';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class GetProductsService {
  constructor(
    @InjectRepository(products)
    private productRepository: Repository<products>,
  ) {}

  showMessage(data) {
    return {
      success: true,
      message: 'statement successfully executed',
      data: data,
    };
  }

  showError(data) {
    return {
      success: false,
      message: 'Execution Failed',
      data: data,
    };
  }

  async searchPage(page: number) {
    try {
      const res = await this.productRepository.find({
        skip: (page - 1) * 10,
        take: 10,
      });
      return this.showMessage(res);
    } catch (err) {
      return err;
    }
  }

  async sort(field: string) {
    try {
      const res = await this.productRepository
        .createQueryBuilder('products')
        .orderBy(`products.${field}`)
        .execute();
      return res;
    } catch (err) {
      return err;
    }
  }

  async filterfield(field: string, value: string, page: number) {
    try {
      if (field === 'rating') {
        const res = await this.productRepository.find({
          where: {
            RATING: +value,
          },
          skip: (page - 1) * 10,
          take: 10,
        });
        return this.showMessage(res);
      } else if (field === 'type') {
        const res = await this.productRepository.find({
          where: {
            TYPE: value,
          },
          skip: (page - 1) * 10,
          take: 10,
        });
        return this.showMessage(res);
      } else if (field === 'product_price') {
        const res = await this.productRepository.find({
          where: {
            PRODUCT_PRICE: LessThanOrEqual(+value),
          },
          order: {
            PRODUCT_PRICE: 'DESC',
          },
          skip: (page - 1) * 10,
          take: 10,
        });
        return this.showMessage(res);
      } else if (field === 'product_name') {
        const res = await this.productRepository.find({
          where: {
            PRODUCT_NAME: value,
          },
          skip: (page - 1) * 10,
          take: 10,
        });
        return this.showMessage(res);
      } else {
        const res = 'value not found';
        return this.showError(res);
      }
    } catch (err) {
      return err;
    }
  }

  async filterManyFields(query: filterAll) {
    const res = await this.productRepository
      .createQueryBuilder()
      .where(
        `
    PRODUCT_ID LIKE :PRODUCT_ID  
    OR PRODUCT_NAME LIKE :PRODUCT_NAME  
    OR PRODUCT_MODEL LIKE :PRODUCT_MODEL  
    OR AVAILABILITY LIKE :AVAILABILITY 
    OR RATING LIKE :RATING 
    OR TYPE LIKE :TYPE 
    OR PRODUCT_PRICE LIKE :PRODUCT_PRICE`,
        {
          PRODUCT_ID: query.PRODUCT_ID ? '%' + query.PRODUCT_ID + '%' : '',
          PRODUCT_NAME: query.PRODUCT_ID ? '%' + query.PRODUCT_ID + '%' : '',
          PRODUCT_MODEL: query.PRODUCT_MODEL
            ? '%' + query.PRODUCT_MODEL + '%'
            : '',
          PRODUCT_PRICE: query.PRODUCT_PRICE
            ? '%' + query.PRODUCT_PRICE + '%'
            : '',
          AVAILABILITY: query.AVAILABILITY
            ? '%' + query.AVAILABILITY + '%'
            : '',
          RATING: query.RATING ? '%' + query.RATING + '%' : '',
          TYPE: query.TYPE ? '%' + query.TYPE + '%' : '',
        },
      )
      .execute();
    return this.showMessage(res);
  }
}
