import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { admin } from 'src/typeorm/entities/admin';

@Module({
  imports: [TypeOrmModule.forFeature([admin])],
  exports: [TypeOrmModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
