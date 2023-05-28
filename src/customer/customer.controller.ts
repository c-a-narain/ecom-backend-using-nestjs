import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:field')
  getProduct(@Request() req, @Param('field') field: string) {
    const email = req.user['EMAIL'];
    return this.customerService.getProduct(email, field);
  }
}
