import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { customer } from 'src/typeorm/entities/customer';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(customer)
    private customerRepository: Repository<customer>,
  ) {}

  async findOneEmail(EMAIL: string): Promise<customer> {
    const users = await this.customerRepository.find();
    return users.find((user) => user.EMAIL === EMAIL);
  }
}
