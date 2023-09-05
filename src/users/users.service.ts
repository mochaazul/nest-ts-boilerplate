import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserPayload } from './user.dto';
import { hashPassword } from 'extras/helper/hash';

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
    user.username = payload.username;
    user.password = hashPassword(payload.password);
    this.userRepository.save(user);
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException('Wrong username/password');

    return user;
  }
}
