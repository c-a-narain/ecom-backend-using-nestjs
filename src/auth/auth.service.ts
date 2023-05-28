import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminService } from 'src/admin/admin.service';
import { LoginService } from 'src/login/login.service';
import { admin } from 'src/typeorm/entities/admin';
import { customer } from 'src/typeorm/entities/customer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(customer)
    private loginService: LoginService,
    @InjectRepository(admin)
    private adminService: AdminService,
    // private getProductService: GetProductsService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(EMAIL: string, pass: string): Promise<any> {
    const admin = await this.adminService.findAdminEmail(EMAIL);

    if (admin && admin.password.trim() == pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = admin;
      console.log('Logged In');

      return result;
    }
    return null;
  }

  async validateUser(EMAIL: string, pass: string): Promise<any> {
    const user = await this.loginService.findOneEmail(EMAIL);

    if (user && user.password.trim() == pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      console.log('Logged In');

      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.EMAIL };
    // const message = 'Login Successful';
    return (
      // this.getProductService.showMessage(message),
      {
        message: 'login Sucessful',
        access_token: this.jwtService.sign(payload),
      }
    );
  }
}
