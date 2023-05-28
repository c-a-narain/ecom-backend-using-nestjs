import { Controller, Get, Param } from '@nestjs/common';
import { GetProductsService } from './products.service';

@Controller('getproducts')
export class GetProductsController {
  constructor(private readonly getProductsService: GetProductsService) {}

  @Get('/:field')
  search(@Param('field') field: string) {
    if (!isNaN(+field)) {
      return this.getProductsService.searchPage(+field);
    } else if (field.includes('=')) {
      const [key, value, page] = field.split('=');
      return this.getProductsService.filterfield(key, value, +page);
    } else {
      return this.getProductsService.sort(field);
    }
  }
}
