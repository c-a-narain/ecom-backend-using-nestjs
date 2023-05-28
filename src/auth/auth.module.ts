import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { AdminService } from 'src/admin/admin.service';
import { LoginModule } from 'src/login/login.module';
import { LoginService } from 'src/login/login.service';
// import { GetProductsController } from 'src/products/products.controller';
// import { GetProductsModule } from 'src/products/products.module';
// import { GetProductsService } from 'src/products/products.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    LoginModule,
    PassportModule,
    AdminModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  providers: [
    AuthService,
    LoginService,
    LocalStrategy,
    JwtStrategy,
    AdminService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
