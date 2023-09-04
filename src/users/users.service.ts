import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserPayload } from './user.dto';
import { hashPassword } from 'src/helper/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[] | null> {
    return this.userRepository.find();
  }

  async create(payload: CreateUserPayload): Promise<User> {
    const user = new User();
    user.password = payload.password;
    user.username = hashPassword(payload.password);
    this.userRepository.save(user);
    return user;
  }
}
