import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as md5 from 'md5';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'EMAIL' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, md5(password));
    const admin = await this.authService.validateAdmin(username, md5(password));
    if (!user) {
      throw new UnauthorizedException();
    } else if (!admin) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
