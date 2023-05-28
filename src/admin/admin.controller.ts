import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:field')
  getProduct(@Request() req, @Param('field') field: string) {
    const email = req.user['EMAIL'];
    return this.adminService.getProduct(email, field);
  }
}
