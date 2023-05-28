import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { customer } from 'src/typeorm/entities/customer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([customer])],
  exports: [TypeOrmModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
